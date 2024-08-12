- This is a full-stack movie_hub web app

- to run this app at local machine, open you CLI and CD to backend dir, type `node app.js`, and then open another CLI and CD to frontend dir, type `npm run dev`.

- technical stack: 
    - front-end: react, react-router, redux, react-query, tailwindcss, MUI
    - back-end: Node.js, express, MongoDB, mongoose

- backend function: 
 - 1. using the third-party API to fetch the data from TMDB, and forward JSON to front_end;
 - 2. user registration, login-in, logout, authentication cookie jwt, reset password, user info update, and even deleting user account
 - 3. authentication middleware protects some route

- frontend function: 
  - 1. connect with backend API to fetch TMDB data;
  - 2. provide user login/registration, user info update interface, user input validation, and error message handling

- demo app is deployed at the link: https://movie-hub-v1.onrender.com/  (it might take a while for the first time to load since the Render Server need to turn on the VM)
