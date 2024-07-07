const exp = require('express');
const app = exp();
require('dotenv').config();
const path = require('path'); // Import 'path' module
const mc = require('mongodb').MongoClient;

app.use(exp.json());
app.use(exp.static(path.join(__dirname, '../my-app/build')));

mc.connect(process.env.DB_URL)
  .then(client => {
    const workshopdb = client.db('workshopdb');
    const admincollection = workshopdb.collection('admincollection');
    const workshopcollection = workshopdb.collection('workshopcollection');
    app.set('admincollection', admincollection);
    app.set('workshopcollection', workshopcollection);
    console.log("Connection to WORKSHOP Database successful");
  })
  .catch(err => {
    console.log("ERROR in Database Connection:", err);
  });

const adminApp = require('./api/adminapi');
// const fileApp = require('./api/fileapi');

app.use('/admin-api', adminApp);
// app.use('/file-api', fileApp);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: "error", payload: err.message });
});

const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Web server running on port ${port}`);
});
