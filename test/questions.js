const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
require("dotenv").config();

chai.use(chaiHttp);

//Our parent block
describe('Question', () => {


    // GET route
  describe('/GET Home', () => {
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
  describe('/questions ', () => {
      it('it should have status 200', (done) => {
        chai.request(app)
            .get('/questions')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
      it('it should be a type object', (done) => {
        chai.request(app)
            .get('/questions')
            .end((err, res) => {
                  res.body.should.be.a('array');
              done();
            });
      });
  })


});
