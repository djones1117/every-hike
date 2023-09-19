import tokenService from "./tokenService";

const BASE_URL = "/api/";
// the user is logged in so what do you have to include

export function create(postId) {
  return fetch(`${BASE_URL}posts/${postId}/favorites`, {
    method: "POST",
    headers: {
      //convention for sending jwts

      Authorization: "Bearer " + tokenService.getToken(), // < this is how we get the token from localstorage and  send it to our api request
      //so the server knows who the request is coming from when the client is trying to make a POST
    },
  }).then((responseFromTheServer) => {
    if (responseFromTheServer.ok) return responseFromTheServer.json();
    throw new Error("Something went wrong in create favorite");
  });
}

export function deleteFavorite(favoriteId) {
  return fetch(`${BASE_URL}favorites/${favoriteId}`, {
    method: "DELETE",
    headers: {
      //convention for sending jwts
      Authorization: "Bearer " + tokenService.getToken(), // < this is how we get the token from localstorage and  send it to our api request
      //so the server knows who the request is coming from when the client is trying to make a POST
    },
  }).then((responseFromTheServer) => {
    if (responseFromTheServer.ok) return responseFromTheServer.json();
    throw new Error("Something went wrong in delete favorite");
  });
}
