import productModel from '../models/product'

const getProductsList = async event => {
  console.log('Lambda function has been invoked with event:', event)
  try {
    const products = await productModel.getAll()
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    console.log('Error during DB query execution', error)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 500,
      body: 'Internal server error'
    }
  } 
};

export default getProductsList
