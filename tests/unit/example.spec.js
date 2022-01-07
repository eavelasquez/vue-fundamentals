/**
 * My first test
 */
describe('Example Component', () => {
  test('should be greater than 10', () => {
    // Arrange
    let value = 9

    // Act
    value += 2

    // Assert

    // if (value > 10) {
    // } else {
    //   throw `${value} isn't greater than 10` // The exceptions are failed tests
    // }

    expect(value).toBeGreaterThan(10)
  })
})
