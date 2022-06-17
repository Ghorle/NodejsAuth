const {
    check
  } = require('express-validator');
  const path = require('path')
  const dotenv = require('dotenv')
  dotenv.config({ path: './config/config.env' });
  
  const AWS = require('aws-sdk');
  
  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  
  const docClient = new AWS.DynamoDB.DocumentClient();
  
  exports.postBooksValidators = [
    check('rating').isNumeric(),
    check('isbn').custom(async value => {
      const params = {
        TableName: 'Nodejs-api'
      }
      let books = await docClient.scan(params).promise()
      let existingBook = books.Items.find(b => b.isbn === value)
      if (existingBook) {
        return Promise.reject("That book already exists");
      }
    })
  ]
  
  
  
  