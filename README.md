# Auth0 Custom Universal Login with Sample Application

This was created only for testing purposes. Please do not consider using it in a production environment. I just did it to quickly test what is available on Auth0.

## Understanding the structure

This repository is separated into two projects:

- [custom-universal-login](./custom-universal-login): An front-end application built with the help of Parcel. It represents the custom Universal Login experience using the [auth0.js](https://github.com/auth0/auth0.js).
- [sample-application-client](./sample-application-client): A Next.js project with MUI and styled-components. It represents the product where a costumer can check his account after he's logged in.

### Deploying the custom universal login

When you think it's done the way you developed your custom page with either [Auth0.js](https://github.com/auth0/auth0.js) or [Lock.js](https://github.com/auth0/lock), now you can deploy it on your tenant. To do that, change `custom-universal-login/.env.development` according to your scenario, and then you can issue the command:

    docker-compose up apply-classic-page

You'll see something like this:

```shell
Starting auth0-custom-universal-login-with-sample-app_apply-classic-page_1 ... done
Attaching to auth0-custom-universal-login-with-sample-app_apply-classic-page_1
apply-page-classic_1  | ✨ Built in 385ms
apply-page-classic_1  | 
apply-page-classic_1  | out/login.html              4.18 KB    736ms
apply-page-classic_1  | out/login.65ee0072.js     153.66 KB    1.39s
apply-page-classic_1  | out/login.c20437d2.css        345 B    682ms
apply-page-classic_1  | Configured static files: StaticFiles(html_file=PosixPath('/app/out/login.html'), css_file=PosixPath('/app/out/login.c20437d2.css'), js_file=PosixPath('/app/out/login.65ee0072.js'))
apply-page-classic_1  | CSS and JS files have been uploaded
apply-page-classic_1  | Login page has been updated successfully
apply-page-classic_1  | HTML file has been updated on Auth0
auth0-custom-universal-login-with-sample-app_apply-classic-page_1 exited with code 0
```

It's worth mentioning that both JS and CSS files will be uploaded to an S3 bucket (AWS). If you'd like another blob storage, just change the script to match your needs.
