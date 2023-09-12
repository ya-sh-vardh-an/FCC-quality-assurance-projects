'use strict';
const Realm = require('realm');
const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();
const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 3500);
  }
});

module.exports = app; //for testing

// import * as Realm from "realm-web";

// const app = new Realm.App({ id: 'data-rgsua' });
  
// async function loginEmailPassword(email, password) {
//   // Create an email/password credential
//   const credentials = Realm.Credentials.emailPassword(email, password);
//   // Authenticate the user
//   const user = await app.logIn(credentials);
//   // 'App.currentUser' updates to match the logged in user
//   console.assert(user.id === app.currentUser.id);
//   return user;
// }
  
// const user = await loginEmailPassword('yashvss5675@gmail.com', 'Ts0LkzmWnFnC9GNr');
// return user.accessToken;

// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "users",
//     "database": "database",
//     "dataSource": "Clusterml",
//     "projection": {
//         "_id": 1
//     }
// });
            
// var config = {
//     method: 'post',
//     url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-rgsua/endpoint/data/v1/action/findOne',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'Authorization': 'Bearer <ACCESS_TOKEN>',
//     },
//     data: data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
