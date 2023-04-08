import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useGetPostsQuery, useAddPostMutation } from '../features/api/apiSlice'
import { globalState } from '../features/api/apiSlice'
import PostExcerpt from '../features/posts/postExcerpt'
import AllPost from '../features/posts/allPostsList'
import Modal from 'react-modal'
import { useState } from 'react'
import { toast } from 'react-toastify'
import useCheckUserObj from '../custom hooks-functions/checkUserObject'

export default function Home({showSuccessToast}) {
  console.log('INDEX/HOME PAGE')
  const {data: postData, status: postStatus, error: postError} = useGetPostsQuery()
  const [isOpen, setIsOpen] = useState(false) // To Open and Close the Modal
  const {currentUser} = globalState

  // the post mutation from the apiSlice
  const [makePost] = useAddPostMutation()
  const [postInput, setPostInput] = useState('')

  // To check if User object is Empty. i.e if User is signed in or not
  const [objectEmpty] = useCheckUserObj()

  // styles for the Modal Component
  const customStyles = {
    overlay: {
       backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
       top: '50%',
       left: '50%',
       right: 'auto',
       bottom: 'auto',
       marginRight: '-50%',
       backgroundColor: 'rgb(31, 29, 29)',
       border: '1px solid green',
       color: 'white',
       transform: 'translate(-50%, -50%)'
    }
 }
//  console.log(currentUser)
  function handleNewPost() {
    const newPost = {
      authorName: currentUser.name,
      authorUserName: currentUser.username,
      body: postInput,
      photo: currentUser.photo
    }

    makePost(newPost).unwrap()
      .then(fulfilled => {
        showSuccessToast('post successful')
        console.log('Post Made')
        setPostInput('')
      })
      .catch(rejected => console.log(rejected))
  }

  const canPost = postInput.length > 3
  // Needed to remove one error in the modal component.
  Modal.setAppElement('#__next')

  return (
    <div className='home-page'>
        <div className={styles.postFormContainer}>

          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <h3>You need to be logged in to Perform this action</h3>
            <button style={{backgroundColor: 'green', border: 'none', color: 'white', padding: '0.5em 1em'}} onClick={() => setIsOpen(false)}>Close</button>
         </Modal>
          <label>Make A Post? </label>

          <div className={styles.postForm}>
            <input type={'text' } value={postInput} onChange={(e) => setPostInput(e.target.value)}/>
            {objectEmpty ? <button disabled={!canPost} onClick={() => setIsOpen(true)}>Post</button> : <button disabled={!canPost} onClick={() => handleNewPost()}>Post</button> }
          </div>

        </div>
        <AllPost data={postData} status={postStatus} error={postError}/>
        {/* <button onClick={() => getLogIn()}>Login</button> */}

        {/* <PostExcerpt /> */}
    </div>
  )
}
