// components/CustomModal.jsx
import React, { useEffect, useRef } from "react";
import { FaTimes,FaInfo } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

const NewChatModal = ({ isOpen, onClose,
  chatBox,
    newContact,
    phoneBooks,
    newGroup,
    users,
    community,
    newEcoChat,
  newConversation

 }) => {
  const backdropRef = useRef();

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-end  justify-center bg-black bg-opacity-50 py-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={onClose}
            >
              <FaTimes />
            </button>
                <div
                          className="newChat flex items-center gap-4 my-2 w-full cursor-pointer"
                          onClick={newConversation}
                        >
                          <div>
                            <img src={chatBox} alt="" width={30} height={40} />
                          </div>
                          <div className="flex flex-col font-bold hover:bg-gray-100 w-full  hover:transition-all duration-700 ease-in-out transform ">
                            <h4>Chat with your friends</h4>
                            <p>Start a new conversation</p>
                          </div>
            
                          <div className="info rounded-full bg-black p-0.5 items-center flex justify-center">
                            <FaInfo className="text-sm size-3 text-white" />
                          </div>
                        </div>
                        <hr />
                        <div
                          className="newContact flex items-center gap-4 my-2 cursor-pointer"
                          onClick={newContact}
                        >
                          <div>
                            <img src={phoneBooks} alt="" width={30} />
                          </div>
                          <div className="flex flex-col font-bold hover:bg-gray-100 w-full hover:transition-all duration-700 ease-in-out transform ">
                            <h4>Contact your friends</h4>
                            <p>Add a new contact</p>
                          </div>
                        </div>
                        <hr />
                        <div
                          className="newGroup flex items-center gap-4 my-2 cursor-pointer"
                          onClick={newGroup}
                        >
                          <div>
                            <img src={users} alt="" width={30} />
                          </div>
                          <div className="flex flex-col font-bold hover:bg-gray-100 w-full hover:transition-all duration-700 ease-in-out transform ">
                            <h4>Create a group</h4>
                            <p>Start a new group chat</p>
                          </div>
                        </div>
                        <hr />
                        <div className="newCommunity flex items-center gap-4 my-2 cursor-pointer">
                          <div>
                            <img src={community} alt="" width={30} />
                          </div>
                          <div
                            className="flex flex-col font-bold hover:bg-gray-100 w-full hover:transition-all duration-700 ease-in-out transform"
                            onClick={newEcoChat}
                          >
                            <h4>Create an Eco-Chat</h4>
                            <p>Start an Eco-Chat</p>
                          </div>
            
                          {/* modal */}
                        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewChatModal;
