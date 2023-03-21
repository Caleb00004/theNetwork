import { useState } from 'react'
import FormComponent from '../components/FormComponent'
import styles from '../styles/signup.module.css'
import Link from 'next/link'
import { globalState } from '../features/api/apiSlice'
import useCheckUserObj from '../custom hooks-functions/checkUserObject'

export default function SignUp() {

    const [isObjectEmpty] = useCheckUserObj()
    
    if (isObjectEmpty) {
        return (
            <div className='signup-page'>
                <div className={styles.signupPage}>
                    <h1 style={{textAlign: 'center'}}>Sign Up</h1>     
                    <FormComponent />
                </div>
            </div>
        )
    } else {
        return (
            <div className='signup-page'>
                <div className={styles.signupPage} style={{textAlign: 'center'}}>
                    <h2>Already Signed In. Navigate To your <Link style={{color: '#1bca1b'}} href='/profile'>Profile</Link></h2>
                </div>
            </div>
        )
    }
}