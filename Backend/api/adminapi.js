const exp = require('express')
const adminApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const verifyToken=require('../middlewares/verifyToken.js')
const jwt = require('jsonwebtoken');
let admincollection;
let workshopcollection;

adminApp.use((req,res,next)=>{
    admincollection = req.app.get('admincollection')
    workshopcollection = req.app.get('workshopcollection')
    next()
})

//regitration
adminApp.post('/new-admin',expressAsyncHandler(async(req,res)=>{
    const newUser=req.body;
    const dbuser=await admincollection.findOne({adminId:newUser.adminId})
    console.log(newUser)
    console.log(dbuser)
    if(dbuser!==null){
        res.send({message:"admin already existed"})
    }else{
        const hashedPassword=await bcryptjs.hash(newUser.password,8)
        newUser.password=hashedPassword;
        await admincollection.insertOne(newUser)
        res.send({message:"admin created"})
    }
}))

//admin login
adminApp.post('/login', async (req, res) => {
  const admincollection = req.app.get('admincollection');
  const { adminID, password } = req.body;
  console.log(adminID,password)
  try {
    const admin = await admincollection.findOne({ adminID });
    if (admin && await bcryptjs.compare(password, admin.password)) {
      const token = jwt.sign({ adminID: admin.adminID }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.send({ message: 'login success', token, user: admin });
    } else {
      res.send({ message: 'invalid credentials' });
    }
  } catch (err) {
    res.status(500).send({ message: 'error', payload: err.message });
  }
});

module.exports = adminApp;

//managing password
adminApp.post('/change-password',verifyToken, expressAsyncHandler(async (req, res) => {
    const { password, newPassword } = req.body;
    const adminId = req.body.adminId; // Assuming the username is sent in the request body

    if (!adminId) {
        res.status(400).send({ message: "adminId is required" });
        return;
    }

    const dbUser = await admincollection.findOne({ adminId: adminId });
    if (!dbUser) {
        res.status(404).send({ message: "User not found" });
        return;
    }

    const isPasswordValid = await bcryptjs.compare(password, dbUser.password);
    if (!isPasswordValid) {
        res.status(401).send({ message: "Invalid password" });
        return;
    }

    const isNewPasswordSameAsOld = await bcryptjs.compare(newPassword, dbUser.password);
    if (isNewPasswordSameAsOld) {
        res.status(400).send({ message: "New password cannot be the same as the old password" });
        return;
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 8);
    await admincollection.updateOne({ adminId: adminId }, { $set: { password: hashedNewPassword } });
    res.send({ message: "Password updated successfully" });
}));


// upload admin workshop data
adminApp.post('/workshopdata',expressAsyncHandler(async(req,res)=>{
    //get new workshop object by admin
    const workshopdata=req.body;
    //post to workshop collection
    await workshopcollection.insertOne(workshopdata)
    //send res
    res.send({message:"Data Uploaded"})
}))

adminApp.get('/workshopdata/:id', expressAsyncHandler(async (req, res) => {
    // Get adminId from the request parameters
    const aid = req.params.id;

    try {
        // Get all workshop data for the given adminId
        let List = await workshopcollection.find({ workshopId: aid }).toArray();
        
        // Send response
        res.send({ message: "List of data", payload: List });
    } catch (error) {
        // Handle error
        res.status(500).send({ message: "error", payload: error.message });
    }
}));


module.exports=adminApp