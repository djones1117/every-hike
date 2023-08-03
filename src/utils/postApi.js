import tokenService from "./tokenService";

const BASE_URL = '/api/posts/';


export function create(data){
	return fetch(BASE_URL, {
		method: 'POST',
		body: data, 
		headers: {
			
			
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and send it to our api request
			// so the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(responseFromTheServer => {
		if(responseFromTheServer.ok) return responseFromTheServer.json() 


		throw new Error('Something wrong in create Post'); 
		
	})
}

export function getAll(){
	return fetch(BASE_URL, {
		method: 'GET',
		headers: {
			
			
			Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage and send it to our api request
			// so the server knows who the request is coming from when the client is trying to make a POST
		}
	}).then(responseFromTheServer => {
		if(responseFromTheServer.ok) return responseFromTheServer.json() 


		throw new Error('Something wrong in create getAll posts, check terminal'); 
		
	})
}
