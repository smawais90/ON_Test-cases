# ON_Test-cases

- Clone the project in local directory from github
- Open console with the path to your project folder
- Run command "npm install" in your console to install all dependencies
- After installing the depedencies run command "npx cypress open" Or "npm run test" to run the tests.
- If you will run "npm run test" command you will see the reports in the reports folder of cypress created through "Mochawesome Reports"

## Test Case Strategy:

I have put my all test cases in one file and tried to keep the code as simple as I can.

I have created commands for sign in. Because we can reuse them in different test cases with different fucntion parameters(credentials).

I have created only test case for single product, as we need some endpoints information to make our test cases more stable.

I have written the end to end scenerio here. The test case is flaky for now, like I have used static waits.
Instead I would have used cy.intercept to intercept the Api call and wait for it to load.

The Product summary part is not running here as cypress is returing an error of navigation, but we can intercept the api call, "right after place your button"
and the can get the order number either from response of that Api or request and then can directly call the url.

We are getting an error which is "cannot read properties of undefined (reading 'join')" at checkout button,
so I resolved it by following a solution from stackoverflow and installing cypress version 8.5.0.
The issue was resolved but have started coming again, the reason is cypress doing action quickly
before the promise is being resolved.

I have kept the test data in the data.js and elements selectors in selectors.js in the Fixture folder. The idea behind this is to keep the code clean and reusable.

We can do this testing by modularization as well, like by putting each test case in a separate "It clause" and every testcase is loosely coupled.
For that we can use the different test account to test each and every scenrio separately.
