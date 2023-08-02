import { Header, Segment } from 'semantic-ui-react'
export default function PageHeader(){
    return(

  

<Segment>
    <Header as='h2' floated='right'>
      Float Right
    </Header>
    <Header as='h2' floated='left'>
      Float Left
    </Header>
  </Segment>
    );
    }