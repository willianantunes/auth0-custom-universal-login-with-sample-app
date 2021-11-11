import { ManagementClient } from "auth0"

describe("Playing with Auth0 SDK Management API", () => {
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

  test("Should retrieve all users", async () => {
    // Act
    const result = await managementClient.getUsers()
    // Assert
    expect(result).toBeTruthy()

    /*
    Before merging:
[
  {
    "created_at": "2021-11-11T00:42:18.587Z",
    "email": "willianlimaantunes@gmail.com",
    "email_verified": true,
    "identities": [
      {
        "user_id": "618c66ca78d57a7db2980d01",
        "provider": "email",
        "connection": "email",
        "isSocial": false
      }
    ],
    "name": "willianlimaantunes@gmail.com",
    "nickname": "willianlimaantunes",
    "picture": "https://s.gravatar.com/avatar/43dae36aefb1c5768a9c4d9d649e1742?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwi.png",
    "updated_at": "2021-11-11T00:42:18.587Z",
    "user_id": "email|618c66ca78d57a7db2980d01",
    "last_login": "2021-11-11T00:42:18.584Z",
    "last_ip": "2804:14d:1a86:c345:569b:464e:54a4:1013",
    "logins_count": 1
  },
  {
    "created_at": "2021-11-11T00:41:21.572Z",
    "email": "willianlimaantunes@gmail.com",
    "email_verified": true,
    "identities": [
      {
        "user_id": "618c66b1ab79c90071376b4a",
        "provider": "auth0",
        "connection": "Username-Password-Authentication",
        "isSocial": false
      }
    ],
    "name": "willianlimaantunes@gmail.com",
    "nickname": "willianlimaantunes",
    "picture": "https://s.gravatar.com/avatar/43dae36aefb1c5768a9c4d9d649e1742?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwi.png",
    "updated_at": "2021-11-11T00:42:05.678Z",
    "user_id": "auth0|618c66b1ab79c90071376b4a",
    "username": "cockatiel",
    "last_login": "2021-11-11T00:41:22.761Z",
    "last_ip": "2804:14d:1a86:c345:569b:464e:54a4:1013",
    "logins_count": 1
  }
]
     */
    /*
    After merging:
    [
  {
    "created_at": "2021-11-11T00:42:18.587Z",
    "email": "willianlimaantunes@gmail.com",
    "email_verified": true,
    "identities": [
      {
        "user_id": "618c66ca78d57a7db2980d01",
        "provider": "email",
        "connection": "email",
        "isSocial": false
      },
      {
        "profileData": {
          "email": "willianlimaantunes@gmail.com",
          "email_verified": true,
          "username": "cockatiel"
        },
        "user_id": "618c66b1ab79c90071376b4a",
        "provider": "auth0",
        "connection": "Username-Password-Authentication",
        "isSocial": false
      }
    ],
    "name": "willianlimaantunes@gmail.com",
    "nickname": "willianlimaantunes",
    "picture": "https://s.gravatar.com/avatar/43dae36aefb1c5768a9c4d9d649e1742?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwi.png",
    "updated_at": "2021-11-11T14:16:44.776Z",
    "user_id": "email|618c66ca78d57a7db2980d01",
    "last_login": "2021-11-11T00:42:18.584Z",
    "last_ip": "2804:14d:1a86:c345:569b:464e:54a4:1013",
    "logins_count": 1
  }
]
     */
  })

  test("Should link accounts", async () => {
    // Arrange
    const fakeResultFromGetUsers = [
      {
        created_at: "2021-11-11T00:42:18.587Z",
        email: "willianlimaantunes@gmail.com",
        email_verified: true,
        identities: [
          {
            user_id: "618c66ca78d57a7db2980d01",
            provider: "email",
            connection: "email",
            isSocial: false,
          },
        ],
        name: "willianlimaantunes@gmail.com",
        nickname: "willianlimaantunes",
        picture:
          "https://s.gravatar.com/avatar/43dae36aefb1c5768a9c4d9d649e1742?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwi.png",
        updated_at: "2021-11-11T00:42:18.587Z",
        user_id: "email|618c66ca78d57a7db2980d01",
        last_login: "2021-11-11T00:42:18.584Z",
        last_ip: "2804:14d:1a86:c345:569b:464e:54a4:1013",
        logins_count: 1,
      },
      {
        created_at: "2021-11-11T00:41:21.572Z",
        email: "willianlimaantunes@gmail.com",
        email_verified: true,
        identities: [
          {
            user_id: "618c66b1ab79c90071376b4a",
            provider: "auth0",
            connection: "Username-Password-Authentication",
            isSocial: false,
          },
        ],
        name: "willianlimaantunes@gmail.com",
        nickname: "willianlimaantunes",
        picture:
          "https://s.gravatar.com/avatar/43dae36aefb1c5768a9c4d9d649e1742?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwi.png",
        updated_at: "2021-11-11T00:42:05.678Z",
        user_id: "auth0|618c66b1ab79c90071376b4a",
        username: "cockatiel",
        last_login: "2021-11-11T00:41:22.761Z",
        last_ip: "2804:14d:1a86:c345:569b:464e:54a4:1013",
        logins_count: 1,
      },
    ]
    const primaryAccount = fakeResultFromGetUsers[0]
    const secondaryAccount = fakeResultFromGetUsers[1]
    // Act
    // Required data to send the request to link accounts
    const primaryAccountId = primaryAccount.user_id
    const secondaryAccountId = secondaryAccount.user_id
    const identityDetails = secondaryAccount.identities[0]
    const secondaryAccountProviderName = identityDetails.provider
    // Doing the request in fact
    const bodyFromLinkUsers = {
      user_id: secondaryAccountId,
      provider: secondaryAccountProviderName,
    }
    const linkUsersResult = await managementClient.linkUsers(primaryAccountId, bodyFromLinkUsers)
    // Assert
    expect(linkUsersResult).toBeTruthy()
    /*
    Retrieved result after linking:
    [
  {
    "profileData": {
      "email": "willianlimaantunes@gmail.com",
      "email_verified": true
    },
    "user_id": "618c66ca78d57a7db2980d01",
    "provider": "email",
    "connection": "email",
    "isSocial": false
  },
  {
    "profileData": {
      "email": "willianlimaantunes@gmail.com",
      "email_verified": true,
      "username": "cockatiel"
    },
    "user_id": "618c66b1ab79c90071376b4a",
    "provider": "auth0",
    "connection": "Username-Password-Authentication",
    "isSocial": false
  }
]
     */
  })

  test("Should retrieve user by custom query", async () => {
    // Arrange
    const someUserFromTheWild = {
      email: "willianlimaantunes@gmail.com",
      user_id: "email|618d353f78d57a7db2854d91",
    }
    const { email, user_id: userId } = someUserFromTheWild
    const bodyFromGetUsers = {
      search_engine: "v3",
      q: `email: "${email}" AND email_verified:true -user_id:"${userId}"`,
    }
    // Act
    const usersFound = await managementClient.getUsers(bodyFromGetUsers)
    // Assert
    expect(usersFound).toBeTruthy()
  })
})
