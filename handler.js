"use strict";
const AWS = require("aws-sdk")

const lambda = new AWS.lambda({region:"us-east-1"})
const message_string = {}
const params = {
  FunctionName: "writingCheck-dev-writingCheck",
  InvocationType: "RequestResponse",
  Payload: JSON.stringify({"writing":"hello","sample":"hi"})
}
lambda.invoke(params, (error, data) => {
  console.log("Done calling lambda")
})

module.exports.endpoint = (event, context, callback) => {
  let writing = '***'
  let sample = '!!!'

  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    writing = body.writing;
    sample = body.sample;
  }

  let termFrequencyResult = 0;



  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        TermFrequency: termFrequencyResult,
        Student: writing,
        Sample: sample
      }
    })
  };

  callback(null, response);
};
