/**
 * Handler that will be called during the execution of a PreUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that is attempting to register.
 * @param {PreUserRegistrationAPI} api - Interface whose methods can be used to change the behavior of the signup.
 */
exports.onExecutePreUserRegistration = async (event, api) => {
  const connectionDetails = event.connection
  const isItPasswordless = connectionDetails.name === "email" || connectionDetails.name === "sms"
  if (isItPasswordless) {
    const LOCALIZED_MESSAGES = {
      en: "You should create an account first.",
      "pt-br": "Você deve criar uma conta primeiro.",
    }

    const userMessage = LOCALIZED_MESSAGES[event.request.language] || LOCALIZED_MESSAGES["pt-br"]
    api.access.deny("no_signups_using_passwordless_upfront", userMessage)
  }
}
