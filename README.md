# CYF Forms

This project was born out of the need for a free alternative to Typeform. Google Forms is free but doesn't offer  the
branching logic required.

## How to Embed

You can embed one or several forms on a page using this syntax:

```html
<div class="cyf-form" data-form="ApplicationForm"></div>
```

### Available Forms

- ApplicationForm


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn e2e`

Runs the [Cypress] end-to-end tests, which means:

 - Starting a mock for the Google server on port 3100
 - Starting the forms app in TESTING mode on port 3000
 - Waiting for the app to start then running the tests

[Cypress]: https://www.cypress.io/
