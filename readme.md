# Static-email..

Small app to make contact forms on static websites (no backend) functional.

## Functionality

This application received the post request from different websites (predefined), then it process the incoming data, lastly it will send an email to the aproppriate email according to the parameters of the post request. 

### Prerequisites

What things you need to install the software.

1. A domain to send the emails from.
2. Mailgun account (or any other similar service).
3. Recaptcha account (if you are using recaptcha on the client side).

### Installing

- clone repo
- run `npm install`
- duplicate `.env` file and rename it to `.env.local`
- fill in `.env.local` file with your information as required
- create or modify the templates on the `templates` folder
- locate `setup.js` file inside `core` folder, and change the object according to your `.env.local` file and `templates`
- run `npm run start-nodemon` or `npm run start`
- send post request with your favorite client (postman or whichever)

## Deployment

- send the code to your prefered platform.
- define all the variables in your `.env.local` file on your platform
- DONE...

## Built With

* [node.js](https://nodejs.org/) - JS on the server
* [express](https://expressjs.com/) - Web framework for Nodejs
* [mailgun-js](https://github.com/highlycaffeinated/mailgun-js) - Node.js module for Mailgun
* [pug](https://github.com/pugjs/pug) - Template engine
* [multer](https://github.com/expressjs/multer) - Middleware for handling multipart/form-data
* [localenv](https://github.com/defunctzombie/localenv) - Load environment variables for local development
* [recaptcha2](https://github.com/fereidani/recaptcha2) - Implementing recaptcha2 easier

## Authors

* **Pedro Guerrero** - *Initial work* - [pguerrerox](https://github.com/pguerrerox)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
