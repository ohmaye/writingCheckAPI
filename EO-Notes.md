- Don't forget to add "cors: true" if it is going to be connected through API Gateway
- !!! Testing from lambda requires a different way of getting parameters from API Gateway.
-   if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    writing = body.writing;
    sample = body.sample;
  }
- Above works for API Gateway, but not for pure lambda
- 