import PostExcerpt from "../../features/posts/postExcerpt"

export default function PostSection({body, postId, username, userLiked, name}) {
    return (
        <>
            <PostExcerpt body={body} postId={postId} username={username} userLiked={userLiked} name={name}/>
        </>
    )
}