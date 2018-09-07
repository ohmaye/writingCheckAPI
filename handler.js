"use strict";
const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({ region: "us-east-1" });


module.exports.endpoint = (event, context, callback) => {
  let writing = "***";
  let sample = "!!!";

  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body);
    writing = body.writing;
    sample = body.sample;
  }

  let termFrequencyResult = 0;
  let result = "No result returned.";
  let response = {}

  const params = {
    FunctionName: "termfrequencylambda-dev-termFrequency",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify({ writing: writing, sample: sample})
  };

  lambda.invoke(params, (error, data) => {
    if (error) {
      console.log("Error calling lambda");
    } else {
      console.log(data.Payload)
      result = data.Payload
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: {
            TermFrequency: termFrequencyResult,
            Student: writing,
            Sample: sample,
            Data: result
          }
        })
      }
      callback(null, response);
    }
  });

};
