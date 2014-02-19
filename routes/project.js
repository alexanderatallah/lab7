var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find({"_id": projectID})
    .sort('-date')
    .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var newProject = new models.Project({
    "title": form_data.project_title,
    "date": new Date(form_data.date),
    "summary": form_data.summary,
    "image": form_data.image_url
  });
  newProject.save(afterSaving);

  function afterSaving(err, projects) {
    if(err) {console.log(err); res.send(500);}
    else res.send();
  }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemove);

  function afterRemove(err) {
    if(err) {console.log(err); res.send(500);}
    else res.send();
  }
}