import React,{useState} from 'react'

import { connect } from 'react-redux';
import { reset_password } from '../actions/auth_action';
import { Navigate } from "react-router-dom";


const ResetPassword = ({reset_password}) => {
    const [requestSend,setRequestSend]=useState(false)
    const [formData,setFormData]=useState({
        email:"",
    })
    const {email}=formData
    const onChange=e=>setFormData({
        ...formData,[e.target.name]:e.target.value
    })
    const onSubmit=e=>{
        e.preventDefault()  
        reset_password(email)
        setRequestSend(true)
    }

    if(requestSend){
        return <Navigate to="/" />;
     }
    return (
        <div className="container mt-5">
 
            <p>Request Password Reset</p>
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

                </div>
                <button className="btn btn-primary" type="submit">Reset password</button>
            </form>
    
        </div>
    )
}


export default connect(null,{reset_password })(ResetPassword)
// export default (Login)
