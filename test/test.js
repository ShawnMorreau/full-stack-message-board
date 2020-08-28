let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../index");
const db = require("../models");
const mongoose = require("mongoose");
const dbHandler = require("./db-handler");

chai.use(chaiHttp);
chai.should();

describe("API TESTS", () => {
    before(async (done) => {
        try {
            await dbHandler.connect()
                .then(done())
        } catch (error) {
            done(error);
        }
    });
    afterEach(async (done) => {
        try {
            await dbHandler.clearDatabase()
                .then(done())
        } catch (error) {
            done(error);
        }
    })
    after(async (done) => {
        try {
            console.log("Database closing down");
            await dbHandler.closeDatabase()
                .then(done())
        } catch (error) {
            done(error);
        }
    });
    describe("GET /api/messages/ when unauthorized", () => {
        it("Should get a 401 unauthorized error", (done) => {
            chai.request(app)
                .get('/api/messages')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe("GET /api/messages/ when authorized",()=>{
        it("Should return a list of messages with status 201",done=>{
            chai.request(app)
                .get('/api/messages')
                .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDg2NjJjYzI3YjEzYjM2YzFhZDU1NiIsInVzZXJuYW1lIjoiYWEiLCJpYXQiOjE1OTg1ODA0NTd9.B_oLJS8yPM1aAHHbF_K8zOl6VjF7jOIbzKdaSM4jkcE')
                .end((err,res)=>{
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        })
    })
})

// {
//     "id": "5f48662cc27b13b36c1ad556",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDg2NjJjYzI3YjEzYjM2YzFhZDU1NiIsInVzZXJuYW1lIjoiYWEiLCJpYXQiOjE1OTg1ODA0NTd9.B_oLJS8yPM1aAHHbF_K8zOl6VjF7jOIbzKdaSM4jkcE",
//     "username": "aa"
// }