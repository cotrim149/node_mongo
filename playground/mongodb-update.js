const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to mongo DB server');

  const db = client.db('TodoApp');

  var filter = {
    // _id: new ObjectId('5b94709f26eda21a23fad358')
    _id: new ObjectId('5b94723b44c3101a92093831')
  };

  var updateOperation = {
    // $set: {
    //   completed: true
    // }
    $set: {
      name: 'Cotrim'
    },
    $inc: {
      age: 1
    }
  };

  var options = {
    returnOriginal: false
  };

  // db.collection('Todos').findOneAndUpdate(filter,updateOperation, options).then((result)=>{
  //   console.log(result);
  // }); 

  db.collection('Users').findOneAndUpdate(filter,updateOperation, options).then((result)=>{
    console.log(result);
  }); 

});