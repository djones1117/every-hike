import { useState } from "react";

import PageHeader from "../../components/Header/Header";
import AddHikeForm from "../../components/AddHikeForm/AddHikeForm";
import HikeGallery from "../../components/HikeGallery/HikeGallery";

import { Grid } from "semantic-ui-react";

import * as postsApi from "../../utils/postApi";


export default function FeedPage() {


const [posts, setPosts] = useState([]);
const [error, setError] = useState("");


    //(C)RUD
  // we will call this function in the handleSubmit of AddHikeForm 
  // and pass the formData we created
  // when we get a response from the server we can easily update the state, since its
  // in this component

async function handleAddPost(data) {
    try {
      const responseData = await postsApi.create(data);
      console.log(responseData, " <- response from server in handleAddPost");


    } catch (err) {
        console.log(err, "err in handleaddpost feedpage");
        setError("error creating a post please try again");
    }

    }

    return(
      <Grid centered>
        <Grid.Row>
            <Grid.Column>
                <PageHeader />
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <AddHikeForm handleAddPost={handleAddPost}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
            <HikeGallery />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    );
}