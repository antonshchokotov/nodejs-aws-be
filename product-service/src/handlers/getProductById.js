import productModel from '../models/product'

const getProductById = async event => {
  console.log('Lambda function has been invoked with event:', event)
  const productId = event.pathParameters.productId
  console.log('Product ID:', productId)
  try {
    const product = await productModel.getById(productId)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: product ? 200 : 404,
      body: product ? JSON.stringify(product) : 'Product not found'
    }
  } catch (error) {
    // check if postgreSQL error code is "INVALID TEXT REPRESENTATION"
    const isProductIdWrong = error.code === '22P02'
    !isProductIdWrong && console.log('Error during DB query execution', error)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: isProductIdWrong ? 404 : 500,
      body: isProductIdWrong ? 'Product not found' : 'Internal server error'
    }
  }
};

export default getProductById
