import Navbar from "./Navbar"
// import Footer from "./Footer"
import BottomNav from "./BottomNav"
import ProfileDisplay from "./profileDisplay"
import SearchComponent from "./searchComponent"
import Styles from '../styles/layout.module.css'
import React from "react"
import { useGetLoggedInStatusQuery } from "../features/api/apiSlice"

export default function Layout({children}) {

    const {data: isLoggedIn, status, error} = useGetLoggedInStatusQuery()
    // console.log(isLoggedIn)
    // console.log(error)

    // This is to pass some props to all chlidren components/pages
    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                isLoggedIn,
                status,
                error
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

            <Navbar isLoggedIn={isLoggedIn} status={status} error={error}/>
                <div className={Styles.layout}>
                    <ProfileDisplay isLoggedIn={isLoggedIn} status={status} error={error}/>
                    {renderChildren()}
                    <SearchComponent />
                </div>
            <BottomNav />
        </div>
    )
}