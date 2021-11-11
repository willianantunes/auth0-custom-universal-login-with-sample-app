const express = require("express")
const { ManagementClient } = require("auth0")
const { onExecutePostUserRegistration } = require("../../../src/actions/action-post-user-registration-account-linking")

const app = express()
const port = 8888

managementClient = new ManagementClient({
  domain: `antunes.us.auth0.com`,
  scope: `read:users update:users`,
  clientId: `YOUR-CLIENT-ID`,
  clientSecret: `YOUR-CLIENT-SECRET`,
  audience: `https://antunes.us.auth0.com/api/v2/`,
})

app.use(express.json())
app.post("/api/v1/link-account", async (request, response) => {
  console.log("##### Collecting data")
  const headersAsString = JSON.stringify(request.headers)
  const bodyAsString = JSON.stringify(request.body)
  console.log(`##### Headers: ${headersAsString}`)
  console.log(`##### Body: ${bodyAsString}`)

  await onExecutePostUserRegistration(request.body)

  response.send({})
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
