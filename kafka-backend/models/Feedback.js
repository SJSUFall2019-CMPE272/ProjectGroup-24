var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var FeedbackSchema = new Schema(
  {
    email: { type: String},
    message: { type: String},
    date:{type: Date, default: Date.now}
  },
  {
    collection: "Feedback"
  }
);

var Feedback = mongoose.model("Feedback", FeedbackSchema, "Feedback");
// the last parameter tells the mongodb server which collection to use ie User here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Feedback;
