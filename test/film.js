//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Film = require('../models/film');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Film', () => {
    beforeEach((done) => { //Before each test we empty the database
        Film.deleteMany({}, (err) => {
            done();
        });
    });
    let ID;
    let testFilm = {
        "title": "Star War: Empire stikes back",
        "director": "George Lucas",
        "studio": "Lucas Films",
        "year": "1981\n",
        "review": " the 2nd one",
        "reviewer": "dave",
        "image":    "./images/test.png"
    };
    /*
      * Test the /GET route
      */
    describe('/GET film', () => {
        it('it should GET all the films', (done) => {
            chai.request(server)
                .get('/api/film')
                .set({
                    Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWMyZjdiMGFmYThmOTk0MjQwYTU2NTkxIiwiZW1haWwiOiJkNzZAZC5jb20iLCJwYXNzd29yZCI6IiQyYSQwNSRLLnVkMExQcnFtd1pudjdEaThmWlNPWVUwMHNKRFdZczFCY3dMSTZqNXg0RWdOb1VoOWZaRyIsImNyZWF0ZWRBdCI6IjIwMTktMDEtMDRUMTU6MjY6MDIuNTgwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDEtMDRUMTU6MjY6MDIuNTgwWiIsIl9fdiI6MCwiaWF0IjoxNTQ2NjE1NjM1fQ.hE8-qWVRmo7sIcPaipUaaI682izTcW_1UHlcSD8fV2M'
                })
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST film', () => {
        it('it should Create a new film', (done) => {
            chai.request(server)
                .post('/api/film')
                .send(testFilm)
                .set({
                    Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWMyZjdiMGFmYThmOTk0MjQwYTU2NTkxIiwiZW1haWwiOiJkNzZAZC5jb20iLCJwYXNzd29yZCI6IiQyYSQwNSRLLnVkMExQcnFtd1pudjdEaThmWlNPWVUwMHNKRFdZczFCY3dMSTZqNXg0RWdOb1VoOWZaRyIsImNyZWF0ZWRBdCI6IjIwMTktMDEtMDRUMTU6MjY6MDIuNTgwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDEtMDRUMTU6MjY6MDIuNTgwWiIsIl9fdiI6MCwiaWF0IjoxNTQ2NjE1NjM1fQ.hE8-qWVRmo7sIcPaipUaaI682izTcW_1UHlcSD8fV2M'
                })
                .end((err, res) => {
                   // console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.success.valueOf(true);
                    chai.request(server)
                        .get('/api/film')
                        .set({
                            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWMyZjdiMGFmYThmOTk0MjQwYTU2NTkxIiwiZW1haWwiOiJkNzZAZC5jb20iLCJwYXNzd29yZCI6IiQyYSQwNSRLLnVkMExQcnFtd1pudjdEaThmWlNPWVUwMHNKRFdZczFCY3dMSTZqNXg0RWdOb1VoOWZaRyIsImNyZWF0ZWRBdCI6IjIwMTktMDEtMDRUMTU6MjY6MDIuNTgwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDEtMDRUMTU6MjY6MDIuNTgwWiIsIl9fdiI6MCwiaWF0IjoxNTQ2NjE1NjM1fQ.hE8-qWVRmo7sIcPaipUaaI682izTcW_1UHlcSD8fV2M'
                        })
                        .end((err, res) => {
                            ID = res.body[0]._id;
                            console.log(ID);
                            //console.log(res.body);
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                            done();
                        });

                });
        });
    });
/*
    describe('/GET film', () => {
        it('it should GET all the films should have 1  film now', (done) => {
            chai.request(server)
                .get('/api/film')
                .set({
                    Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWMyZjdiMGFmYThmOTk0MjQwYTU2NTkxIiwiZW1haWwiOiJkNzZAZC5jb20iLCJwYXNzd29yZCI6IiQyYSQwNSRLLnVkMExQcnFtd1pudjdEaThmWlNPWVUwMHNKRFdZczFCY3dMSTZqNXg0RWdOb1VoOWZaRyIsImNyZWF0ZWRBdCI6IjIwMTktMDEtMDRUMTU6MjY6MDIuNTgwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDEtMDRUMTU6MjY6MDIuNTgwWiIsIl9fdiI6MCwiaWF0IjoxNTQ2NjE1NjM1fQ.hE8-qWVRmo7sIcPaipUaaI682izTcW_1UHlcSD8fV2M'
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
*/
});