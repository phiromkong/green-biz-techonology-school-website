import React from "react";
import './AdminLogin.css'

export const AdminLogin = () => {
  return (
    <div className="admin-login">
      <div className="div">
        <div className="group">
          <div className="overlap-group">
            <img className="polygon" alt="Polygon" src="polygon.svg" />
            <img className="img" alt="Polygon" src="image.svg" />
          </div>
        </div>
        <div className="overlap">
          <div className="rectangle" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <div className="text-wrapper">Email address</div>
          <div className="text-wrapper-2">Password</div>
          <div className="text-wrapper-3">Sign in</div>
          <div className="text-wrapper-4">Return to Homepage</div>
          <img className="lock" alt="Lock" src="lock.svg" />
          <img className="mail" alt="Mail" src="mail.svg" />
          <div className="text-wrapper-5">សាលាបច្ចេកវិទ្យា ហ្រ្គីនប៊ីស</div>
        </div>
        <div className="text-wrapper-6">Green Biz Technology School</div>
      </div>
    </div>
  );
};


export default AdminLogin;
