// import productsList from '../productsList.json'
import axios from 'axios'

const getProductsList = async () => {
  try {
    const { data: productsList } = await axios.get('https://cycle-store-products.s3-eu-west-1.amazonaws.com/productsList.json')
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200,
      body: JSON.stringify(productsList)
    }
  } catch (error) {
    console.log(error)
  }
};

export default getProductsList
