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

  const { username } = useParams();
  console.log(username);

  async function addFavorite(postId) {
    try {
      const reponse = await favoritesApi.create(postId);

      getProfile();
    } catch (err) {
      setError("error adding fav");
      console.log(err, "error");
    }
  }

  async function deleteFavorite(favoriteId) {
    try {
      const reponse = await favoritesApi.deleteFavorite(favoriteId);

      getProfile();
    } catch (err) {
      setError("error deleting fav");
      console.log(err, "error");
    }
  }

  async function getProfile() {
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
