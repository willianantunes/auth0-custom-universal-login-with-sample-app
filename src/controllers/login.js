import { $ } from "../utils/dom"
import { Auth0Lock } from "auth0-lock"
import { Auth0LockPasswordless } from "auth0-lock"
import { buildConfigurationFromEnvironment } from "../auth0/configuration-builder"

export class LoginController {
  constructor() {
    // TODO Refactor it
    this._config = buildConfigurationFromEnvironment()
    this._language = "pt-br"
    // Buttons
    this._btnLoginEmailPasswordless = $("button.btn-login-email-passwordless")
    this._btnLoginUsernameOrEmail = $("button.btn-login-username-or-email")
    // Events
    this._initAllEvents()
  }

  _initAllEvents() {
    this._btnLoginEmailPasswordless.addEventListener("click", e => this.initializePasswordless(e))
    this._btnLoginUsernameOrEmail.addEventListener("click", e => this.initializeLegacyFlow(e))
  }

  initializePasswordless(event) {
    event.preventDefault()
    console.log("Initializing passwordless flow...")
    // TODO Make it better, as I'm just copied the sample from Auth0 console...
    var lock = new Auth0LockPasswordless(this._config.clientID, this._config.auth0Domain, {
      auth: {
        redirectUrl: this._config.callbackURL,
        responseType:
          (this._config.internalOptions || {}).response_type || (this._config.callbackOnLocationHash ? "token" : "code"),
        params: this._config.internalOptions,
      },
      configurationBaseUrl: this._config.clientConfigurationBaseUrl,
      overrides: {
        __tenant: this._config.auth0Tenant,
        __token_issuer: this._config.authorizationServer.issuer,
      },
      assetsUrl: this._config.assetsUrl,
      allowedConnections: this._config.connection ? [this._config.connection] : null,
      rememberLastLogin: !this._config.prompt,
      language: this._language,
      languageBaseUrl: this._config.languageBaseUrl,
      languageDictionary: { title: this._config.dict.signin.title },
      theme: {
        logo: "https://assets-img.juntossomosmais.com.br/images/logo.svg",
        primaryColor: "#ffa35c",
        secondaryColor: "#ff0000",
      },
      closable: true,
    })

    lock.show()
  }

  initializeLegacyFlow(event) {
    event.preventDefault()
    console.log("Initializing legacy flow...")
    // TODO Make it better, as I'm just copied the sample from Auth0 console...
    var lock = new Auth0Lock(this._config.clientID, this._config.auth0Domain, {
      auth: {
        redirectUrl: this._config.callbackURL,
        responseType:
          (this._config.internalOptions || {}).response_type || (this._config.callbackOnLocationHash ? "token" : "code"),
        params: this._config.internalOptions,
      },
      configurationBaseUrl: this._config.clientConfigurationBaseUrl,
      overrides: {
        __tenant: this._config.auth0Tenant,
        __token_issuer: this._config.authorizationServer.issuer,
      },
      assetsUrl: this._config.assetsUrl,
      allowedConnections: this._config.connection ? [this._config.connection] : null,
      rememberLastLogin: !this._config.prompt,
      language: this._language,
      languageBaseUrl: this._config.languageBaseUrl,
      languageDictionary: { title: this._config.dict.signin.title },
      theme: {
        //logo: 'YOUR LOGO HERE',
        primaryColor: this._config.colors.primary ? this._config.colors.primary : "green",
      },
      prefill: this._config.extraParams.login_hint
        ? { email: this._config.extraParams.login_hint, username: this._config.extraParams.login_hint }
        : null,
      closable: true,
      defaultADUsernameFromEmailPrefix: false,
    })

    if (this._config.colors.page_background) {
      var css = ".auth0-lock.auth0-lock .auth0-lock-overlay { background: " + this._config.colors.page_background + " }"
      var style = document.createElement("style")
      style.appendChild(document.createTextNode(css))
      document.body.appendChild(style)
    }

    lock.show()
  }
}
