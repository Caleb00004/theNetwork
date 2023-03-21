import styles from '../styles/profilePage.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { globalState } from '../features/api/apiSlice';
import PostExcerpt from '../features/posts/postExcerpt';

export default function Profile({isLoggedIn, status}) {

    const {currentUser} = globalState
    const router = useRouter()

    if (status === 'pending') {
        return (
            <h1>Loading Data...</h1>
        )
    } else if (status == 'fulfilled') {

        if (isLoggedIn.userId == false) {
            return (
                <div className={styles.profilePage}>
                    <div className={styles.notLoggedIn}>
                        <h3>You Need To be Logged In to View This Page</h3>
                        <p>Log In <button onClick={() => router.push('/login')}>Here</button> </p>

                        <p>Dont have an Account ? </p>
                        <button onClick={() => router.push('/signup')}>Sign Up</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={styles.profilePage}>
                    {/* <h3>This the Profile Page ?</h3> */}
                    <div className={styles.coverImgContainer}>
                        <Image src='/avatar.png' alt='profile picture' width={100} height={90}/>
                    </div>
        
                    <h2>{currentUser.name}</h2>
                    <p className={styles.username}>@{currentUser.username}</p>
        
                    <p>{currentUser.bio}</p>
                    <p>Joined today</p>
                    <p className='ppo'>Link:</p>
        
                    <div className={styles.postContainer}>
                        <p>POSTS</p>
                        {currentUser.posts ? currentUser.posts.map(item => (
                            <PostExcerpt body={item.body} postId={item._id} username={item.authorUserName} name={item.authorName}/>                        
                        )) : <p style={{color: 'white'}}>You Currently Have no Posts</p>}
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className={styles.profilePage}>
                <h1>An Error Occured</h1>
                <p>Please Reload the Page</p>
            </div>
        )
    }

}