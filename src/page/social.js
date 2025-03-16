import React, { useEffect } from 'react'
import {refreshAccessToken} from '../api/authApi'

function Social() {
  useEffect(()=>{
    console.log("소셜성공")

    if (window.location.pathname === "/social-login-success"){
      console.log("찾앗다")
      refreshAccessToken()

    }
  },[]);
  return (
    <div>social</div>
  )
}

export default Social