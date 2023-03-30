import PostExcerpt from "../../features/posts/postExcerpt"

export default function LikedPostSection({body, postId, userLiked, username, name}) {
    return (
        <>
            <PostExcerpt body={body} postId={postId} username={username} userLiked={userLiked} name={name}/>
            {/* <PostExcerpt body={item.body} postId={item.postId} userLiked={currentUser.likedPost} username={item.username} name={item.name}/> */}
        </>
    )
}