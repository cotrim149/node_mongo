var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());

// create new todo
app.post('/todos',(request, response) => {

  var todo = new Todo({
    text: request.body.text
  });

  todo.save().then((doc) => {
    response.send(doc);
  }, (error) => {
    response.status(400).send(error);
  });
});

// retrive all todos
app.get('/todos', (request, response) => {
  Todo.find().then((todos) => {
    response.send({todos});
  }, (e) => {
    response.status(400).send(e);
  });
});

// retrive an specific todo with ID
// GET todos/123
app.get('/todos/:id',(request, response) => {
  var {id} = request.params;

  if(!ObjectID.isValid(id)) {
    return response.status(404).send('Object id not valid');
  }
  
  Todo.findById(id).then((todo) => {

    if(todo) {
      response.status(200).send({todo});
    } else {
      response.status(404).send('Todo not found');
    }
  }, (e) => {
    response.status(400).send(e);
  });

});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};