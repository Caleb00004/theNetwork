import Navbar from "./Navbar"
// import Footer from "./Footer"
import BottomNav from "./BottomNav"
import ProfileDisplay from "./profileDisplay"
import SearchComponent from "./searchComponent"
import Styles from '../styles/layout.module.css'
import React, { useState } from "react"
import { useGetLoggedInStatusQuery, useGetAllUsersQuery } from "../features/api/apiSlice"


export default function Layout({children}) {
    console.log('LAYOUT')
    const {data: userData, status: userDataStatus} = useGetAllUsersQuery()
    const {data: isLoggedIn, status, error} = useGetLoggedInStatusQuery()

    if (typeof window !== 'undefined') {
        console.log(window.innerWidth)
    }

    const showSuccessToast = (message) => (
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
    )
    
    const showErrorToast = (message) => (
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    )

    // This is to pass some props to all chlidren components/pages
    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                isLoggedIn,
                status,
                error,
                userData,
                userDataStatus,
                showSuccessToast,
                showErrorToast
            })
        })
    }

    return (
        <div>
            {/* <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                    {/* Same as *
                <ToastContainer />                
            </div> */}

            <Navbar isLoggedIn={isLoggedIn} status={status} error={error} showErrorToast={showErrorToast}/>
                <div className={Styles.layout}>
                    <ProfileDisplay isLoggedIn={isLoggedIn} status={status} error={error}/>
                    {renderChildren()}
                    <SearchComponent data={userData} status={userDataStatus}/>
                </div>
            <BottomNav />
        </div>
    )
}