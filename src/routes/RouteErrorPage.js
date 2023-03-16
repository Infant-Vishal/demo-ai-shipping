import React from "react";
import "../styles/routes/RouteErrorPage.css"

const RouteErrorPage = () => {
  return (
    <div className="err-url-image-container">
      <img src={require("../assets/images/error_404.jpg")}/>
    </div>
  );
};

export default RouteErrorPage;
