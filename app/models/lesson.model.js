var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var LessonSchema = new Schema({
  name: String
});

mongoose.model('Lesson', LessonSchema);