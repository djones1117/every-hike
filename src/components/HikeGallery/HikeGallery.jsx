import { Card } from "semantic-ui-react";
import PostHike from '../PostHike/PostHike';

export default function HikeGallery({posts}){
    
    const postHikes = posts.map((post) => {
        return <PostHike post={post} key={post._id}/>
    })
    
    
    return(
        <Card.Group itemsPerRow={3}>
        {postHikes}
        </Card.Group>
    )
    }