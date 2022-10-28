const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
require("dotenv").config();

chai.use(chaiHttp);

//Our parent block
describe('Question', () => {


    // GET route
  describe('/ method-GET', () => {
      it('it should have status 200', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
      it('it should be a type object', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                  res.body.should.be.a('object');
              done();
            });
      });
      it('it shoud have an message "Welcome to responder!" ', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                  res.body.should.have.property('message').eql('Welcome to responder!');

              done();
            });
      });
  })
  describe('/questions method-GET', () => {
      it('it should have status 200', (done) => {
        chai.request(app)
            .get('/questions')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
      it('it should be a type array', (done) => {
        chai.request(app)
            .get('/questions')
            .end((err, res) => {
                  res.body.should.be.a('array');
              done();
            });
      });
  })

  describe('/questions/1 method-GET', () => {
      it('it should have status 200', (done) => {
        chai.request(app)
            .get('/questions/1')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });

      it('it should be a type object', (done) => {
        chai.request(app)
            .get('/questions/1')
            .end((err, res) => {
                  res.body.should.be.a('object');
                  console.log("console", res.body)
              done();
            });
      });

      it('it should have a property author', (done) => {
        chai.request(app)
            .get('/questions/1')
            .end((err, res) => {
              res.body.should.have.property('author');
              done();
            });
      });
      it('it should have a property summary', (done) => {
        chai.request(app)
            .get('/questions/1')
            .end((err, res) => {
              res.body.should.have.property('summary');
              done();
            });
      });

  })


  describe('/questions method-POST', () => {
    const validObj = {
      author: "Tomasz Prazniewski",
      summary: "Do I have a chance to get a Junior Node.js Dev position? That would be nice ;D"
    }
    const inValidObj = {
      author: "",
      summary: "Do I have a chance to get a Junior Node.js Dev position? That would be nice ;D"
    }
    const inValidObj2 = {
      Title: "Title",
      author: "Author",
      summary: "Do I have a chance to get a Junior Node.js Dev position? That would be nice ;D"
    }

    it('it should have status 201 if Valid', (done) => {
      chai.request(app)
          .post('/questions')
          .send(validObj)
          .end((err, res) => {
                res.should.have.status(201);
            done();
          });
    });
    it('it should have status 404 if invalid', (done) => {
      chai.request(app)
          .post('/questions')
          .send(inValidObj)
          .end((err, res) => {
                res.should.have.status(404);
            done();
          });
    
    });

    it('it should have status 404 if invalid', (done) => {
      chai.request(app)
          .post('/questions')
          .send(inValidObj2)
          .end((err, res) => {
              res.body.should.have.property('message').eql('There was to many attributes passed to the server');
            done();
          });
    
    });
})


});