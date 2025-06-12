import React, { useEffect, useRef } from "react";

const UserLogoutModal = ({ ConfirmLogout, setIsLogout,isLogout }) => {
  const backdropRef = useRef();
  useEffect(() => {
    if (!isLogout) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsLogout(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setIsLogout, isLogout]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      setIsLogout(false);
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 text-black shadow-lg"
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Logout</h2>
        <p className="mb-4 ">Are you sure you want to logout?</p>
        <div className="flex justify-end space-x-4">
          <button
            ref={backdropRef}
      onClick={setIsLogout(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={ConfirmLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogoutModal;
