import {  Image, Grid, Segment } from 'semantic-ui-react';

function AboutMe({user}){
    return(
<Grid textAlign='center' columns={4}>
    <Grid.Row>
      <Grid.Column>
        <Image src={`${user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} `} avatar size='small' />
      </Grid.Column>
      <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
        <Segment vertical>
           <h1>{user.username}</h1>
        </Segment>
        <Segment>
           <span> AboutMe: {user.aboutMe}</span>
        </Segment>
          
      </Grid.Column>
    </Grid.Row>
  </Grid>
    );
}

export default AboutMe