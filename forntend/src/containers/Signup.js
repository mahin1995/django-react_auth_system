import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { signup } from '../actions/auth_action';
import { Navigate } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
const Signup = ({signup,isAuthenticated}) => {
    const [accountCreated,setAccountCreated]=useState(false)
    // let navigate = useNavigate();
    const [formData,setFormData]=useState({
        first_name:"",last_name:"",
        email:"",
        password:"",
        re_password:""
    })
    const {first_name,last_name,email,password,re_password}=formData
    const onChange=e=>setFormData({
        ...formData,[e.target.name]:e.target.value
    })
    const onSubmit=e=>{
        e.preventDefault()
        if(password===re_password){
            signup(first_name,last_name,email,password,re_password)
            setAccountCreated(true)
        }
    }

    if(isAuthenticated){
        return <Navigate to="/" />;
     }
    if(accountCreated){
        return <Navigate to="/" />;
     }
     const continueWithGoogle=async()=>{
        try{
            const res=await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)
            window.location.replace(res.data.authorization_url)
        }catch(err){

        }
    }
     const continueWithFacebook=async()=>{
        try{
            const res=await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)
            window.location.replace(res.data.authorization_url)
        }catch(err){

        }
    }
    return (
        <div className="container mt-5">
            <h1>SignUp</h1>
            <p>Create  your Account</p>
            <form onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input 
                    className='form-control'
                    type="text"
                    placeholder="First name"
                    name="first_name"
                    value={first_name}
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                <div className="form-group">
                    <input 
                    className='form-control'
                    type="text"
                    placeholder="Last name"
                    name="last_name"
                    value={last_name}
                    onChange={e=>onChange(e)}
                    required
                    />
                </div>
                        <div className="form-group">
                    <input 
                    className='form-control'
                    type="email"
                    placeholder="Email*"
                    name="email"
                    value={email}
                    onChange={e=>onChange(e)}
                    required
                    />
                        </div>
                        <div className="form-group">

                    <input 
                    className='form-control'
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e=>onChange(e)}
                    minLength='6'
                    required
                    />
                        </div>
                        <div className="form-group">

                    <input 
                    className='form-control'
                    type="password"
                    placeholder="Confirm Password"
                    name="re_password"
                    value={re_password}
                    onChange={e=>onChange(e)}
                    minLength='6'
                    required
                    />
                        </div>
            
                <button className="btn btn-primary" type="submit">signup</button>

            </form>
            <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
                Continue with google
            </button>
            <br/>

            <button className="btn btn-primary mt-3" onClick={continueWithFacebook}>
                Continue with facebook
            </button>
            <p className="mt-3">already have an a account? <Link to="/signin">Sign In</Link></p>
        </div>
    )
}
const mapStateToProps=state=>({
    // is authenticate
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{signup})(Signup)
// export default (Login)
