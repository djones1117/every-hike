import { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import AddHikeForm from "../../components/AddHikeForm/AddHikeForm";
import HikeGallery from "../../components/HikeGallery/HikeGallery";

import { Grid } from "semantic-ui-react";
//this will imort all functions from postApi, and attach to an object call postapi
import * as postsApi from "../../utils/postApi";
import * as favoritesApi from "../../utils/favoritesApi";

export default function FeedPage({ user, handleLogout }) {
  // the reasons we are setting posts state, is because then we can pass that data to the HikeGallery
  //where it will be rendered
  const [posts, setPosts] = useState([]); //array of objects containing the favorites as well
  const [error, setError] = useState("");

  //3rd (C)RUD
// EVERY TIME WE UPDATE STATE HERE, we will first make http request to the server
//to try and persom some CRUD operation.
  async function addFavorite(postId) {
    try {
      const reponse = await favoritesApi.create(postId);
      // to update state we are just going to refetch the posts, because they will be updated
      // favorites
      getPosts();// this function update state

    } catch (err) {
      setError("error adding fav");
      console.log(err, "error");
    }
  }

  async function deleteFavorite(favoriteId) {
    try {
      const reponse = await favoritesApi.deleteFavorite(favoriteId);
      //to update state we are just going to refetch the posts, because they will update
      //favorites
      getPosts();//this function updates state

    } catch (err) {
      setError("error deleting fav");
      console.log(err, "error");
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
      setPosts([responseData.data, ...posts]); //empyting the previous posts in to the new
      // and then adding the new one we just created to the front (response.data)
    } catch (err) {
      console.log(err, "err in handleaddpost feedpage");
      setError("error creating a post please try again");
    }
  }
  // 2nd C(R)UD operation
  async function getPosts() {
    try {
      const responseFromTheServer = await postsApi.getAll(); //this is the fetch function from post utils
      console.log(responseFromTheServer);
      setPosts(responseFromTheServer.posts);
    } catch (err) {
      console.log(err, "err in getposts");
      setError("error fetching posts, check terminal");
    }
  }

  useEffect(() => {
    getPosts();
  }, []); // empty array says run the use effect once when the page loads up!

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddHikeForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 475}}>
          <HikeGallery
            posts={posts}
            itemsPerRow={3}
            isProfile={true}
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
            user={user}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
