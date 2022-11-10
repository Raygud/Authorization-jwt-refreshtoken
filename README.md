# JWTAuthenticationReact

The goal of this project is the create a reusable react login system, where we authenticate via JWT(json web tokens), we must percist the loggin in even on browser refresh and opening and closing the browser.

## Authentication vs authorization

  When we are authenticating we are determining whether the user is, in fact, who he claims to be.
  
  and when giving authorization we are giving or denying said user the ability to access/modify/delete a resource.
  
  #### how do we achieve these steps?
  
  on a users initial entry to the site the user will be prompted to either sign up or loginn, on login we will send a request to our data base asking 
  1. Does this user exist?
      we do this by combing through our database looking for either A: username or B: E-mail,
      if said user is not found in our database we will send back a respons saying that the credentials do not match
      
  3. Do the credentials provided match the credentials in the database?
      if the user does indeed exist within our database we will now compair the provided information with the information logged on the database
  
  after both of the critera are reached, the server will send an access token back to the client(stored in cookies on the clients computer by the web browser.)

## How do we retain a users Authentication in react front end.

once the user is logged in his JTW(JSON Web Token) is stored in the cookies, we access these cookies on our requests. we are now retaining our user, if we close the brower or refresh the page we will make a new request authenticating with the stored cookie.

## Protected pages in react

## Backend

A simple backend with user creation and authentification 
