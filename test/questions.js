const chai = require('chai');
const {assert} = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
require("dotenv").config();
const { sequelize } = require("../DB/mySql.js");
const { Answer } = require("../models/answer");
const { Question } = require("../models/question");


chai.use(chaiHttp);

describe('Before', () => {
  before((done) => { //Before each test we empty the database
    Question.hasMany(Answer);
    Answer.belongsTo(Question, { constraints: true, onDelete: "CASCADE" });
    sequelize
    .sync({ force: true })
    .then(()=> done())
             
   });

   describe('Empty? ', () => {
    it('Questions table shoud be empty', (done) => {
      chai.request(app)
          .get('/questions')
          .end((err, res) => {

                res.body.length.should.be.eql(0);
            done();
          });
    });
   })

   describe('Question', () => {
   
   
     describe('/questions method-POST', () => {
       const validObj = {
         author: "Tomasz Prazniewski",
         summary: "Do I have a chance to get a Junior Node.js Dev position? That would be nice ;D"
       }
       const validObj2 = {
         author: "John Stockton",
         summary: "What is the shape of the Earth?"
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
       it('it should have status 201 if Valid', (done) => {
         chai.request(app)
             .post('/questions')
             .send(validObj2)
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
           it('it shoud have an message "Welcome to FPWD!" ', (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                       res.body.should.have.property('message').eql('Welcome to FPWD!');
   
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

           it('it should be a length of 2 ', (done) => {
            chai.request(app)
                .get('/questions')
                .end((err, res) => {
                      res.body.length.should.be.eql(2);
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

           it('it shoud have a value of author = "Tomasz Prazniewski" ', (done) => {
            chai.request(app)
                .get('/questions/1')
                .end((err, res) => {
                      res.body.should.have.property('author').eql('Tomasz Prazniewski');
  
                  done();
                });
          });
           it('it shoud have a value of summary = "Do I have a chance to get a Junior Node.js Dev position? That would be nice ;D" ', (done) => {
            chai.request(app)
                .get('/questions/1')
                .end((err, res) => {
                      res.body.should.have.property('summary').eql('Do I have a chance to get a Junior Node.js Dev position? That would be nice ;D');
  
                  done();
                });
          });
   
        })
   
   
     describe('Invalid Route', () =>{
       it('This is invalid route',(done)=>{
         chai.request(app)
         .get('/ThisIsInvalidroute')
         .end((err, res) => {
             res.body.should.have.property('message').eql('This route is invalid');
           done();
         });
       })
     })
   
   
   });

  
   
  describe('Answer', () => {
      describe('/questions/1/answers method-POST', () => {
        
        const validObj = {
          author: "Brian McKenzie",
          summary: "The Earth is flat."
        }
        const validObj2 = {
          author: "Dr Strange",
          summary: "It is egg-shaped."
        }
        const inValidObj = {
          author: "",
          summary: "Empciaak"
        }
        const inValidObj2 = {
          Title: "Title",
          author: "Author",
          summary: "Invalid "
        }
    
        it('it should have status 201 if Valid', (done) => {
          chai.request(app)
              .post('/questions/1/answers')
              .send(validObj)
              .end((err, res) => {
                    res.should.have.status(201);
                done();
              });
        });
        it('it should have status 201 if Valid', (done) => {
          chai.request(app)
              .post('/questions/1/answers')
              .send(validObj2)
              .end((err, res) => {
                    res.should.have.status(201);
                done();
              });
        });
        it('it should have status 404 if invalid', (done) => {
          chai.request(app)
              .post('/questions/1/answers')
              .send(inValidObj)
              .end((err, res) => {
                    res.should.have.status(404);
                done();
              });
        
        });
    
        it('it should have status 404 if invalid', (done) => {
          chai.request(app)
              .post('/questions/1/answers')
              .send(inValidObj2)
              .end((err, res) => {
                  res.body.should.have.property('message').eql('There was to many attributes passed to the server');
                done();
              });
        
        });
      })
      describe('/questions/2/answers method-POST', () => {
        
        const validObj = {
          author: "Tomasz Prazniewski",
          summary: "Yes"
        }
        const validObj2 = {
          author: "Tomasz Prazniewsi",
          summary: "Maybe"
        }
        const validObj3 = {
          author: "Tomasz Prazniewsi",
          summary: "Maybe not ;D"
        }
        const inValidObj = {
          author: "",
          summary: "Empciaak"
        }
        const inValidObj2 = {
          Title: "Title",
          author: "Author",
          summary: "Invalid "
        }
    
        it('it should have status 201 if Valid', (done) => {
          chai.request(app)
              .post('/questions/2/answers')
              .send(validObj)
              .end((err, res) => {
                    res.should.have.status(201);
                done();
              });
        });
        it('it should have status 201 if Valid', (done) => {
          chai.request(app)
              .post('/questions/2/answers')
              .send(validObj2)
              .end((err, res) => {
                    res.should.have.status(201);
                done();
              });
        });
        it('it should have status 201 if Valid', (done) => {
          chai.request(app)
              .post('/questions/2/answers')
              .send(validObj3)
              .end((err, res) => {
                    res.should.have.status(201);
                done();
              });
        });
        it('it should have status 404 if invalid', (done) => {
          chai.request(app)
              .post('/questions/2/answers')
              .send(inValidObj)
              .end((err, res) => {
                    res.should.have.status(404);
                done();
              });
        
        });
    
        it('it should have status 404 if invalid', (done) => {
          chai.request(app)
              .post('/questions/2/answers')
              .send(inValidObj2)
              .end((err, res) => {
                  res.body.should.have.property('message').eql('There was to many attributes passed to the server');
                done();
              });
        
        });
      })

      describe('/questions/1/answers method-GET', () => {
        it('it should have status 200', (done) => {
          chai.request(app)
              .get('/questions/1/answers')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });

        it('it should be a length of 2 ', (done) => {
        chai.request(app)
            .get('/questions/1/answers')
            .end((err, res) => {
                  res.body.length.should.be.eql(2);
              done();
            });
        });

        it('it should be a type array', (done) => {
          chai.request(app)
              .get('/questions/1/answers')
              .end((err, res) => {
                    res.body.should.be.a('array');
                done();
              });
        });
      })
      describe('/questions/1/answers/1 method-GET', () => {
        it('it should have status 200', (done) => {
          chai.request(app)
              .get('/questions/1/answers/1')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });

        it('it should be a type object', (done) => {
          chai.request(app)
              .get('/questions/1/answers/1')
              .end((err, res) => {
                    res.body.should.be.a('object');
                done();
              });
        });

        it('it should have a property author', (done) => {
          chai.request(app)
              .get('/questions/1/answers/1')
              .end((err, res) => {
                res.body.should.have.property('author');
                done();
              });
        });
        it('it should have a property summary', (done) => {
          chai.request(app)
              .get('/questions/1/answers/1')
              .end((err, res) => {
                res.body.should.have.property('summary');
                done();
              });
        });

        it('it shoud have a value of author = "Brian McKenzie" ', (done) => {
         chai.request(app)
             .get('/questions/1/answers/1')
             .end((err, res) => {
                   res.body.should.have.property('author').eql('Brian McKenzie');

               done();
             });
       });
        it('it shoud have a value of summary = "The Earth is flat." ', (done) => {
         chai.request(app)
             .get('/questions/1/answers/1')
             .end((err, res) => {
                   res.body.should.have.property('summary').eql('The Earth is flat.');

               done();
             });
       });

      })


  })

})   