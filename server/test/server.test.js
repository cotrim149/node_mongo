const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 123
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});


describe('POST /todos', () => {

  it('Should create a new todo', (done) => {
    var text = 'Todo text in test';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text: text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should not create todo with invalid body data', (done) => {

    var text = {};

    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

});

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((response) => {
        expect(response.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {

  it('Should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for non-objects ids', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo by ID', (done) => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID).then((todo) => {
          expect(todo).toBeNull();
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it('Should return 404 if todo not found', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });

  it('Should return 404 if todo\'s ObjectID is not valid', (done) => {
    var hexID = todos[1]._id.toHexString();
    request(app)
      .delete('/todos/'+hexID+'aabbcc12')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/id',() => {
  
  it('Should update the todo', (done) => {
    let firstTodo = todos[0]; 
    let id = firstTodo._id.toHexString();

    let text = 'Text changed in test';
    let completed = true;

    request(app)
      .patch(`/todos/${id}`)
      .send({text, completed})
      .expect(200)
      .expect((response)=> {
        let {todo} = response.body;
        expect(todo.text).toBe('Text changed in test');
        expect(todo.completed).toBe(true);
        expect(typeof todo.completedAt).toBe('number');
      })
      .end(done);

  });

  it('Should clear completedAt when todo is not completed', (done) => {
    let secondTodo = todos[1]; 
    let id = secondTodo._id.toHexString();

    let text = 'Text changed in test';
    let completed = false;

    request(app)
      .patch(`/todos/${id}`)
      .send({text, completed})
      .expect(200)
      .expect((response) => {
        let {todo} = response.body;
        expect(todo.text).toBe('Text changed in test');
        expect(todo.completed).toBe(false);
        expect(todo.completedAt).toBeNull();
      })
      .end(done);

  });

});