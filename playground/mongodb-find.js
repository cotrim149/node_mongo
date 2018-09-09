const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to mongo DB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectId('5b947069a27ab71a03abd7c7')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
    
  // }, (error) => {
  //   console.log('Unable to fetch Todos');
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
    
  // }, (error) => {
  //   console.log('Unable to fetch Todos');
  // });

  db.collection('Users').find({
    name: 'Cotrim'
  }).toArray().then((usersDocs)=>{
    console.log('Users');
    console.log(JSON.stringify(usersDocs,undefined,2));
  },(err)=>{
    console.log('Unable to fetch users');
  });


});