import { useRouter } from 'next/router';
import { loggedIn } from '../features/api/apiSlice'
import styles from '../styles/Navbar.module.css'
import { useGetLogOutMutation } from '../features/api/apiSlice';

export default function Navbar({isLoggedIn, status}) {
    // const {loggedIn} = isLoggedIn
    const router = useRouter()
    const [logout] = useGetLogOutMutation()

    let loggedIn;
    // console.log(status)
    function handleLogOut() {
        // console.log('called')
        logout().unwrap()
            .then(fulfilled => router.push('/'))
            .catch(rejected => {
                console.log(rejected)
            })
    }


    if (status === 'pending') {
        loggedIn = false
    } else if (status === 'fulfilled') {
        loggedIn = isLoggedIn.userId        
    } else {
        loggedIn = false
    }

    return (
        <div className={styles.navbar}>
            <h1 onClick={() => router.push('/')}><span>The</span>Network</h1>
            <ul className={styles.navLinks}>
                <p onClick={() => router.replace('/profile')} >Profile</p>
                <p onClick={() => router.replace('/signup')} >Sign up</p>
                {/* <p>{loggedIn ? 'Log Out' : 'Log in'}</p> */}
                {loggedIn ? <p style={{color: 'red'}} onClick={() => handleLogOut()} >Log Out</p> : <p onClick={() => router.replace('/login')} > Log In </p>}
                <p>Image</p>
            </ul>
        </div>
    )
}