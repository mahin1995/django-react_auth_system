import React,{useState} from 'react'

import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth_action';
import { Navigate,useParams } from "react-router-dom";


const ResetPasswordConfirm = ({reset_password_confirm}) => {
    let params = useParams();
    const [requestSend,setRequestSend]=useState(false)
    const [formData,setFormData]=useState({
        new_password:"",
        re_new_password:"",
    })
    const {new_password,re_new_password}=formData
    const onChange=e=>setFormData({
        ...formData,[e.target.name]:e.target.value
    })
    const onSubmit=e=>{
        e.preventDefault()  
        const uid=params.uid
        const token=params.token
        reset_password_confirm(uid,token,new_password,re_new_password)
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
                    type="password"
                    placeholder="New password"
                    name="new_password"
                    value={new_password}
                    onChange={e=>onChange(e)}
                    minLength='6'
                    required
                    />
                            <input 
                    className='form-control'
                    type="password"
                    placeholder="confrim Password"
                    name="re_new_password"
                    value={re_new_password}
                    onChange={e=>onChange(e)}
                    minLength='6'
                    required
                    />

                </div>
                <button className="btn btn-primary" type="submit">Reset password</button>
            </form>
    
        </div>
    )
}


export default connect(null,{reset_password_confirm })(ResetPasswordConfirm)
// export default (Login)
