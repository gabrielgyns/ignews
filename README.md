<p align="center">
  <img src="/public/images/logo.svg"/>
  <br /><br /> 
  Ignews is a blog with paid content via subscription. This is a project to <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>'s bootcamp. <br />
  This project uses <b>NextJS</b>, Next-auth (Github), <b>React</b>, <b>Typescript</b>, <b>SASS</b>, <b>FaunaDB</b>, <b>Prismic CMS</b> and more.
</p>

## About the project

This project is a blog made in NextJS and React, where we can post paid content. For login is used Next-Auth with Github, we can manage the subscriptions on Stripe, the content is created on Prismic CMS the data is storage on FaunaDB and for styling, we're using Sass.

On source code, you can find the <b>services</b> folder, there we manage all apis (stripe, fauna and prismic) to connect all the services we use.

### Environment Variables

To correctly run this project, you will need to set the Environment Variables on a file on the project's root named <b>.env.local</b> with the following:
```
# Stripe
STRIPE_API_KEY=<your-information>
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your-information>
STRIPE_WEBHOOK_SECRET=<your-information>
STRIPE_SUCCESS_URL=http://localhost:3000/posts
STRIPE_CANCEL_URL=http://localhost:3000/

# Github
GITHUB_ID=<your-information>
GITHUB_SECRET=<your-information>

# FaunaDB
FAUNA_KEY=<your-information>

# Prismic CMS
PRISMIC_ENDPOINT=<your-information>
PRISMIC_ACCESS_TOKEN=<your-information>
```
