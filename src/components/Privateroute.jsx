import React from 'react';
import { Navigate } from 'react-router-dom';


import {Outlet } from 'react-router-dom'

const Privateroute = () => {
  let auth = {'token':true}
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default Privateroute;
