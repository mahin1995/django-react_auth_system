import {LOGIN_SUCCESS,
    LOGIN_FAIL,
   USER_LOADED_SUCCESS,
   USER_LOADED_FAIL,
   AUTHENTICATED_SUCCESS,
   AUTHENTICATED_FAIL,
   LOGOUT,
   PASSWORD_RESET_SUCCESS,
   PASSWORD_RESET_FAIL,
   PASSWORD_RESET_CONFIRM_SUCCESS,
   PASSWORD_RESET_CONFIRM_FAIL,
   SIGNUP_SUCCESS,
   SIGNUP_FAIL,
   ACTIVATION_SUCCESS,
   ACTIVATION_FAIL,
   GOOGLE_AUTH_SUCCESS,
   GOOGLE_AUTH_FAIL,
   FACEBOOK_AUTH_SUCCESS,
   FACEBOOK_AUTH_FAIL
} from './types'
import axios from 'axios';



export const load_user=()=>async dispatch=>{
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':`JWT ${localStorage.getItem('access')}`,
                'Accept':'application/json'
            }
        }
        try{
            const res=await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`,config)
            dispatch({
                type:USER_LOADED_SUCCESS,
                payload:res.data
            })
        }
        catch(e){
            dispatch({
                type:USER_LOADED_FAIL,
            })
        }
    }else{
        dispatch({
            type:USER_LOADED_FAIL,
        })
    }
}

export const googleAuthentication=(state,code)=>async dispatch=>{
    if(state && code && !localStorage.getItem('access')){
        const config={
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                // 'Cookie':'sessionid=qq5ftg2qxgq1f39xpb8gkmvyueufgg6d'
            },
            redirect: 'follow',
        }
        const details={
            'state':state,
            'code':code
        }
        var urlencoded = new URLSearchParams()
         urlencoded.append('code', code)
        urlencoded.append('state', state)
        const formBody=Object.keys(details).map(key=>encodeURIComponent(key)+"="+encodeURIComponent(details[key])).join('&')
        try{
            const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`,config)
            // const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/`,urlencoded,config)
            console.log(res)
            dispatch({
                type:GOOGLE_AUTH_SUCCESS,
                payload:res.data
            })
            dispatch(load_user())
        }
        catch(error){
            console.log(error)
            dispatch({
                type:GOOGLE_AUTH_FAIL
            })
        }
    }
}
export const facebookAuthentication=(state,code)=>async dispatch=>{
    if(state && code && !localStorage.getItem('access')){
        const config={
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
              
            },
            redirect: 'follow',
        }
        const details={
            'state':state,
            'code':code
        }
        var urlencoded = new URLSearchParams()
         urlencoded.append('code', code)
        urlencoded.append('state', state)
        const formBody=Object.keys(details).map(key=>encodeURIComponent(key)+"="+encodeURIComponent(details[key])).join('&')
        try{
            const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`,config)
            // const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/`,urlencoded,config)
            console.log(res)
            dispatch({
                type:FACEBOOK_AUTH_SUCCESS,
                payload:res.data
            })
            dispatch(load_user())
        }
        catch(error){
            console.log(error)
            dispatch({
                type:FACEBOOK_AUTH_FAIL
            })
        }
    }
}


export const checkAuthenticated=()=>async dispatch=>{
        if(localStorage.getItem('access')){
            const config={
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            }
            const body=JSON.stringify({token:localStorage.getItem('access')})
       
        try{
        const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,body,config)


            if(res.data.code!=="token_not_valid"){
                dispatch({
                    type:AUTHENTICATED_SUCCESS
                })
            }else{
                dispatch({
                    type:AUTHENTICATED_FAIL
                })
            }
        }catch(err){
            dispatch({
                type:AUTHENTICATED_FAIL
            })
        }
    }else{
        dispatch({
            type:AUTHENTICATED_FAIL
        })
    }
}



export const login=(email,password)=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    };
    const body=JSON.stringify({email,password})
    try{
        const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(load_user())
    }
    catch(e){
        dispatch({
            type:LOGIN_FAIL,
        })
    }
}

export const signup=(first_name,last_name,email,password,re_password)=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*'
          
        }
    };
 
    
    const body=JSON.stringify({first_name,last_name,email,password,re_password})
    console.log(body)

    try{
        const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`,body,config)
        dispatch({
            type:SIGNUP_SUCCESS,
            payload:res.data
        })
      
    }
    catch(e){
        dispatch({
            type:SIGNUP_FAIL,
        })
    }
}

export const verify=(uid,token)=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*'
           
        }
    };
    const body=JSON.stringify({uid,token})
    try{
       await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`,body,config)
        dispatch({
            type:ACTIVATION_SUCCESS,
        
        })
      
    }
    catch(e){
        console.log(e)
        dispatch({
            type:ACTIVATION_FAIL,
        })
    }
}


export const reset_password=(email)=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({email})
    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,body,config)
        dispatch({
            type:PASSWORD_RESET_SUCCESS
        })

    }catch(err){
        dispatch({
            type:PASSWORD_RESET_FAIL
        })
    }
}

export const reset_password_confirm=(uid,token,new_password,re_new_password)=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body=JSON.stringify({uid,token,new_password,re_new_password})
    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,body,config)
        dispatch({
            type:PASSWORD_RESET_CONFIRM_SUCCESS
        })

    }
    catch(err){
        dispatch({
            type:PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}

export const logout=()=>dispatch=>{
    dispatch({
        type:LOGOUT
    })
}