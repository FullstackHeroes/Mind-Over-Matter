const { expect } = require("chai");
const request = require("supertest");
const db = require("../db");
const app = require("../index");
const User = db.model("user");

describe("Screen Time routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("/api/user/", () => {
    beforeEach(() => {
      return User.create({
        name: "Falcon",
        email: "falcon@useless.biz"
      });
    });

    it("GET /api/users", async () => {
      const res = await request(app)
        .get("/api/users")
        .expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body[0].name).to.be.equal("Falcon");
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
