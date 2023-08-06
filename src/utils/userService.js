import tokenService from "./tokenService";

const BASE_URL = "/api/users/";

function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      // when you're sending a file there should no headers, the browser will detect request,
      // and apply the proper headers `multipart/formdata` request enctype
      //headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
      // what do datatype do you need to change this too?
      //contents of form you need to send to server
      //user must be an object in order to jsonify
      body: user,
    }) // the .thens occur when we get a response from the server
      .then((res) => {
        if (res.ok) return res.json();
        // Probably a duplicate email
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  );
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

function getProfile(username) {
  return fetch(BASE_URL + username, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), // < this is how we get the token from localstorage and send it to our api request
      // so the server knows who the request is coming from when the client is trying to make a POST
    },
  }).then((responseFromTheServer) => {
    if (responseFromTheServer.ok) return responseFromTheServer.json();

    throw new Error("Something wrong in create getAll posts, check terminal");
  });
}

export default {
  signup,
  getUser,
  logout,
  login,
  getProfile,
};
