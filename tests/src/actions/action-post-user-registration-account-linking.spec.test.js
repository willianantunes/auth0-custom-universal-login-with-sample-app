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
      request: {
        geoip: {
          cityName: "Maringá",
          continentCode: "SA",
          countryCode3: "BRA",
          countryCode: "BR",
          countryName: "Brazil",
          latitude: -10.3787,
          longitude: -10.9489,
          timeZone: "America/Sao_Paulo",
        },
        hostname: "antunes.us.auth0.com",
        ip: "2804:14d:1a86:c345:f432:53aa:394d:0000",
        language: "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
        method: "POST",
        user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      connection: { id: "con_QjYWduD8R790VN7p", metadata: {}, name: "email", strategy: "email" },
      tenant: { id: "antunes" },
      transaction: {
        acr_values: [],
        id: "zPKNreafmw5bYJiknEoITpn-qc6irNVg",
        locale: "pt-BR",
        protocol: "oidc-basic-profile",
        requested_scopes: ["openid", "profile", "email"],
        ui_locales: [],
      },
      user: {
        email: "willianlimaantunes@gmail.com",
        tenant: "antunes",
        user_id: "email|618d902978d57a7db2a8d5f8",
        app_metadata: {},
        user_metadata: {},
        email_verified: false,
        phone_verified: false,
      },
      configuration: {},
      secrets: {
        APP_CLIENT_ID: "YOUR-CLIENT-ID",
        APP_CLIENT_SECRET: "YOUR-CLIENT-SECRET",
        AUDIENCE: "https://antunes.us.auth0.com/api/v2/",
        TENANT: "antunes",
      },
    }
    // Act
    await onExecutePostUserRegistration(fakeEventInput)
    // Assert
    const result = await managementClient.getUsers()
    expect(result.length).toBe(1)
  })
})
