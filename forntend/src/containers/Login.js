import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../actions/auth_action';
import { Navigate } from "react-router-dom";
import axios from 'axios';
axios.defaults.withCredentials = true;
const Login = ({login,isAuthenticated}) => {
    console.log(isAuthenticated)
    // let navigate = useNavigate();
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const {email,password}=formData
    const onChange=e=>setFormData({
        ...formData,[e.target.name]:e.target.value
    })
    const onSubmit=e=>{
        console.log("login button")
        e.preventDefault()  
        login(email,password)
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
    if(isAuthenticated){
        return <Navigate to="/" />;
     }
    return (
        <div className="container mt-5">
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input 
                    className='form-control'
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={e=>onChange(e)}
                    required
                    />
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
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
                Continue with google
            </button>
            <button className="btn btn-primary mt-3" onClick={continueWithFacebook}>
                Continue with google
            </button>
            <p className="mt-3">Don't have an a account? <Link to="/signup">Sign up</Link></p>
            <p className="mt-3">Forget your password ? <Link to="/reset_password">Reset Password</Link></p>
        </div>
    )
}
const mapStateToProps=state=>({
    // is authenticate
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)
// export default (Login)
