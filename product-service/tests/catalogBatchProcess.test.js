/**
 * @jest-environment node
 */

import catalogBatchProcess from '../src/handlers/catalogBatchProcess'
import AWSMock from 'aws-sdk-mock'

const validProduct = {
  count: 1,
  description: "Test description",
  price: 10,
  title: "Test title"
}
const invalidProduct = { ...validProduct, price: 'string' }

AWSMock.mock('SNS', 'publish', 'message has been published to SNS')

jest.mock('../src/models/product', () => ({
  addProduct: product => ({ ...product, id: 'test-id-12345' })
}))

describe('catalogBatchProcess', () => {

  it('should console.log error when product is not valid', async () => {
    
    const consoleLogSpy = jest.spyOn(console, "log")
    await catalogBatchProcess(
      { Records: [{ body: JSON.stringify(invalidProduct) }] },
      { awsRequestId: 'tets-id-12345' }
    )
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Invalid product, not created: ',
      {"count": 1, "description": "Test description", "image": "https://discerningcyclist.com/wp-content/uploads/2020/03/waterproof-bike-cover.png", "price": "string", "title": "Test title"}
    )
  })

  it("should console.log success message when product is valid", async () => {
    
    const consoleLogSpy = jest.spyOn(console, "log")
    await catalogBatchProcess(
      { Records: [{ body: JSON.stringify(validProduct) }] },
      { awsRequestId: 'tets-id-12345' }
    )

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Product created: ',
      {"count": 1, "description": "Test description", "image": "https://discerningcyclist.com/wp-content/uploads/2020/03/waterproof-bike-cover.png", "price": 10, "title": "Test title"}
    )
  })

})

