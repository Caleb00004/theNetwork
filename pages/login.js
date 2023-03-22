import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useGetLogInMutation } from "../features/api/apiSlice"
import styles from '../styles/loginPage.module.css'
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
export default function logIn() {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [getLogIn] = useGetLogInMutation()
    const [loginRequestStatus, setLoginRequestStatus] = useState('idle')
    const [errorDetails, setErrorDetails] = useState({
        display: false,
        message: ''
    })

    const router = useRouter()

    function handleLogIn(e) {
        e.preventDefault() // To prevent automatic submit from the form

        if (loginRequestStatus == 'idle') {
            try {
                setLoginRequestStatus('pending')
                // setDisplayErrorMessage(false)

                setErrorDetails(prevState => ({...prevState, display: false}))

                getLogIn({email: email, password: password}).unwrap()
                    .then(fulfilled => {
                        toast.success('login succesful', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        router.push('/')
                    })
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
            {/* <div className='w-fit h-fit'> */}
            
            <form onSubmit={handleLogIn}>
                <input required className={styles.email} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='name@gmail.com'/>
                <input required className={styles.password} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*********'></input>
                <button disabled={!canLogIn} className={styles.submit} style={canLogIn ? {opacity: 1} : {opacity: 0.3}}>Log In</button>
                {errorDetails.display && <p style={{color: 'red'}}>{errorDetails.message}</p>}
            </form>
            <span><input type={"checkbox"} />Remember me</span>

            <p>Don't have an account? <Link href='/signup'>Sign Up</Link></p>
        </div>
    )
}