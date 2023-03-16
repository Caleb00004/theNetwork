import styles from '../../styles/Home.module.css'
import { globalState } from '../api/apiSlice'
import PostExcerpt from './postExcerpt'

export default function AllPost({data, status, error}) {

    // console.log('ALLP POST LIST CALLED')
    // console.log(data)
    // console.log(status)
    console.log(data)
    if (status == 'pending') {
        return (
                <h1>Data Loading...</h1>
            )
    } else if(status == 'fulfilled') {
        return (
            data.map((item) => (
                item.posts.map((postItem) => (
                    // <h1>Heyy</h1>
                    <>
                        <PostExcerpt body={postItem.body} username={postItem.authorUserName} name={postItem.authorName} postId={postItem._id}/>
                        {/* <div key={postItem._id} className={styles.post}>
                        <div className={styles.imgContainer}> </div>
                        <div className={styles.postDetails}>
                            <p>Akpan caleb <span>@username</span></p>
                            <p>{postItem.snippet}</p>
                            <hr/>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: rgba(0, 0, 0, 1)}}><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: rgba(0, 0, 0, 1)}}><path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg>
                            </div>
                        </div>
                        </div> */}
                    </>
                ))
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