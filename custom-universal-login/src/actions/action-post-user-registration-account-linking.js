/**
 * Handler that will be called during the execution of a PostUserRegistration flow.
 * https://auth0.com/docs/actions/triggers/pre-user-registration
 * https://auth0.com/docs/actions/limitations
 * https://auth0.com/docs/actions/write-your-first-action
 * @param {Event} event - Details about newly created user.
 */
exports.onExecutePostUserRegistration = async event => {
  // Collecting secrets
  const tenant = event.secrets.TENANT
  const audience = event.secrets.AUDIENCE
  const clientId = event.secrets.APP_CLIENT_ID
  const clientSecret = event.secrets.APP_CLIENT_SECRET
  // Creating management API
  // https://auth0.com/docs/api/management/v2
  // https://github.com/auth0/node-auth0#management-api-client
  const ManagementClient = require("auth0").ManagementClient
  const managementClient = new ManagementClient({
    domain: `${tenant}.us.auth0.com`,
    scope: "read:users update:users",
    clientId,
    clientSecret,
    audience,
  })
  // Finding other accounts with the same email
  // https://auth0.com/docs/api/management/v2#!/Users/post_identities
  const registeredUser = event.user
  const { email, user_id: userId } = registeredUser
  const bodyFromGetUsers = {
    search_engine: "v3",
    q: `email: "${email}" AND email_verified:true -user_id:"${userId}"`,
  }
  console.log(`Query to be executed: ${JSON.stringify(bodyFromGetUsers)}`)
  const usersFound = await managementClient.getUsers(bodyFromGetUsers)
  // Merge accounts only if needed
  // TODO Merge metadata
  // Now Linking account indeed
  if (usersFound) {
    for (const userFound of usersFound) {
      const primaryAccountId = userId
      const secondaryAccountId = userFound.user_id
      const identities = userFound.identities
      if (identities.length === 1) {
        const identityDetails = identities[0]
        const providerName = identityDetails.provider
        const bodyFromLinkUsers = {
          user_id: secondaryAccountId,
          provider: providerName,
        }
        const linkUsersResult = await managementClient.linkUsers(primaryAccountId, bodyFromLinkUsers)
        console.log(linkUsersResult)
      } else {
        console.error("There are more than 1 identity!")
      }
    }
  }
}

// exports.onExecutePostUserRegistration = async event => {
//   const headers = {
//     "Content-Type": "application/json",
//   }
//   const response = await axios.post("https://7fa0-2804-14d-1a86-c345-f432-53aa-394d-7b2e.ngrok.io/api/v1/link-account", event, {
//     headers,
//   })
// }
