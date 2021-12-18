import React,{useState} from 'react'
import { connect } from 'react-redux';
import { verify } from '../actions/auth_action';
import { Navigate,useParams } from "react-router-dom";
const Activate = ({verify,match}) => {
    console.log(match)
    const [accountVerified,setAccountVerified]=useState(false)
    let params = useParams();

    const verify_account=e=>{
        const uid=params.uid
        const token=params.token
        verify(uid,token)
        setAccountVerified(true)
    }

    if(accountVerified){
        return <Navigate to="/" />;
     }
    return (
        <div className="container mt-5">
            <div className="d-flex flex-column justify-content-center align-item-center"
            style={{marginTop:'200px'}}
            >
                <h1>Verify your account </h1>
                <button onClick={verify_account} style={{marginTop:'50px'}} type='button' className='btn btn-primery' >Verify</button>
            </div>
        </div>
    )
}


export default connect(null,{verify})(Activate)
// export default (Login)
