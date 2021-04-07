# Node/React, JSON Web Token (JWT) Authentication with reflected XSS
 
This is a small web app designed to show my understanding of Node.js and React.

## Basic API:
The web app has a simple api for signing up (creating) a user, and logging them in whilst
giving logged-in users a JWT token set to expire in 90 seconds after login.

The DBMS used for this example is MySQL

## Setup:  
 - log into your: 'mysql' `mysql -u [username] -p` or `mysql -u [username]`
 - create the database `testdb` needed: `create database testdb;`
 - in `./node-js-jwt-auth/app/config/db.config.js` enter your `mysql` root password
 - run the server with:
```
cd ./node-js-jwt-auth
node server.js
```
 - run the react appliaction:
```
cd ./react-jwt-auth
npm start
```
> the react application is configured to run on port 8081


## Reflecting XSS:
On the user profile board there are two input fields. 
The first one labeled 'no xss' will just reflect the input value onto the html of the site.
The second one labeled 'reflecting xss' will pass the input value through the infamous javaScript eval() function,
and thus run 'alert(1)' for example

## Postman:
#### SignUp
![image](https://user-images.githubusercontent.com/45371385/113756920-48b59f80-9712-11eb-8e5d-5d02cdc51414.png)

#### SignIn
![image](https://user-images.githubusercontent.com/45371385/113756950-5408cb00-9712-11eb-92e2-8ef71b021efd.png)

#### Access Authorized Content
![image](https://user-images.githubusercontent.com/45371385/113757064-7864a780-9712-11eb-969f-64f33e57342b.png)

