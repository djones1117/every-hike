import { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import AddHikeForm from "../../components/AddHikeForm/AddHikeForm";
import HikeGallery from "../../components/HikeGallery/HikeGallery";

import { Grid } from "semantic-ui-react";

import * as postsApi from "../../utils/postApi";

import * as favoritesApi from "../../utils/favoritesApi"

export default function FeedPage({user, handleLogout}) {


const [posts, setPosts] = useState([]);
const [error, setError] = useState("");


//3rd (C)RUD

async function addFavorite(postId){
  try {
    const reponse = await favoritesApi.create(postId);

    getPosts();

  } catch(err){
    setError('error adding fav')
    console.log(err, 'error')
  }
}

async function deleteFavorite(favoriteId){
  try {
    const reponse = await favoritesApi.deleteFavorite(favoriteId);

    getPosts();

  } catch(err){
    setError('error deleting fav')
    console.log(err, 'error')
  }
}





    //(C)RUD
  // we will call this function in the handleSubmit of AddHikeForm 
  // and pass the formData we created
  // when we get a response from the server we can easily update the state, since its
  // in this component

async function handleAddPost(data) {
    try {
      const responseData = await postsApi.create(data);
      console.log(responseData, " <- response from server in handleAddPost");
      setPosts([responseData.data, ...posts])

    } catch (err) {
        console.log(err, "err in handleaddpost feedpage");
        setError("error creating a post please try again");
    }

    }
// 2nd C(R)UD operation 
async function getPosts(){
  try {
const responseFromTheServer = await postsApi.getAll();
console.log(responseFromTheServer)
setPosts(responseFromTheServer.posts)
  } catch(err) {
    console.log(err, 'err in getposts')
    setError('error fetching posts, check terminal')
  }
}



useEffect(() => {
getPosts()
}, []);

    return(
      <Grid centered>
        <Grid.Row>
            <Grid.Column>
                <PageHeader handleLogout={handleLogout} user={user}/>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <AddHikeForm handleAddPost={handleAddPost}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
            <HikeGallery posts={posts} itemsPerRow={1} isProfile={true} addFavorite={addFavorite} deleteFavorite={deleteFavorite} user={user}/>
            </Grid.Column>
        </Grid.Row>
      </Grid>
    );
}