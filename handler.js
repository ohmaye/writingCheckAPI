"use strict";

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
