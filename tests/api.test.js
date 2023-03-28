"use strict";

const request = require("supertest");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const app = require("../src/app")(db);
const buildSchemas = require("../src/schemas");

describe("API tests", () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe("GET /health", () => {
        it("should return health", (done) => {
            request(app)
                .get("/health")
                .expect("Content-Type", /text/)
                .expect(200, done);
        });
    });
    describe("GET /rides", () => {
        before((done) => {
          // populate the database with some rides
          db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
            db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                    db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                        db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                            db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                                db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                                    db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                                        db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                                            db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                                                 db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                                                      db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [30, 30, 40, 40, "Rider 2", "Driver 2", "Car 2"], done);
                                                         db.run("INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", [10, 10, 20, 20, "Rider 1", "Driver 1", "Car 1"], () => {
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        });
    
        it("should return all rides by default", (done) => {
          request(app)
            .get("/rides")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
                if(res.body.length==10)
                    done();
                else
                    done("failed");
            });
        });
    
        it("should return rides according to the specified limit and page numbers", (done) => {
          request(app)
            .get("/rides?page=2&limit=10")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
    
              if(res.body.length==3)
                    done();
                else
                    done("failed");
            });
        });
    
    });
});