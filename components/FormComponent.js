import { useRef, useState } from "react"
import styles from '../styles/signup.module.css'
import { useGetSignUpMutation } from "../features/api/apiSlice"
import { useRouter } from "next/router"

export default function FormComponent() {

    const [email, setEmail] = useState('')
    const [createPassword, setCreatePassword] = useState('')
    const [signupRequestStatus, setSignupRequestStatus] = useState('idle')
    const [name2, setName2] = useState('')
    const [username, setUserName] = useState('')
    const [number, setNumber] = useState('')
    const [bio, setBio] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [Imgvalue, setImgValue] = useState('')
    const eMessageRef = useRef(null)
    const [errorDetails, setErrorDetails] = useState({
        display: false,
        message: ''
    })

    const router = useRouter()

    const [signUp] = useGetSignUpMutation()
    const [step, setStep] = useState(0)

    const handleShowParagraph = () => {
        // setIsParagraphShown(true);
        // eMessageRef.current.scrollIntoView({ behavior: "smooth" });
    };

    function handleSignIn(e) {
        e.preventDefault()

        const DataToSave = {
            name: name2,
            username,
            bio,
            number,
            email,
            // age: dateOfBirth,
            // age: 21,
            dateOfBirth,
            photo: Imgvalue,
            password: createPassword
        }

        if (signupRequestStatus === 'idle') {
            signUp({...DataToSave}).unwrap()
            .then(fulfilled => {
                toast.success('signUp succesful', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                router.push('/profile')
            })
            .catch(rejected => {
                console.log(rejected)
                if (rejected.status == 'FETCH_ERROR') {
                    setErrorDetails({display: true, message: `${rejected.error} Please reload page`})
                } else {
                    setErrorDetails({display: true, message: `${rejected.data.message} `})
                }

                setSignupRequestStatus('idle')
            })
            
        }

        console.log('Submit Called')
    }

    function previewImage(e) {
        const selectedFile = e.target.files[0]

        setImgValue(URL.createObjectURL(selectedFile))
    }

    const firstGroup = 
        <>  
            <label>Name  </label>
            <input required className='' type={"text"} value={name2} onChange={(e) => setName2(e.target.value)} placeholder='Enter your name'/>

            <label>Please Enter your UserName: </label>
            <input required type={"text"} value={username} onChange={(e) => setUserName(e.target.value)} placeholder='kalix8812'/>

            <label>Phone Number : </label>
            <input required className={styles.number} type={"number"} value={number} onChange={(e) => setNumber(e.target.value)} placeholder='+(234)-1111-111'/>

            <label>Date of Birth</label>
            <input type={'date'} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
        </>        

    const secondGroup = 
        <>
            <label>Email </label>
            <input required className={styles.email} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='name@gmail.com'/>

            <label>Enter Your Password</label>
            <input required type={"password"} value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} placeholder='*********'></input>

            <label>Enter a Brief Bio </label> 
            <textarea required className={styles.textarea} value={bio} onChange={(e) => setBio(e.target.value)} type='text' placeholder="Hello I'm john doe, I like listening to movies and watching music"/>

            <label>Profile Picture (optional) </label>
            <input type={'file'} name={'file'} accept={'image.png, image.jpeg'} onChange={(e) => previewImage(e)}/>

            <img id="preview-image" className={styles.previewImage} src={Imgvalue} alt="Preview Image"/>
        </>

    // check if 'seconfGroup' can be displayed
    const canNext = [name2, username, number, dateOfBirth].every(Boolean)

    // Navigate Back and Forth btw the 2 form groups
    const Navigation = () => (
        <>
            {
                step == 0 ?
                <button disabled={!canNext} className={styles.nextBtn} type='button' onClick={() => setStep(prevstate => prevstate + 1)}>Next {">"} </button>
                    :
                <div className={styles.btnContainer}>
                    <button className={styles.prevBtn} onClick={() => setStep(prevstate => prevstate - 1)}>Back</button>
                    <button className={styles.submitBtn} onClick={handleShowParagraph} type='submit'>Submit</button>
                </div>
            }
        </>
    )
    return (
        <form onSubmit={handleSignIn}>
            {step == 0 ? firstGroup : secondGroup}
            <Navigation />
            {errorDetails.display && <p ref={eMessageRef} style={{color: 'red'}}>{errorDetails.message}</p>}
        </form>
    )
    
}


