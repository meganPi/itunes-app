const chai = require("chai");
const fetch = require("node-fetch");

const assert = chai.as;
const expect = chai.expect;
//test to see if fecth API successful.
//the limit on a search return is 50,
//return succesful if response is 50.
describe("fetch third party API data", () => {
  it("itunes search data", async () => {
    await fetch("https://itunes.apple.com/search?term=Jack+Johnson&media=music&country=ZA")
      .then(res => {
        return res.json();
      })
      .then(res => {
        expect(res.results.length).to.equal(50)
      });
  });
});
