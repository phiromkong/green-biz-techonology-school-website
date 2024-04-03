import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet, HelmetProvider } from 'react-helmet-async';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Green Biz Technology School- Journey Towards Modern Technology</title>
        <meta
          name="description"
          content="Welcome to Green Biz Technology School. Green Biz Technology School, or GBT School, offers a wide range of courses and partnerships to enhance your learning experience."
        />;
        <meta property="og:image" content="https://gbtschool.org/gbt_logo" />
        <meta property="og:url" content="https://gbtschool.org" />
        <meta property="og:site_name" content="Green Biz Technology School" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="../gbt_logo.png" />
      </Helmet>
    <App />
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


