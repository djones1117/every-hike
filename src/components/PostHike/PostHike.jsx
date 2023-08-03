import { Card, Icon, Image } from "semantic-ui-react";



function PostHike({post, isProfile}) {





return(
    <Card key={post._id}>
    {isProfile ? null : (
      <Card.Content textAlign="left">
        <Image
          floated="left"
          size="large"
          avatar
          src={
            post.user.photoUrl
              ? post.user.photoUrl
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
          }
        />
        <Card.Header floated="right">{post.user.username}</Card.Header>
      </Card.Content>
    )}

    <Image src={`${post.photoUrl}`} wrapped ui={false} />
    <Card.Content>
      <Card.Description>{post.difficulty}</Card.Description>
      <Card.Description>{post.trail}</Card.Description>
      <Card.Description>{post.length}</Card.Description>
      <Card.Description>{post.location}</Card.Description>
    </Card.Content>
    <Card.Content extra textAlign={"right"}>
      <Icon name={"heart"} size="large"  />
      {post.favorites.length} favorites
    </Card.Content>
  </Card>
);
}

export default PostHike;