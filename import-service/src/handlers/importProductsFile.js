const AWS = require('aws-sdk')
const { S3_BUCKET } = process.env

const importProductsFile = async event => {
  console.log('function has been invoked with event: ', event)
  const fileName = event.queryStringParameters.name
  const filePath = `uploaded/${fileName}`
  const s3 = new AWS.S3({
    region: 'eu-west-1',
    signatureVersion: 'v4'
  })
  const params = {
    Bucket: S3_BUCKET,
    Key: filePath,
    Expires: 60,
    ContentType: 'text/csv'
  }

  try {
    const url = await s3.getSignedUrlPromise('putObject', params)
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: url
    }
  } catch (error) {
    console.log('Cannot get signed URL:', error)
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: error
    }
  }
}

module.exports = importProductsFile