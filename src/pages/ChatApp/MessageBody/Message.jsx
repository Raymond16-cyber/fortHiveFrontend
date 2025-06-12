import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import defaultUserImage from "../../../assets/defaultUser.png";
import "../../../css/ChatApp/Message.css";
import moment from "moment";

const MessageBody = ({
  currentFriend,
  messages,
  friendImage,
  friendName,
  friends,
  friendProfileDetails,
  friendID
}) => {
  const [clipBoardMessage, setClipBoardMessage] = useState("");

  const messageEndRef = useRef(null);
  const { myInfo } = useSelector((state) => state.auth);
  console.log("messages to check", messages);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log("from message body", messages);

  // Group messages by date
  const groupedMessages = messages?.reduce((acc, msg) => {
    const date = new Date(msg.createdAt).toDateString();
    acc[date] = acc[date] || [];
    acc[date].push(msg);
    return acc;
  }, {});

  const Copy = (clipBoardMessage) => {
    navigator.clipboard.writeText(
      `You: ${clipBoardMessage.target.innerHTML}bruv`
    );
    console.log("clipboard message", clipBoardMessage);
  };

  return (
    <div className="messageBodyScroll flex-1 overflow-y-auto px-4 py-2 space-y-8 h-[calc(100vh-150px)] gap-2 w-full bg-white">
      {messages && messages.length > 0 ? (
        groupedMessages &&
        Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="text-center text-sm text-gray-500 my-4">{date}</div>
            {msgs.map((message, index) =>
              message.senderID === myInfo.id ? (
                <div
                  key={message._id || index}
                  className="myMessages flex flex-col items-end my-2"
                >
                  {message?.message?.text === "" ? (
                    <div className="py-2 px-4 rounded-t-2xl  max-w-xs bg-slate-400 border w-40 h-40">
                      <img
                        src={`/userSentImages/${message?.message?.image}`}
                        alt=".png"
                        className=" h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="Texts bg-black text-white py-2 px-4 rounded-t-2xl rounded-bl-2xl max-w-xs">
                      <p
                        className="messagetext"
                        onCopy={Copy}
                        onClick={(e) => setClipBoardMessage(e.target.value)}
                      >
                        {" "}
                        {message?.message?.text}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={message._id || index}
                  className="friendMessage flex flex-col items-start"
                >
                  <div
                    className="flex items-start gap-2
                  "
                  >
                    <div className="image w-9 h-9 rounded-full overflow-hidden border-2 border-black ">
                      <img
                        src={
                          friendProfileDetails?._id === friendID &&
                          friendProfileDetails.image
                            ? `/userProfilePic/${friendProfileDetails.image}`
                            : friendImage
                            ? `/userProfilePic/${friendImage}`
                            : defaultUserImage
                        }
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="bg-gray-200 text-black py-2 px-4 rounded-t-2xl rounded-br-2xl max-w-xs my-2">
                      {message?.message?.text === "" ? (
                        <div className="py-2 px-4 rounded-t-2xl  max-w-xs bg-slate-400 border  w-40 h-40">
                          <img
                            src={`/userSentImages/${message?.message?.image}`}
                            alt=".png"
                            className=" h-full w-full object-center"
                          />
                        </div>
                      ) : (
                        <p className="messagetext"> {message?.message?.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ))
      ) : (
        <div className="bg-white items-center justify-center flex flex-col w-full gap-1">
          <div className="w-fit bg-slate-100">
            <p className="text-sm">
              You connected with {friendName},{" "}
              {moment(currentFriend?.createdAt).startOf("minute").fromNow()}
            </p>
          </div>
          <div className="w-fit bg-slate-100 p-3">
            <p className="text-sm">
              You dont have any message yet,send a message to begin a chat with{" "}
              {friendName}
            </p>
          </div>
        </div>
      )}

      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageBody;
