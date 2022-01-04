import React, { useState } from "react"
import * as S from "./styled"
import { Button, Card, Container, Form } from "react-bootstrap"
import DatabaseLogin from "../DatabaseLogin"
import OneTimePasswordLogin from "../OneTimePasswordLogin"
// https://auth0.com/docs/libraries/auth0js
import { WebAuth } from "auth0-js"
import { buildConfigurationFromEnvironmentToAuth0js } from "../../auth0/configuration-builder"
import SocialLogins from "../SocialLogins"

const UniversalLogin = () => {
  // Auth0
  const config = buildConfigurationFromEnvironmentToAuth0js()
  const webAuth = new WebAuth(config)
  // States
  const initialClassicUniversalLoginState = {
    oneTimePasswordEnabled: false,
    buttonLoginStrategyFieldValue: "Receber chave de acesso rápido por email",
  }
  const [classicUniversalLoginState, setClassicUniversalLoginState] = useState(initialClassicUniversalLoginState)
  // Events
  const authenticationMethodToggle = event => {
    if (classicUniversalLoginState.oneTimePasswordEnabled) {
      setClassicUniversalLoginState(initialClassicUniversalLoginState)
    } else {
      setClassicUniversalLoginState({
        oneTimePasswordEnabled: !classicUniversalLoginState.oneTimePasswordEnabled,
        buttonLoginStrategyFieldValue: "Logar com senha",
      })
    }
  }

  return (
    <S.CustomCard>
      <Card.Img variant="top" src="holder.js/100px180?text=Your company" />
      <Card.Body>
        <Card.Title>Bem-vindo</Card.Title>
        <Card.Text>Faça login na Juntos Somos Mais e continue na Loja Virtual</Card.Text>
        <hr />
        {classicUniversalLoginState.oneTimePasswordEnabled ? (
          <OneTimePasswordLogin auth0={webAuth} />
        ) : (
          <DatabaseLogin auth0={webAuth} />
        )}
        <hr />
        <Button variant="outline-primary" onClick={authenticationMethodToggle}>
          {classicUniversalLoginState.buttonLoginStrategyFieldValue}
        </Button>
        <hr />
        <SocialLogins auth0={webAuth} />
      </Card.Body>
      <Card.Footer className="text-center">
        Ao fazer login, você concorda com nossa{" "}
        <a href="https://www.juntossomosmais.com.br/central-de-privacidade">política de privacidade</a>
      </Card.Footer>
    </S.CustomCard>
  )
}

export default UniversalLogin
