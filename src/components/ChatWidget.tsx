import React, { useEffect, useState, useRef } from "react";
import { FaCommentDots, FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import type { Message } from "../lib/types";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [threadId, setThreadId] = useState(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const PORT = import.meta.env.VITE_PORT || 3000;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessages = [
        {
          text: "Hello! I'm your shop assistant. How can I help you today?",
          isAgent: true,
        },
      ];
      setMessages(initialMessages);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  console.log(messages); ///////////////////////////////////////

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputValue); ///////////////////////////////////
    if (inputValue.trim() === "") return;

    const newMessage: Message = {
      text: inputValue,
      isAgent: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    const endpoint = threadId
      ? `http://localhost:${PORT}/chat/${threadId}`
      : `http://localhost:${PORT}/chat`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Success: ${data}`); ///////////////////////////////////////

      const agentResponse: Message = {
        text: data.response,
        isAgent: true,
        threadId: data.threadId,
      };

      setMessages((prev) => [...prev, agentResponse]);
      setThreadId(data.threadId);
      console.log(messages); ///////////////////////////////////////
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`message ${message.isAgent ? "message-bot" : "message-user"}`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            <div ref={messageEndRef} />
          </div>
          <form className="chat-input-container" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="send-button"
              type="submit"
              disabled={inputValue.trim() === ""}
            >
              <FaPaperPlane size={16} />
            </button>
          </form>
        </>
      ) : (
        <button className="chat-button" onClick={toggleChat}>
          <FaCommentDots />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
