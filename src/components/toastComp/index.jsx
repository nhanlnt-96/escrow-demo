import React, { useEffect, useState } from "react";

const ToastNotification = ({
  errorMsg,
  setErrorMsg,
  isNotHide = false,
  toastFor = "warning",
}) => {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (errorMsg) {
      setShowToast(true);
      if (!isNotHide) {
        setTimeout(() => {
          setShowToast(false);
          setErrorMsg("");
        }, 2000);
      }
    }
  }, [errorMsg, isNotHide]);
  return (
    <>
      {showToast && (
        <div className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow right-2 bottom-2 fixed">
          {toastFor === "success" ? (
            <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-DEFAULT-500 bg-green-DEFAULT-200 rounded-lg">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
          ) : (
            <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-white bg-red-800 rounded-lg">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <div className="ml-3 text-sm font-normal">{errorMsg}</div>
        </div>
      )}
    </>
  );
};

export default ToastNotification;
