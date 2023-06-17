"use strict";
const {
  postIssue,
  getIssues,
  deleteAllIssues,
  putIssue,
} = require("../issue/issue-controller");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(getIssues)

    .post(postIssue)

    .put(putIssue)
    // .delete(deleteAllIssues);
    .delete(function (req, res) {
      let project = req.params.project;
    });
};
