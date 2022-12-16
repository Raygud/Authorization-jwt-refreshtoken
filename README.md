# JWTAuthenticationReact

The goal of this project is to create a reusable login system using JWT (JSON web tokens) that maintains the user's login state even when the browser is refreshed or closed. This allows users to easily log in and access their account without having to constantly re-enter their credentials. Additionally, using React allows for the creation of a user-friendly and intuitive interface, making the login process smooth and easy for users. Overall, this project aims to provide a reliable and efficient way to authenticate and authorize users in a React application.

## Authentication vs authorization

 Authentication is the process of verifying the identity of a user, while authorization is the process of granting or denying access to a specific resource based on the user's verified identity. These two processes work together to ensure that only authorized users are able to access and modify resources within a system. By authenticating users and carefully controlling their access to resources, we can maintain the security and integrity of the system.
  
  #### how do we achieve these steps?
  
  On a user's initial entry to the site, they will be prompted to either sign up or log in. When they log in, the system will send a request to the database to verify the user's credentials. First, the system will search for a matching username or email address in the database. If no matching user is found, the server will respond with an error message stating that the provided credentials do not match. If the user is found in the database, the system will then compare the provided login information with the information stored in the database. If the two sets of information match, the server will send an access token to the client, which will be stored in the user's web browser as a cookie. This access token allows the user to access the system and its resources.

## How do we retain a users Authentication in react front end.

Once the user is logged in, their JSON web token (JWT) is stored in a cookie in their web browser. On subsequent requests, the system accesses this cookie to verify the user's identity. This allows the user to remain logged in even if they close the browser or refresh the page. When the user makes a new request, the system uses the JWT stored in the cookie to authenticate the user and grant them access to the requested resource. By storing the JWT in a cookie and accessing it on subsequent requests, the system can maintain the user's login state and provide a seamless experience for the user.

## Protected pages in react



## Backend

A simple backend with user creation and authentication allows users to create accounts and securely log in to the system. This backend provides the necessary functionality to verify the identity of users and grant them access to the system and its resources. By implementing user creation and authentication, the backend can ensure the security and integrity of the system and provide a secure and reliable way for users to access and interact with the system. Overall, a simple backend with user creation and authentication is an essential component of many applications and systems.

## Authentication 

```

```

The code first calls the bcrypt.compare() method, passing in the provided password and the encrypted password from the database. If the two passwords match, the code uses the UserModel.findOne() method to search for the user in the database. If the search is successful, the code checks if the user already has a refresh token. If they don't, the code generates a new refresh token using the jwt library and updates the user's record in the database with the new refresh token.


