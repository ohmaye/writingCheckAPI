"use strict"
const AWS = require("aws-sdk")
const { Observable, from, just } = require("rxjs")
const { map } = require("rxjs/operators")

// Read SAMPLE from the TemplateCourseItem dynamodb table
const TABLE_NAME = "TemplateCourseItem"

AWS.config.update({ region: "us-east-1" })

const lambda = new AWS.Lambda({ region: "us-east-1" })
const dynamoDB = new AWS.DynamoDB.DocumentClient()

let writing = "*"
let TemplateCourseItem_id = null
let CourseVersion = null
let sample = "!"

let termFrequencyResult = 0
let result = "No result returned."
let response = {}

module.exports.endpoint = (event, context, callback) => {
  
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    writing = body.writing
    TemplateCourseItem_id = body.TemplateCourseItem_id
    CourseVersion = body.CourseVersion
  }
  

  const paramsDB = {
    TableName: TABLE_NAME,
    Key: {
      TemplateCourseItem_id: TemplateCourseItem_id,
      CourseVersion: CourseVersion
    },
    ProjectionExpression: "ModelTxtUrl"
  }

  dynamoDB.get(paramsDB, (error, result) => {
    // Handle errors
    if (error) {
      console.log("Error reading DB")
      return
    }
    sample = JSON.stringify(result.Item.ModelTxtUrl)
    const params = {
      FunctionName: "termfrequencylambda-dev-termFrequency",
      InvocationType: "RequestResponse",
      Payload: JSON.stringify({ writing: writing, sample: sample })
    }

    lambda.invoke(params, (error, data) => {
      if (error) {
        console.log("Error calling lambda")
      } else {
        console.log(data.Payload)
        result = JSON.parse(data.Payload)
        response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            message: {
              termFrequency: result.termFrequency,
              student: result.student_writing,
              sample: result.school_sample
            }
          })
        }
        callback(null, response)
      }
    })
  })
}
