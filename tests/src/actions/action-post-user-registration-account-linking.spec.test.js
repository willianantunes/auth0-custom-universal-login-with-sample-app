const { onExecutePostUserRegistration } = require("../../../src/actions/action-post-user-registration-account-linking")
const { ManagementClient } = require("auth0")

jest.setTimeout(240_000)

describe("Post user registration: Account linking", () => {
  let managementClient

  beforeAll(async () => {
    managementClient = new ManagementClient({
      domain: `antunes.us.auth0.com`,
      scope: `read:users update:users`,
      clientId: `YOUR-CLIENT-ID`,
      clientSecret: `YOUR-CLIENT-SECRET`,
      audience: `https://antunes.us.auth0.com/api/v2/`,
    })
  })

  test("Should link accounts when the new one has an e-mail that matches an existing one", async () => {
    // Arrange
    const fakeEventInput = {
      secrets: {
        TENANT: `antunes`,
        AUDIENCE: `https://antunes.us.auth0.com/api/v2/`,
        APP_CLIENT_ID: `YOUR-CLIENT-ID`,
        APP_CLIENT_SECRET: `YOUR-CLIENT-SECRET`,
      },
      user: {
        email: `willianlimaantunes@gmail.com`,
        user_id: "email|618d353f78d57a7db2854d91",
      },
    }
    // Act
    await onExecutePostUserRegistration(fakeEventInput)
    // Assert
    const result = await managementClient.getUsers()
    expect(result.length).toBe(1)
  })
})
