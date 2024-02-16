import React, { useState } from "react";
import "../components/css/AdminLogin.css"

const AdminLogin = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
        
    const onButtonClick = () => {

      // Set initial error values to empty
      setEmailError("")
      setPasswordError("")

      // Check if the user has entered both fields correctly
      if ("" === email) {
          setEmailError("Please enter your email")
          return
      }

      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          setEmailError("Please enter a valid email")
          return
      }

      if ("" === password) {
          setPasswordError("Please enter a password")
          return
      }

      if (password.length < 7) {
          setPasswordError("The password must be 8 characters or longer")
          return
      }

      // Authentication calls will be made here...       

  }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <img src="/logo2.png" alt="School Logo" className="logo" />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>

        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your p assword here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>

        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>
}

export default AdminLogin