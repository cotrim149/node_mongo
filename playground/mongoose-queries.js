const {ObjectId} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');


// var id = '5ba6a8f0486b181bbd9994bd';
// if(!ObjectId.isValid(id)){
//   console.log('Id not valid.');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos',todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo',todo);
// })

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('ID not found');
//   }

//   console.log('Todo By ID: ',todo);  
// }).catch((e) => console.log(e));

var userId = '5b9eb7d6a02029fc8a5589b1';

if(!ObjectId.isValid(userId)) {
  return console.log('User ID not valid!');
}

User.findById(userId).then((userDoc) => {

if (!userDoc) {
  return console.log('Unable to find user');
}

  var user = new User(userDoc);

  console.log('User retrivied: ', user);

}).catch((e) => console.log(e));