require('./app/models/lesson.model.js');
require('./app/models/user.model.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/flards');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we\'re connected');
});

var restify = require('restify'),
  fs = require('fs');

var controllers = {}
  , controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file) {
  if (file.indexOf('.js') != -1) {
    controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
  }
});

var server = restify.createServer();

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

// Lesson Start
server.post('/lessons', controllers.lesson.createLesson);
server.put('/lessons/:id', controllers.lesson.updateLesson);
server.del('/lessons/:id', controllers.lesson.deleteLesson);
server.get('/lessons/:id', controllers.lesson.viewLesson);
// Lesson End

var port = process.env.PORT || 3000;
server.listen(port, function (err) {
  if (err)
    console.error(err);
  else
    console.log('App is ready at : ' + port)
});

if (process.env.environment == 'production')
  process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
  });