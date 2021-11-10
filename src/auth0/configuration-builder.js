export function buildConfigurationFromEnvironment() {
  if (window.configurationFromProvider) return window.configurationFromProvider

  return {
    icon: "https://assets-img.juntossomosmais.com.br/images/logo.svg",
    assetsUrl: "",
    auth0Domain: "antunes.us.auth0.com",
    auth0Tenant: "antunes",
    clientConfigurationBaseUrl: "https://antunes.us.auth0.com/",
    callbackOnLocationHash: false,
    callbackURL: "http://localhost:8000/api/v1/response-oidc",
    cdn: "https://cdn.auth0.com/",
    clientID: "LnqZXPprrsDaxEYbWfXpPJEmbtuc1F4E",
    dict: { signin: { title: "Auth0 Auth Playground" } },
    extraParams: {
      protocol: "oauth2",
      response_type: "code",
      scope: "openid profile email",
      _csrf: "PiM0fbIV-2UwxF8uxh4RsDnB7XpIVEYm_dr4",
      _intstate: "deprecated",
      state:
        "hKFo2SAzdjFvZ3ZOYU50bV8yYnNWX003WDBxY1d2b3NvWEdwQqFupWxvZ2luo3RpZNkgMGwyUHB3MUZwU01EbGZBaFNqZTJCYU5vZ21XMjVIUWejY2lk2SBMbnFaWFBwcnJzRGF4RVliV2ZYcFBKRW1idHVjMUY0RQ",
    },
    internalOptions: {
      protocol: "oauth2",
      response_type: "code",
      scope: "openid profile email",
      _csrf: "PiM0fbIV-2UwxF8uxh4RsDnB7XpIVEYm_dr4",
      _intstate: "deprecated",
      state:
        "hKFo2SAzdjFvZ3ZOYU50bV8yYnNWX003WDBxY1d2b3NvWEdwQqFupWxvZ2luo3RpZNkgMGwyUHB3MUZwU01EbGZBaFNqZTJCYU5vZ21XMjVIUWejY2lk2SBMbnFaWFBwcnJzRGF4RVliV2ZYcFBKRW1idHVjMUY0RQ",
    },
    widgetUrl: "https://cdn.auth0.com/w2/auth0-widget-5.1.min.js",
    isThirdPartyClient: false,
    authorizationServer: {
      url: "https://antunes.us.auth0.com",
      issuer: "https://antunes.us.auth0.com/",
    },
    colors: { page_background: "#ff0000", primary: "#ffa35c" },
  }
}
