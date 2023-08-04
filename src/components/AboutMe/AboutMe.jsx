import {  Grid, Segment } from 'semantic-ui-react';

function AboutMe({user}){
    return(
<Grid textAlign='center' columns={4}>
    <Grid.Row>
      <Grid.Column>
      </Grid.Column>
      <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
        <Segment vertical>
        <h1 style={{ color: 'green' }}>    {user.username}</h1>
        </Segment>
        <Segment>
           <span> aboutme:  {user.aboutMe}</span>
        </Segment>
          
      </Grid.Column>
    </Grid.Row>
  </Grid>
    );
}

export default AboutMe