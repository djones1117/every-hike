import { Card } from "semantic-ui-react";
import PostHike from '../PostHike/PostHike';

export default function HikeGallery({posts, itemsPerRow, isProfile, addFavorite, deleteFavorite, user}){
    
    const postHikes = posts.map((post) => {
        return <PostHike post={post} key={post._id} itemsPerRow={itemsPerRow} isProfile={isProfile} addFavorite={addFavorite} deleteFavorite={deleteFavorite} user={user} />
    })
    
    
    return(
        <Card.Group itemsPerRow={itemsPerRow}>
        {postHikes}
        </Card.Group>
    )
    }