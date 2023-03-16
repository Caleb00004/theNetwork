import { useRouter } from "next/router"
import { useState } from "react"
import { globalState } from "../../features/api/apiSlice"
import { useGetPostsQuery } from "../../features/api/apiSlice"
import { useAddCommentMutation } from "../../features/api/apiSlice"
import PostExcerpt from "../../features/posts/postExcerpt"
import styles from '../../styles/singlepost.module.css'

export default function singlePost () {

    const {data, status} = useGetPostsQuery()
    const [comment, setComment] = useState('')
    const {postData, currentUser} = globalState    
    const router = useRouter()
    const postId = router.query.post
    const [commentDispach] = useAddCommentMutation()
    const [errorDetails, setErrorDetails] = useState({
        display: false,
        message: ''
    })
    // console.log(postId)

    // console.log(postData)
    // console.log(currentUser)

    const objectEmpty = Object.keys(currentUser).length === 0

    function addComment() {
        if (objectEmpty) {
            return setErrorDetails(prevState => ({message: 'You Need to be Logged In', display: true}))
        }
        else {
            let currentPost;
            // const currentBook = bookData.filter(item => item.id == bookId)
            const filterPost = postData.map(item => (
                item.posts.filter((postItem) => {
                    if (postItem._id == postId) {
                        currentPost = postItem
                    }
                    // console.log(postItem._id)
                })
            ))
            
            // const test = data.map()
            const {posts} = currentUser
            const commentData = {body: comment, authorName: currentUser.name, authorUserName: currentUser.username}

            console.log(posts)
            // let commentData = {body: 'This is a Comment', authorName: 'Caleb Jack', authorUserName: 'caleb112'}    
            let newComment = posts.map(postItem => {
                return postItem._id === postId ? {...postItem, comments: [...postItem.comments, commentData]} : postItem
            })
            console.log(newComment)

            let newCommentdata = {posts: newComment}
            commentDispach(newCommentdata).unwrap()
                .then(fulfilled => console.log('Comment Posted'))
                .catch(rejected => console.log(rejected))
        }
    }

    if (postData.length <= 0) {
        return (
            <div>
                <h1>No Post ha Being Made.</h1>
            </div>
        )
    } else if (postData.length > 0 && postId) {

        let currentPost;
        // const currentBook = bookData.filter(item => item.id == bookId)
        const filterPost = postData.map(item => (
            item.posts.filter((postItem) => {
                if (postItem._id == postId) {
                    currentPost = postItem
                }
                // console.log(postItem._id)
            })
        ))
        
        let isCommentsEmpty;
        if (currentPost.comments.length <= 0) {
            isCommentsEmpty = true        
        } else {
            isCommentsEmpty = false
        }

        // console.log(isCommentsEmpty)
        // console.log(currentPost)
    
        return (
            <div className={styles.singlePostPage}>
                <h1>This is the single Post Page</h1>
                {/* <PostExcerpt body={currentPost.body} username={currentPost.authorUserName} postId={currentPost._id} name={currentPost.authorName}/>             */}
    
                <div className={styles.singlePost}>
                    <div className={styles.imgContainer}> </div>
                        <div className={styles.postDetails}>
                        <p style={{fontSize: '1.3em'}}>{currentPost.authorName} <span>@{currentPost.authorUserName}</span></p>
                        <p onClick={() => router.push(`/singlepost/${currentPost.postId}`)}>{currentPost.body}</p>
                        <p style={{fontStyle: 'italic', color: '#06c706'}}>created at: {currentPost.createdAt.substring(0,10)}</p>
                        <hr />
                        <div className={styles.icons}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg>
                        </div>

                    </div>
                </div>

                <div className={styles.addComments}>
                    <input className={styles} type={'text'} value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a comment'/>
                    <button onClick={() => addComment()}>Comment</button>
                </div>
                {errorDetails.display && <p>{errorDetails.message}</p>}
                <div className={styles.commentList}>
                    {!isCommentsEmpty ? currentPost.comments.map(item => (
                        <div>
                            <p>Comment: {item.body}</p>
                        </div>
                    )) : 
                        <p>No Comments Under This Post</p>
                    }    
                </div>
            </div>
        )
    } else {
        return (
            <h1 style={{color: 'red'}}>CHECKING !!!</h1>
        )
    }

}