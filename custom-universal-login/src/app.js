// Use the import below if you'd like to sue the 'auth0-lock' version
// import "./styles/app.scss"

// https://getbootstrap.com/docs/5.1/getting-started/parcel/
import { Modal } from "bootstrap"
import "./styles/app-with-boostrap.scss"
import { LoginController } from "./controllers/login-auth0-sdk"

new LoginController()
