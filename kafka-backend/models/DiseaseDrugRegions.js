var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var DiseaseDrugRegionSchema = new Schema(
  {
    Disease: { type: String },
    Region: { type: String },
    Value: { type: Number },
    Drug1: { type: String },
    Drug2: { type: String },
    Drug3: { type: String },
    State: { type: String }
  },
  {
    collection: "DiseaseDrugRegions"
  }
);

var DiseaseDrugRegions = mongoose.model("DiseaseDrugRegions", DiseaseDrugRegionSchema, "DiseaseDrugRegions");
// the last parameter tells the mongodb server which collection to use ie User here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = DiseaseDrugRegions;
