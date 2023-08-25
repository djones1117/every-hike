import { Grid, Segment } from "semantic-ui-react";
//see if this pushes
function AboutMe({ user }) {
  console.log(user, "is user");
  return (
    <Grid textAlign="center" columns={4}>
      <Grid.Row>
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <Segment vertical>
            <h1 style={{ color: "lightgreen" }}> {user.username}</h1>
          </Segment>
          <Segment style={{backgroundColor: 'grey'}}>
            <span style={{ color: "lightgreen" }}> {user.aboutMe}</span>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default AboutMe;
