import AboutMe from "../../components/AboutMe/AboutMe";
import HikeGallery from "../../components/HikeGallery/HikeGallery";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
   
    const [posts, setPosts] = useState([]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <AboutMe />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <HikeGallery posts={posts}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
