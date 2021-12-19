import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import queryString from 'query-string';
import {facebookAuthentication} from '../actions/auth_action'
// import { Outlet } from 'react-router-dom';




const Faebook = ({facebookAuthentication}) => {
    let location=useLocation()

    useEffect(() => {
        const values=queryString.parse(location.search)
        const state=values.state?values.state:null
        const code=values.code?values.code:null
        console.log("state:",state)
        console.log("code",code)
        if(state&&code){
            facebookAuthentication(state,code)
        }
   

    }, [location.search])
    return (
        <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Home page</h1>
            <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
            {/* <Link className="btn btn-primary btn-lg" to='/login'>Login button</Link> */}
          </div>
        </div>
    
        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Change the background</h2>
              <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
              <button className="btn btn-outline-light" type="button">Example button</button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>Add borders</h2>
              <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
              <button className="btn btn-outline-secondary" type="button">Example button</button>
            </div>
          </div>
        </div>
    
        <footer className="pt-3 mt-4 text-muted border-top">
          © 2021
        </footer>
      </div>
    )
}

export default connect(null,{facebookAuthentication})(Faebook)
  
 
