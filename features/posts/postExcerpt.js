import styles from './postExcerpt.module.css'
import { useRouter } from 'next/router'

export default function PostExcerpt({body, postId, username, name}) {

    const router = useRouter()

    return (
        <div className={styles.post}>
            <div className={styles.imgContainer}> </div>
                <div className={styles.postDetails}>
                <p>{name} <span>@{username}</span></p>
                <p onClick={() => router.push(`/singlepost/${postId}`)}>{body}</p>
                <hr />
                <div className={styles.icons}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg>
                </div>
            </div>
        </div>
    )
}