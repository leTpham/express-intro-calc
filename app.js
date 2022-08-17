/** Simple demo Express app. */

const express = require("express");
const { request } = require("http");
const { findMean } = require("./stats")
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res){

  let queries = req.query.nums.split(",")

  if (queries.length === 0) {
    throw new BadRequestError("Nums are required")
  }
  //just call convertStrNUms if theres an error it'll go to global error handler
  let result = convertStrNums(queries)

  let meanValue = findMean(result)
  
    return res.json({response: {
      operation: "mean",
      value: meanValue
    }})


})

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;