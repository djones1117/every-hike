import { Grid } from "semantic-ui-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import PageHeader from "../../components/Header/Header";


export default function ExplorePage({handleLogout, user}) {
  return(

   <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <SearchBar handleLogout={handleLogout} user={user}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
