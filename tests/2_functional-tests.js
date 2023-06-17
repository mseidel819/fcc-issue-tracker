const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  // Create an issue with every field: POST request to /api/issues/{project}
  test("Create an issue with every field: POST request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_title: "Title",
        issue_text: "text",
        created_by: "Functional Test - Every field filled in",
        assigned_to: "Chai and Mocha",
        status_text: "In QA",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "Title");
        assert.equal(res.body.issue_text, "text");
        assert.equal(
          res.body.created_by,
          "Functional Test - Every field filled in"
        );
        assert.equal(res.body.assigned_to, "Chai and Mocha");
        assert.equal(res.body.status_text, "In QA");
        done();
      });
  });

  // Create an issue with only required fields: POST request to /api/issues/{project}
  test("Create an issue with only required fields: POST request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_title: "Title",
        issue_text: "text",
        created_by: "Functional Test - Only required fields filled in",
      })
      .end((err, res) => {
        assert.equal(res.body.issue_title, "Title");
        assert.equal(res.body.issue_text, "text");
        assert.equal(
          res.body.created_by,
          "Functional Test - Only required fields filled in"
        );
        assert.equal(res.body.assigned_to, "");
        assert.equal(res.body.status_text, "");
        done();
      });
  });
  // Create an issue with missing required fields: POST request to /api/issues/{project}
  test("Create an issue with missing required fields: POST request to /api/issues/{project}", (done) => {
    chai

      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_title: "Title",
        issue_text: "text",
      })
      .end((err, res) => {
        assert.equal(res.body.error, "required field(s) missing");
        done();
      });
  });
  // View issues on a project: GET request to /api/issues/{project}
  test("View issues on a project: GET request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .get("/api/issues/apitest")
      .end((err, res) => {
        assert.isArray(res.body);
        done();
      });
  });
  // View issues on a project with one filter: GET request to /api/issues/{project}
  test("View issues on a project with one filter: GET request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .get("/api/issues/apitest?issue_title=Title")
      .end((err, res) => {
        assert.isArray(res.body);
        assert.equal(res.body[0].issue_title, "Title");
        done();
      });
  });
  // View issues on a project with multiple filters: GET request to /api/issues/{project}
  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .get("/api/issues/apitest?issue_title=Title&issue_text=text")
      .end((err, res) => {
        assert.isArray(res.body);
        assert.equal(res.body[0].issue_title, "Title");
        assert.equal(res.body[0].issue_text, "text");
        done();
      });
  });
  // update one field on an issue: PUT request to /api/issues/{project}

  test("update one field on an issue: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "648e1548d35427662b26454b",
        issue_title: "Title",
      })
      .end((err, res) => {
        assert.equal(res.body.result, "successfully updated");
        assert.equal(res.body._id, "648e1548d35427662b26454b");
        done();
      });
  });

  // Update multiple fields on an issue: PUT request to /api/issues/{project}
  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "648e1548d35427662b26454b",
        issue_title: "Title",
        issue_text: "text",
        created_by: "Functional Test - Only required fields filled in",
      })
      .end((err, res) => {
        assert.equal(res.body.result, "successfully updated");
        assert.equal(res.body._id, "648e1548d35427662b26454b");
        done();
      });
  });

  // Update an issue with missing _id: PUT request to /api/issues/{project}
  test("Update an issue with missing _id: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        issue_title: "Title",
        issue_text: "text",
        created_by: "Functional Test - Only required fields filled in",
      })
      .end((err, res) => {
        assert.equal(res.body.error, "missing _id");
        done();
      });
  });
  // Update an issue with no fields to update: PUT request to /api/issues/{project}
  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "648e1548d35427662b26454b",
      })
      .end((err, res) => {
        assert.equal(res.body.error, "no update field(s) sent");
        done();
      });
  });
  // Update an issue with an invalid _id: PUT request to /api/issues/{project}
  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "648e11e56480fef4dee3ce4b",
        issue_title: "Title",
        issue_text: "text",
        created_by: "Functional Test - Only required fields filled in",
      })
      .end((err, res) => {
        assert.equal(res.body.error, "could not update");
        done();
      });
  });
  // Delete an issue: DELETE request to /api/issues/{project}
  test("Delete an issue: DELETE request to /api/issues/{project}", (done) => {
    const document = {
      issue_title: "Title",
      issue_text: "text",
      created_by: "Functional Test - Every field filled in",
      assigned_to: "Chai and Mocha",
      status_text: "In QA",
    };

    chai
      .request(server)
      .post("/api/issues/apitest")
      .send(document)
      .end((err, res) => {
        //   expect(res.body).to.have.property("_id");

        const documentId = res.body._id;

        chai
          .request(server)
          .delete("/api/issues/apitest")
          .send({
            _id: documentId,
          })
          .end((err, res) => {
            assert.equal(res.body.result, "successfully deleted");
            assert.equal(res.body._id, documentId);
            done();
          });
      });
  });
  // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .delete("/api/issues/apitest")
      .send({
        _id: "648e11e56480fef4dee3ce4b",
      })
      .end((err, res) => {
        assert.equal(res.body.error, "could not delete");
        done();
      });
  });
  // Delete an issue with missing _id: DELETE request to /api/issues/{project}
  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .delete("/api/issues/apitest")
      .send({})
      .end((err, res) => {
        assert.equal(res.body.error, "missing _id");
        done();
      });
  });
});
