const Issue = require("./issue-model");

exports.postIssue = async (req, res) => {
  try {
    let project = req.params.project;
    if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by)
      throw new Error("required field(s) missing");

    const newIssue = await Issue.create({ ...req.body, project: project });
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

    const filter = { ...req.query, project: project };

    const issues = await Issue.find(filter);

    res.json(issues);
  } catch (err) {
    // console.log(err);
    res.json({ error: err.message });
  }
};

exports.putIssue = async (req, res) => {
  const { _id, ...update } = req.body;

  try {
    let project = req.params.project;

    if (!_id || _id === "") throw new Error("missing _id");

    //if no update fields sent, return 'no updated field sent'
    if (Object.keys(update).length === 0)
      throw new Error("no update field(s) sent");

    //find issue by id and update
    const updatedIssue = await Issue.findByIdAndUpdate(
      _id,
      { update, updated_on: new Date() },
      {
        new: true,
      }
    );

    Object.keys(update).forEach((item) => {
      console.log(item);
      if (!updatedIssue[item]) throw new Error("could not update");
    });

    res.json({ result: "successfully updated", _id });
  } catch (err) {
    if (!_id) {
      res.json({ error: "missing _id" });
    } else if (Object.keys(update).length === 0) {
      res.json({ error: "no update field(s) sent", _id });
    } else res.json({ error: "could not update", _id });
  }
};

exports.deleteAllIssues = async (req, res) => {
  try {
    let project = req.params.project;

    const issues = await Issue.deleteMany();

    res.json(issues);
  } catch (err) {
    // console.log(err);
    res.json({ error: err.message });
  }
};
