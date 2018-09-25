- Don't forget to add "cors: true" if it is going to be connected through API Gateway
- !!! Testing from lambda requires a different way of getting parameters from API Gateway.
-   if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    writing = body.writing;
    sample = body.sample;
  }
- Above works for API Gateway, but not for pure lambda
- 2018.09.25
  - Did a first attempt at handling the DynamoDB call using RxJS. Got stuck.
  - Saw that there's ajaxGetJSON in RxJS. Thought about setting up API Gateway
  to talk to DynamoDB. Should be easy, but got stuck with access roles.
  - Went back to callbacks in the lambda function. Did an ugly copy-paste of the
  "callback" code in the dynamoDB.get call and it works for now.
  