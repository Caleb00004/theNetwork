import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectComments } from '../store/slices/commentSlice'
import { fetchPostData } from '../store/slices/commentSlice'
import makeStore from '../store/store'

import { useGetPostsQuery } from '../features/api/apiSlice'
import { useGetLoggedInStatusQuery } from '../features/api/apiSlice'
import { useGetLogInMutation } from '../features/api/apiSlice'

import { globalState } from '../features/api/apiSlice'

import PostExcerpt from '../features/posts/postExcerpt'
import AllPost from '../features/posts/allPostsList'
import Modal from 'react-modal'
import { useState } from 'react'

export default function Home({test, name }) {
  // console.log(data)

  const {data: postData, status: postStatus, error: postError} = useGetPostsQuery()
  const [isOpen, setIsOpen] = useState(false) // To Open and Close the Modal
  const {currentUser} = globalState

  const objectEmpty = Object.keys(currentUser).length === 0

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

  const myModal = (
    <div className='modal'>
      <h1>This Is the model Conent</h1>
    </div>
  )
  // console.log(postData)  
  // console.log(postStatus)
  // console.log(postError)

  // const postList = postData.map((item) => {
  //   item.posts.map((postItem) => {
  //     return (
  //       <div className={styles.post}>
  //       <div className={styles.imgContainer}> </div>
  //       <div className={styles.postDetails}>
  //         <p>Akpan caleb <span>@username</span></p>
  //         <p>{postItem.snippet}</p>
  //       </div>
  //     </div>
  //     )
  //     })
  // })

  // console.log(postList)


  // const comments = useSelector(selectComments)
  // console.log(comments)
  // console.log(test)
  // const {status, data} = useGetPostsQuery()
  // console.log(response)

/*  const [getLogIn] = useGetLogInMutation() */

  // console.log(isLoggedIn)
  // console.log(status)

/*
  if (status === 'pending') {
    return (
      <h1>Loading</h1>
    )
  } else if (status === 'rejected') {
    return (
      <h1>Error</h1>
    )
  }
*/
  // Needed to remove one error in the modal component.
  Modal.setAppElement('#__next')
  console.log(objectEmpty)
  return (
    <div className='home-page'>
        <div className={styles.postFormContainer}>

          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <h3>You need to be logged in to Perform this action</h3>
            <button style={{backgroundColor: 'green', border: 'none', color: 'white', padding: '0.5em 1em'}} onClick={() => setIsOpen(false)}>Close</button>
         </Modal>
          <label>Make A Post? </label>

          <div className={styles.postForm}>
            <input type={'text' }/>
            {objectEmpty ? <button onClick={() => setIsOpen(true)}>Post</button> : <button onClick={() => console.log('post Made')}>Post</button> }
          </div>

        </div>
        <AllPost data={postData} status={postStatus} error={postError}/>
        {/* <button onClick={() => getLogIn()}>Login</button> */}

        <PostExcerpt />
        <PostExcerpt />
        <PostExcerpt />
    </div>
  )
}
