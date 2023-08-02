

import PageHeader from "../../components/Header/Header";
import AddHikeForm from "../../components/AddHikeForm/AddHikeForm";
import HikeGallery from "../../components/HikeGallery/HikeGallery";

import { Grid } from "semantic-ui-react";


export default function() {
    return(
      <Grid centered>
        <Grid.Row>
            <Grid.Column>
                <PageHeader />
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <AddHikeForm />
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