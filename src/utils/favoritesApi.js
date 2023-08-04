import tokenService from "./tokenService";

const BASE_URL = "/api/";

export function create(postId) {
  return fetch(`${BASE_URL}posts/${postId}/favorites`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
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
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((responseFromTheServer) => {
    if (responseFromTheServer.ok) return responseFromTheServer.json();
    throw new Error("Something went wrong in delete favorite");
  });
}
