import AboutMe from "../../components/AboutMe/AboutMe";
import HikeGallery from "../../components/HikeGallery/HikeGallery";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import userService from "../../utils/userService";
import * as favoritesApi from "../../utils/favoritesApi";

export default function ProfilePage({ user, handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [userState, setUserState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // grabbing the param from this route
// <route path="/:username" element={<ProfilePage />} />
  const { username } = useParams();
  console.log(username);
//  EVERY TIME WE UPDTATE STATE here, we will first make http request to the server
//to try and perform some crud operation.
  async function addFavorite(postId) {
    try {
      const reponse = await favoritesApi.create(postId);
      //to update state we are just going to refetch the posts, because they will update the 
      //favorites

      getProfile();// this function updates state

    } catch (err) {
      setError("error adding fav");
      console.log(err, "error");
    }
  }

  async function deleteFavorite(favoriteId) {
    try {
      const reponse = await favoritesApi.deleteFavorite(favoriteId);
      //to update state we are just going to refetch the posts, because they will be updated
      //favorites 
      getProfile();// this function updates state

    } catch (err) {
      setError("error deleting fav");
      console.log(err, "error");
    }
  }

  async function getProfile() {
    //make the api call,
    //then log the response,
    //then update the state
    try {
      setLoading(true);
      const response = await userService.getProfile(username);
      console.log(response);
      setPosts(response.posts);
      setUserState(response.user);
      setLoading(false);
    } catch (err) {
      setError("Error loading profile page");
      console.log(err, " err in profile");
    }
  }

  useEffect(() => {
    getProfile();
  }, [username]);

  if (loading) {
    <>
      <PageHeader handleLogout={handleLogout} user={user} />
      <h1>Loading...Please wait</h1>
    </>;
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <AboutMe user={userState} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <HikeGallery
            posts={posts}
            itemsPerRow={4}
            isProfile={true}
            user={user}
            addFavorite={addFavorite}
            deleteFavorite={deleteFavorite}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
