import AboutMe from "../../components/AboutMe/AboutMe";
import HikeGallery from "../../components/HikeGallery/HikeGallery";
import { Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import userService from "../../utils/userService";

export default function ProfilePage() {
   
    const [posts, setPosts] = useState([]);
    const [userState, setUserState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    const { username } = useParams();
  console.log(username);

  useEffect(() => {
async function getProfile(){

try {
    setLoading(true)
    const response = await userService.getProfile(username)
    console.log(response)
    setPosts(response.posts)
    setUserState(response.user)
    setLoading(false)

} catch(err) {
    setError('Error loading profile page')
    console.log(err, " err in profile");
}


}
getProfile()
  }, [])

  if(loading){
    <>
    <PageHeader />
    <h1>Loading...</h1>
    </>
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <AboutMe user={userState}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <HikeGallery posts={posts} itemsPerRow={1} isProfile={true}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
