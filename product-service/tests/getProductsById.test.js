/**
 * @jest-environment node
 */

import getProductsById from '../src/handlers/getProductsById'

describe('getProductsById', () => {
  it('should return object', async () => {
    const response = await getProductsById({
      pathParameters: { productId: '18536229-9725-4217-b7f7-61119d75a21d' }
      })
    const product = JSON.parse(response.body)
    expect(product).toBeDefined()
    expect(product.title).toBeTruthy()
    expect(product.price).toBeTruthy()
  })
})