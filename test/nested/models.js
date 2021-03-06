"use strict";

module.exports = function(connection) {

    var mongoose = require("mongoose-q")(),
        mongooseRefQuery = require("../../lib/mongoose-ref-query"),
        Types = mongoose.Schema.Types;

    var smurfSchema = new mongoose.Schema({
      name: String,
      eats_humans: Boolean,
      foods: [ new mongoose.Schema({
        food_name: String,
        vegetarian: Boolean,
        calories: Number,
        records: [ new mongoose.Schema({
            event_name: String,
            amount: Number
        })]
      })],
      memories: [ new mongoose.Schema({
          name: String,
          location: Array
      })],
      mixed: Types.Mixed
    });

    smurfSchema.index({"memories.location":"2d"});
    smurfSchema.plugin(mongooseRefQuery);

    return {
        Smurf: connection.model("Smurf", smurfSchema)
    };

};
