import PostExcerpt from './postExcerpt'

export default function AllPost({data, status, error}) {

    // console.log(data)
    if (status == 'pending') {
        return (
                <h1>Data Loading...</h1>
            )
    } else if(status == 'fulfilled') {
        return (
            data.map((postItem) => (
                <div key={postItem._id}>
                    <PostExcerpt body={postItem.body} username={postItem.authorUserName} name={postItem.authorName} postId={postItem._id}/>                    
                </div>
            ))
        )
    } else {
        console.log(error)
        return (
            <>
                <h1>{error.error}</h1>
                <h3>Please Reload The Page</h3>
            </>
        )
    }

}