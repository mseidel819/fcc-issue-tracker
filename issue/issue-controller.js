const Issue = require("./issue-model");

exports.postIssue = async (req, res) => {
  try {
    let project = req.params.project;
    console.log(req.body);
    if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by)
      throw new Error("required field(s) missing");

    const newIssue = await Issue.create(req.body);
    console.log(newIssue);
    res.json(newIssue);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};

exports.getIssues = async (req, res) => {
  try {
    let project = req.params.project;

    const issues = await Issue.find(req.query);

    res.json(issues);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};
