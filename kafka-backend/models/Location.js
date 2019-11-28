var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var LocationSchema = new Schema(
  {
    Locations: { type: String}
  },
  {
    collection: "location"
  }
);

var Location = mongoose.model("location", LocationSchema, "location");
// the last parameter tells the mongodb server which collection to use ie User here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Location;
