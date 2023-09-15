import { Card, Icon, Image } from "semantic-ui-react";

function PostHike({ post, isProfile, addFavorite, deleteFavorite, user }) {
  //if the user has not favorited the post
  //the click on the star should make the post request

  //if the user has favorited the post
  //when they click on the star, they should make a delete request, post.api.deleteFavorite

  //find out if the logged in user (user) is in the post.favorites array
  const favoritesIndex = post.favorites.findIndex(
    (favorite) => favorite.username === user.username
  );
  //if the users username is in the fav array of the post, return the index of that object in the post.favorites array
  //if findIndex doesnt find a match it returns -1

  //if the user has favorited the post, favoritesindex be greater than negative so the favcolors should be green
  const favoriteColor = favoritesIndex > -1 ? "green" : "grey";

  // if the user has favorited the post, we need to call our deltefav func
  //if the user has not favorited the post, we need to call our addfav func
  const clickHandler =
    favoritesIndex > -1
      ? () => deleteFavorite(post.favorites[favoritesIndex]._id)
      : () => addFavorite(post._id);

  return (
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
        <Icon
          name={"star"}
          size="large"
          color={favoriteColor}
          onClick={clickHandler}
        />
        {post.favorites.length} favorites
      </Card.Content>
    </Card>
  );
}

export default PostHike;
