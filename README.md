# Auth0 Custom Universal Login

This was created only for testing purposes. Please do not consider using it in a production environment. I just did it to quickly test what is available on Auth0.

## Deploying the project

When you think it's done the way you developed your custom page with either with [Auth0.js](https://github.com/auth0/auth0.js) or [Lock.js](https://github.com/auth0/lock), now you can deploy it on your tenant. To do that, change `.env.development` according to your scenario, and then you can issue the command:

    docker-compose up

You'll see something like this:

```shell
Starting auth0-custom-universal-login_apply-page-classic_1 ... done
Attaching to auth0-custom-universal-login_apply-page-classic_1
apply-page-classic_1  | ✨ Built in 385ms
apply-page-classic_1  | 
apply-page-classic_1  | out/login.html              4.18 KB    736ms
apply-page-classic_1  | out/login.65ee0072.js     153.66 KB    1.39s
apply-page-classic_1  | out/login.c20437d2.css        345 B    682ms
apply-page-classic_1  | Configured static files: StaticFiles(html_file=PosixPath('/app/out/login.html'), css_file=PosixPath('/app/out/login.c20437d2.css'), js_file=PosixPath('/app/out/login.65ee0072.js'))
apply-page-classic_1  | CSS and JS files have been uploaded
apply-page-classic_1  | Login page has been updated successfully
apply-page-classic_1  | HTML file has been updated on Auth0
auth0-custom-universal-login_apply-page-classic_1 exited with code 0
```

It's worth mentioning that both JS and CSS files will be uploaded to an S3 bucket from AWS. If you'd like another blob storage, just change the script to match your needs.

## Important links

Questions I made:

- [Account linking using Action during Post User Registration](https://community.auth0.com/t/account-linking-using-action-during-post-user-registration/73019)

About [Lock](https://github.com/auth0/lock):

- https://auth0.com/docs/libraries/lock/customize-lock-error-messages
- https://auth0.com/docs/libraries/lock/lock-authentication-modes
- https://auth0.com/docs/libraries/lock/lock-internationalization
- https://auth0.com/docs/libraries/lock/lock-ui-customization
- https://auth0.com/docs/libraries/lock/lock-api-reference
- https://auth0.com/docs/libraries/lock/lock-configuration

Projects:

- [auth0-samples/auth0-link-accounts-sample](https://github.com/auth0-samples/auth0-link-accounts-sample)

Articles:

- [Link User Accounts](https://auth0.com/docs/users/user-account-linking/link-user-accounts)

Community questions:

- [Account linking with Auth0 actions](https://community.auth0.com/t/account-linking-with-auth0-actions/60676)
- [How to do Account Linking from a PostLogin Action?](https://community.auth0.com/t/actions-accountlinking-how-to-do-account-linking-from-a-postlogin-action/63840)
- [What are the Account Linking Extension caveats?](https://community.auth0.com/t/what-are-the-account-linking-extension-caveats/59329)
- [How do you update details of secondary linked accounts?](https://community.auth0.com/t/how-do-you-update-details-of-secondary-linked-accounts/41682)
- [Sharing session between 2 web apps on different subdomains](https://community.auth0.com/t/sharing-session-between-2-web-apps-on-different-subdomains/39624)
- [PreRegistration Action is not triggered after a social login](https://community.auth0.com/t/preregistration-action-is-not-triggered-after-a-social-login/72720)

Boostrap:

- https://mdbootstrap.com/docs/standard/extended/login/
