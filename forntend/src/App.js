import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Activate from './containers/Activate'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'
import Layout from './hocs/Layout'



function App() {
  return (

      
   



      <Layout>
    <Routes>
 
    <Route path="/"  element={<Home />} />
       <Route path="/login" element={<Login/>} />
       <Route path="/signup" element={<Signup/>} />
       <Route path="/reset_password" element={<ResetPassword/>} />
       <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
       <Route path="/activate/:uid/:token" element={<Activate/>} />
    </Routes>  
    </Layout>


  );
}

export default App;
