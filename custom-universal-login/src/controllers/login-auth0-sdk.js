import { $ } from "../utils/dom"
import { buildConfigurationFromEnvironmentToAuth0js } from "../auth0/configuration-builder"
// https://auth0.com/docs/libraries/auth0js
import { WebAuth } from "auth0-js"

export class LoginController {
  constructor() {
    // If you're developing locally, don't forget to allow cross origin requests!
    this._config = buildConfigurationFromEnvironmentToAuth0js()
    console.log(`Configuration received: ${JSON.stringify(this._config)}`)
    this._webAuth = new WebAuth(this._config)
    this._databaseConnectionName = "Username-Password-Authentication"
    // Panels
    this._panelMessage = $(".custom-error-message")
    this._panelMessageModal = $(".custom-error-message-modal")
    // Buttons
    this._btnLoginUsernameOrEmail = $("button.btn-login-username-or-email")
    this._btnLoginWithGoogle = $("button.btn-login-with-google")
    this._btnLoginWithFacebook = $("button.btn-login-with-facebook")
    this._btnSendCodeEmail = $(".btn-send-code-email")
    // Labels
    this._labelPasswordless = $("#passwordlessEmail .mb-4 label")
    // Inputs
    this._inputUsernameOrEmail = $("input[name=username]")
    this._inputPassword = $("input[name=password]")
    this._inputPasswordlessEmail = $("input[name=passwordlessEmail]")
    // Events
    this._initAllEvents()
  }

  _initAllEvents() {
    this._btnLoginUsernameOrEmail.addEventListener("click", e => this.initializeLoginDatabase(e))
    this._btnLoginWithGoogle.addEventListener("click", e => this.initializeLoginWithGoogle(e))
    this._btnLoginWithFacebook.addEventListener("click", e => this.initializeLoginWithFacebook(e))
    this._btnSendCodeEmail.addEventListener("click", e => this.initializePasswordlessEmail(e))
  }

  initializeLoginDatabase(event) {
    event.preventDefault()
    console.log("Initializing legacy flow...")
    this._btnLoginUsernameOrEmail.disabled = true
    this._btnLoginUsernameOrEmail.innerText = "Verificando"
    const options = {
      realm: this._databaseConnectionName,
      username: this._inputUsernameOrEmail.value,
      password: this._inputPassword.value,
    }
    const callback = error => {
      if (error) {
        console.log(`Received error: ${JSON.stringify(error)}`)
        this._displayMessage(error.policy, error.description)
      }
      this._btnLoginUsernameOrEmail.disabled = false
      this._btnLoginUsernameOrEmail.innerText = "Entrar"
    }
    // https://auth0.com/docs/libraries/auth0js#webauth-login-
    this._webAuth.login(options, callback)
  }

  initializeLoginWithGoogle(event) {
    console.log("Log in with Google...")
    const options = {
      connection: "google-oauth2",
    }
    const callback = error => {
      if (error) {
        console.log(`Received error: ${JSON.stringify(error)}`)
        this._displayMessage(error.policy, error.description)
      }
    }
    this._webAuth.authorize(options, callback)
  }

  initializeLoginWithFacebook(event) {
    console.log("Log in with Facebook...")
    const options = {
      connection: "facebook",
    }
    const callback = error => {
      if (error) {
        console.log(`Received error: ${JSON.stringify(error)}`)
        this._displayMessage(error.policy, error.description)
      }
    }
    this._webAuth.authorize(options, callback)
  }

  initializePasswordlessEmail(event) {
    console.log(`Passwordless with email...`)
    this._btnSendCodeEmail.disabled = true
    this._btnSendCodeEmail.innerText = "Enviando código ⏳"
    // https://auth0.com/docs/libraries/auth0js#start-passwordless-authentication
    const options = {
      connection: "email",
      send: "code",
      email: this._inputPasswordlessEmail.value,
    }
    const callback = (error, response) => {
      if (error) {
        console.log(`Received error: ${JSON.stringify(error)}`)
        // `no_signups_using_passwordless_upfront` was created by me using Actions
        if (error.description === "no_signups_using_passwordless_upfront") {
          this._displayMessageModal(error.policy, "Você deve criar uma conta primeiro")
        } else {
          this._displayMessageModal(error.policy, error.description)
        }
        this._btnSendCodeEmail.innerText = "Enviar código 📩"
      } else if (response) {
        console.log(`Received response: ${JSON.stringify(response)}`)
        this._labelPasswordless.innerText = "Código recebido 🔑"
        this._btnSendCodeEmail.innerText = "Verificar 🕵"
      }
      this._btnSendCodeEmail.disabled = false
    }
    console.log(`Options configured: ${JSON.stringify(options)}`)
    this._webAuth.passwordlessStart(options, callback)
  }

  completePasswordlessEmail(event) {
    // https://auth0.com/docs/libraries/auth0js#complete-passwordless-authentication
    console.log("Completing passwordless through email...")
    // https://auth0.com/docs/extensions/account-link-extension
  }

  _displayMessage(policy, description) {
    this._panelMessage.innerHTML = policy || description
    this._panelMessage.style.display = "block"
  }

  _displayMessageModal(policy, description) {
    this._panelMessageModal.innerHTML = policy || description
    this._panelMessageModal.style.display = "block"
  }
}
