const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var newTodo = new Todo({
  text: 'Study JS'
});

newTodo.save().then((doc) =>{
  console.log('Saved Todo ' + JSON.stringify(doc, undefined, 2));
}, (error) => {
  console.log('Unable to save Todo ' + error);
});