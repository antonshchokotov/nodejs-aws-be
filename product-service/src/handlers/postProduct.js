import productModel from '../models/product'
import isImageUrl from '../utils/isImageUrl'

const postProduct = async event => {
  console.log('Lambda function has been invoked with event:', event)
  const product = JSON.parse(event.body)
  console.log('Product:', product)
  const isImageReceived = product.image ? true : false
  if (!isImageReceived) {
    product.image = 'https://discerningcyclist.com/wp-content/uploads/2020/03/waterproof-bike-cover.png'
  }
  const {
    title,
    description,
    price,
    image,
    count
  } = product

  // check that product data is valid
  if (typeof(title) !== 'string'
    || typeof(description) !== 'string'
    || typeof(price) !== 'number'
    || typeof(image) !== 'string'
    || !Number.isInteger(count)
    || count <= 0
    || (isImageReceived && !await isImageUrl(image))) {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 400,
      body: 'Bad request'
    }
  }

  try {
    const createdProduct = await productModel.addProduct(product)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200,
      body: JSON.stringify(createdProduct)
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

export default postProduct
