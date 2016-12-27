var mongoose = require('mongoose'),
  Lesson = mongoose.model("Lesson"),
  ObjectId = mongoose.Types.ObjectId;

exports.createLesson = function (req, res, next) {
  console.log('create', req.body);
  var LessonModel = new Lesson(req.body);
  LessonModel.save(function (err, Lesson) {
    console.log('err', err);

    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      res.json({
        type: true,
        data: Lesson
      })
    }
  })
};

exports.viewLesson = function (req, res, next) {
  Lesson.findById(new ObjectId(req.params.id), function (err, Lesson) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      if (Lesson) {
        res.json({
          type: true,
          data: Lesson
        })
      } else {
        res.json({
          type: false,
          data: "Lesson: " + req.params.id + " not found"
        })
      }
    }
  })
};

exports.viewLesson_v2 = function (req, res, next) {
  Lesson.findById(new ObjectId(req.params.id), function (err, Lesson) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      if (Lesson) {
        Lesson.title = Lesson.title + " v2"
        res.json({
          type: true,
          data: Lesson
        })
      } else {
        res.json({
          type: false,
          data: "Lesson: " + req.params.id + " not found"
        })
      }
    }
  })
};

exports.updateLesson = function (req, res, next) {
  var updatedLessonModel = new Lesson(req.body);
  Lesson.findByIdAndUpdate(new ObjectId(req.params.id), updatedLessonModel, function (err, Lesson) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      if (Lesson) {
        res.json({
          type: true,
          data: Lesson
        })
      } else {
        res.json({
          type: false,
          data: "Lesson: " + req.params.id + " not found"
        })
      }
    }
  })
};

exports.deleteLesson = function (req, res, next) {
  Lesson.findByIdAndRemove(new Object(req.params.id), function (err, Lesson) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      res.json({
        type: true,
        data: "Lesson: " + req.params.id + " deleted successfully"
      })
    }
  })
};