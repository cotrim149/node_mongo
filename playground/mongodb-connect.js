// const MongoClient = require('mongodb').MongoClient;
// using destructuring to get MongoClient
const {MongoClient, ObjectId} = require('mongodb');

const user = {name: 'Cotrim', age: 28};
// Get the parameter name from JSON, ES6 destructuring
var {name} = user;
console.log(name);



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }

  console.log('Connected to mongo DB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // },(err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));

  // });

  // db.collection('Users').insertOne({
  //   name: 'Cotrim',
  //   age: 28,
  //   location: 'Vicente pires'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });


  client.close();
});