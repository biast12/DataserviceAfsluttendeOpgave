import React from "react";
import "./ErrorPages.scss";

const ErrorPages = ({ statusCode }) => {
  let errorMessage;

  switch (statusCode) {
    case 404:
      errorMessage = "Page Not Found";
      break;
    case 500:
      errorMessage = "Server Error";
      break;
    default:
      errorMessage = "Unknown Error";
      break;
  }

  return <h1 className="Error">{`${errorMessage} - ${statusCode}`}</h1>;
};

export default ErrorPages;
