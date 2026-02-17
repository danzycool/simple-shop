import React, { useEffect, useState, useRef } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(true);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chat-widget-container ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <>
          <div className="chat-header">
            <div className="chat-title">
              <FaRobot />
              <h3>Shop Assistant</h3>
            </div>

            <button className="close-button" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => {
              <div key={index}>
                <div
                  className={`message ${message.isAgent ? "message-bot" : "message-user"}`}
                >
                  {message.text}
                </div>
              </div>;
            })}

            <div ref={messageEndRef} />
          </div>
        </>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default ChatWidget;
