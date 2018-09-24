const {ObjectId} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((todo) => {
//   console.log(todo);
// });

// Todo.findByIdAndDelete('5ba81921cf2ead3292a45c5d').then((todo) => {
//   console.log(todo);
// });

Todo.findOneAndRemove({_id: '5ba81921cf2ead3292a45c5e'}).then((todo) => {
  console.log(todo);
});