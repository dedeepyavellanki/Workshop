const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 5000;
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'workshop-management';

app.use(cors());
app.use(express.json());

let db;
app.use(exp.static(path.join(__dirname,'../my-app/build')))
MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error(error));
  app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../my-app/build/index.html'))
})
app.get('/api/statistics', async (req, res) => {
  try {
    const stats = await db.collection('statistics').findOne({});
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

app.get('/api/files', async (req, res) => {
  try {
    const files = await db.collection('files').find().toArray();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files' });
  }
});

// Add more routes as needed
