//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

let login_details = {
    'email': 'email@email.com',
    'password': '123@abc'
}

describe('Create Account, Login and Check Token', () => {
    beforeEach((done) => {
        // Reset user mode before each test
        User.deleteMany({}, (err) => {
            console.log(err);
            done();
        })
    });

    describe('/POST Register', () => {
        it('it should Register, Login, and check token', (done) => {
            chai.request(server)
                .post('/api/signup')
                .send(login_details) // this is like sending $http.post or this.http.post in Angular
                .end((err, res) => { // when we get a response from the endpoint
                    // in other words,
                    // the res object should have a status of 200
                    //console.log(res.body);
                    res.should.have.status(200);
                    // the property, res.body.state, we expect it to be true.
                    //expect(res.body.success).to.be.true;

                    // follow up with login
                    chai.request(server)
                        .post('/api/signin')
                        .send(login_details)
                        .end((err, res) => {
                            console.log('this was run the login part');
                            //console.log(res.body);
                            res.should.have.status(200);
                            expect(res.body.success).to.be.true;
                            res.body.should.have.property('token');

                            let token = res.body.token;
                            //console.log(token);
                            // follow up with requesting user protected page
                            chai.request(server)
                                .get('/api/film')
                                // we set the auth header with our token
                                .set('Authorization', token)
                                .end((err, res) => {
                                    console.log('Testing token');
                                    //console.log(res.body);
                                    res.should.have.status(200);

                                    res.body.should.be.a('array');
                                    done(); // Don't forget the done callback to indicate we're done!
                                })
                        })

                })
        })
    })
})
