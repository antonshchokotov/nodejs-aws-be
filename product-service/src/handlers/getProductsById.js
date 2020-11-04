// import productsList from '../productsList.json'
import axios from 'axios'

const getProductsById = async (event) => {
  try {
    const { data: productsList } = await axios.get('https://cycle-store-products.s3-eu-west-1.amazonaws.com/productsList.json')
    const productId = event.pathParameters.productId
    const product = productsList.find(product => product.id === productId)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: product ? 200 : 404,
      body: product ? JSON.stringify(product) : 'Product not found'
    }
  } catch (error) {
    console.log(error)
  }
};

export default getProductsById
