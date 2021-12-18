import React,{useEffect} from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import queryString from 'query-string';
import {checkAuthenticated,load_user,googleAuthentication} from '../actions/auth_action'
// import { Outlet } from 'react-router-dom';




const Layout = (props) => {
    let location=useLocation()

    useEffect(() => {
        const values=queryString.parse(location.search)
        const state=values.state?values.state:null
        const code=values.code?values.code:null
        console.log("state:",state)
        console.log("code",code)
        if(state&&code){
            props.googleAuthentication(state,code)
        }
        else{
            props.checkAuthenticated()
            props.load_user()
        }

    }, [location.search, props])
    return (
        <div>
            <Navbar></Navbar>
            {props.children}
        </div>
    )
}

export default connect(null,{checkAuthenticated,load_user,googleAuthentication})(Layout)
  
 
