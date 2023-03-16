import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useGetLogInMutation } from "../features/api/apiSlice"
import styles from '../styles/loginPage.module.css'

export default function logIn() {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [getLogIn] = useGetLogInMutation()
    const [loginRequestStatus, setLoginRequestStatus] = useState('idle')
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
    // const [errorMessage, setErr]
    const [errorDetails, setErrorDetails] = useState({
        display: false,
        message: ''
    })
    // const [canLogIn, setCanLogIn] = useState(true) // to check if log in button has being Clicked

    const router = useRouter()

    function handleLogIn(e) {
        e.preventDefault()

        if (loginRequestStatus == 'idle') {
            try {
                setLoginRequestStatus('pending')
                // setDisplayErrorMessage(false)

                setErrorDetails(prevState => ({...prevState, display: false}))

                getLogIn({email: email, password: password}).unwrap()
                    .then(fulfilled => router.push('/'))
                    .catch(rejected => {
                        console.log(rejected)
                        if (rejected.status == 'FETCH_ERROR') {
                            setErrorDetails({display: true, message: `${rejected.error} Please reload page`})
                        } else {
                            setErrorDetails({display: true, message: `${rejected.data.message} `})
                        }

                        setLoginRequestStatus('idle')
                    })
                    // setCanLogIn(true)
            } catch (err) {
                console.log('Failed to Post', err)
            } 
        }

    }

    const canLogIn = true && loginRequestStatus == 'idle'

    // console.log(canLogIn)

    return (
        <div className={styles.loginPage}>
            <h1>Login</h1>
            
            <form onSubmit={handleLogIn}>
                <input required className={styles.email} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='name@gmail.com'/>
                <input required className={styles.password} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*********'></input>
                <button disabled={!canLogIn} className={styles.submit} style={canLogIn ? {opacity: 1} : {opacity: 0.3}}>Log In</button>
                {errorDetails.display && <p style={{color: 'red'}}>{errorDetails.message}</p>}
            </form>
            <span><input type={"checkbox"} />Remember me</span>

            <p>Don't have an account? <Link href='/signup'>Sign Up</Link></p>
            {/* <button>Join Us!</button> */}
           {/* <button onClick={() => getLogIn()}>Log In</button> */}
        </div>
    )
}