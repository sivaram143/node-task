var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

 
/* GET home page. */
router.get('/', function(req, res, next) {
   logger.info("--------Index Route called-------")
   res.render('index', { title: 'NODE TASK' });
});
 
router.get('/api/process/:pname', function (req, res) {
  logger.info("---------GET Route Called--------------");
  var response = {};
  response.process = req.params.pname;
  response.envs = [];

  var env_file = fs.readFileSync(path.join(__dirname, '..', "process", req.params.pname + ".env"), 'utf8');
  logger.info(env_file);
  response.envs = (env_file.split('\n') || []).map(function(entry) {
  var obj = {};
  obj.key = entry.split("=")[0];
  obj.value = entry.split("=")[1];
      return obj;
  });
  logger.info(response);

  res.status(200);
  res.send(response);
});

router.post('/api/process/:pname', function (req, res) {
  logger.info("---------POST Route Called--------------");
  var file_path = path.join(__dirname, '..', "process", req.params.pname + ".env");
  var file = [];
 
  for (key in req.body) {
    file.push(key + "=" + req.body[key]);
  }

  logger.info(file.join("\n"));
  fs.truncateSync(file_path);
  fs.writeFileSync(file_path, file.join("\n"));

  logger.info(file_path);
  res.status(200);
  res.send({status: "ok"});
});

module.exports = router;
