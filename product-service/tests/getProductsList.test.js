/**
 * @jest-environment node
 */

import getProductsList from '../src/handlers/getProductsList'

describe('getProductsList', () => {
  it('should return an array', async () => {
    const response = await getProductsList()
    const productsList = JSON.parse(response.body)
    expect(productsList).toBeDefined()
    expect(Array.isArray(productsList)).toBe(true)
  })
})