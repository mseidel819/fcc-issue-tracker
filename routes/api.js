"use strict";
const { postIssue, getIssues } = require("../issue/issue-controller");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(getIssues)

    .post(postIssue)

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
