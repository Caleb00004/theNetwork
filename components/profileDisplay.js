import styles from './profilecomponent.module.css'
import Image from 'next/image'


export default function ProfileDisplay({isLoggedIn, status}) {
    
    let loggedIn;
    // console.log(isLoggedIn)
    // console.log(status)

    if (status == 'pending') {
        loggedIn = false

        return (
            <div className="profileComponent">
                <div className={styles.ProfileDisplay}>
                    <div className={styles.imgContainer}>
                        <p>Loading...</p>
                    </div>
                    <div className={styles.texts}>
                        <p>Loading...</p>
                    </div>


                </div>
            </div>
        )
    }
    else if (status === 'fulfilled') {
        loggedIn = isLoggedIn
        console.log(loggedIn.userId)

        if (loggedIn.userId == false) {
            return (
                <div className="profileComponent">
                    <div className={styles.ProfileDisplay}>
                        <div className={styles.imgContainer}>
                            <Image src='/avatar.png' width={100} height={50}  alt='profile img'/>
                        </div>
                        <div className={styles.texts}>
                            <h3>[Not Logged In]</h3>
                            <p>Welcome to <span style={{color: '#1bca1b'}}>The</span>Network. A platform that you can use to network with friends and strangers
                                from all over the world
                            </p>
                            <hr />
                            <p>Number of Post: <span>0</span></p>
                            <p>Impressions on your post: <span>0</span> </p>
                            <hr />
                            <p>Checkout my other projects <a href='#'>Here</a> </p>
                        </div>


                    </div>
                </div>

            )

        } else {
            return (
                <div className="profileComponent">
                    <div className={styles.ProfileDisplay}>
                        <div className={styles.imgContainer}>
                            <Image src='/avatar.png' width={100} height={50}  alt='profile img'/>
                        </div>
                        <div className={styles.texts}>
                            <h3>Caleb Akpan</h3>
                            <p><span>Bio</span> : I am caleb a tottenham and psg Fan. I love playing video Games and dancing
                                to Michael Jackson Music.
                            </p>
                            <hr />
                            <p>Number of Post: <span>23</span></p>
                            <p>Impressions on your post: <span>23</span> </p>
                            <hr />
                            <p>Checkout my other projects <a href='#'>Here</a> </p>
                        </div>
        
        
                    </div>
                </div>
            )            
        }
    } else {
        return (
            <div className="profileComponent">
                <div className={styles.ProfileDisplay}>
                    <div className={styles.imgContainer}>
                        <Image src='/avatar.png' width={100} height={50}  alt='profile img'/>
                    </div>
                    <div className={styles.texts}>
                        <h3>[Not Logged In]</h3>
                        <p>Welcome to <span style={{color: '#1bca1b'}}>The</span>Network. A platform that you can use to network with friends and strangers
                            from all over the world
                        </p>
                        <hr />
                        <p>Number of Post: <span>0</span></p>
                        <p>Impressions on your post: <span>0</span> </p>
                        <hr />
                        <p>Checkout my other projects <a href='#'>Here</a> </p>
                    </div>


                </div>
            </div>

        )
    }   

}