const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

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

// delete some resource with ID
// DELETE /todos/123
app.delete('/todos/:id', (request, response) => {
  var {id} = request.params;

  if(!ObjectID.isValid(id)) {
    return response.status(404).send('Object id not valid');
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if(todo) {
      response.status(200).send({todo});
    } else {
      response.status(404).send();
    }
  }).catch((e) => response.status(400).send(e));

});

// edit some resource with ID
// PATCH /todos/123
app.patch('/todos/:id', (request, response) => {
  var {id} = request.params;
  var body = _.pick(request.body, ['text','completed']); 

  if(!ObjectID.isValid(id)) {
    return response.status(404).send('Object id not valid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  var updateOperation = {
    $set: body
  };

  var options = {
    new: true
  };

  Todo.findOneAndUpdate(id, updateOperation, options).then((todo)=>{
    if (!todo) {
      return response.status(404).send();
    }

    response.status(200).send({todo});

  }).catch((e) => {
    response.status(400).send();
  });

});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};