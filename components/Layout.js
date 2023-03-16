import Navbar from "./Navbar"
import Footer from "./Footer"
import ProfileDisplay from "./profileDisplay"
import SearchComponent from "./searchComponent"
import Styles from '../styles/layout.module.css'

import React from "react"
import { useGetLoggedInStatusQuery } from "../features/api/apiSlice"

export default function Layout({children}) {

    const {data: isLoggedIn, status, error} = useGetLoggedInStatusQuery()
    console.log(isLoggedIn)
    console.log(error)
    // console.log(status)
    // console.log(data)
    // console.log(`this ${status}: ${data}`)

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
            <Navbar isLoggedIn={isLoggedIn} status={status} error={error}/>
                <div className={Styles.layout}>
                    <ProfileDisplay isLoggedIn={isLoggedIn} status={status} error={error}/>
                    {renderChildren()}
                    <SearchComponent />
                </div>
        </div>
    )
}