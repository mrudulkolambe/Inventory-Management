import React, { useEffect, useRef } from 'react'

const Alert = ({ flag, message, messageSetter, type }) => {
  const alert_dom = useRef()

  useEffect(() => {
    if (flag) {
      const animate_alert = () => {
        alert_dom.current.classList.add("show_alert");
        const timeOut = setTimeout(() => {
          alert_dom.current.classList.remove("show_alert");
          messageSetter("");
          clearTimeout(timeOut);
        }, 3000);
      };
      return () => {
        animate_alert();
      };
    }
  }, [flag]);


  return (
    <div
      id="alert-1"
      ref={alert_dom}
      className={type === "blue" ? "zindex2000 bg-blue-100 absolute alert_pos flex p-4 mb-4 rounded-lg w-1/3 m-auto" : type === "red" ? "zindex2000 bg-red-100 absolute alert_pos flex p-4 mb-4 rounded-lg w-1/3 m-auto" : ""}
      role="alert"
    >
      <svg
        className={type === "blue" ? "flex-shrink-0 w-5 h-5 text-blue-700 " : type === "red" ? "flex-shrink-0 w-5 h-5 text-red-700 " : ""}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className={type === "blue" ? "ml-3 text-sm font-medium text-blue-700" : type === "red" ? "ml-3 text-sm font-medium text-red-700" : ""}>
        {message}
      </div>
    </div>
  )
}

export default Alert