const sinon = require("sinon");
const { expect } = require("chai");
const request = require("superTest");
const redirection = require("../services/redirection");
const { app } = require("../app");

describe("**** Test Redirect services ****", async () => {
  it("Test default redirect if no data is returned", async () => {
    sinon.stub(redirection, "getStrapiRedirect").returns(
      Promise.resolve({
        data: []
      })
    );

    const results = await request(app).get("/").expect(301);
    expect(results.res.headers["location"]).to.eq(process.env.DEFAULT_URL);

    sinon.restore();
  });

  it("Test redirect to webpage", async () => {
    sinon.stub(redirection, "getStrapiRedirect").returns(
      Promise.resolve({
        data: [
          {
            destination: "https://speedoc.com/my"
          }
        ]
      })
    );

    const results = await request(app).get("/").expect(301);
    expect(results.res.headers["location"]).to.eq("https://speedoc.com/my");

    sinon.restore();
  });


});
