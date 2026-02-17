import React, { useEffect, useState, useRef } from "react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(true);
  return (
    <div className={`chat-widget-container ${isOpen ? "open" : ""}`}>
      ChatWidget
    </div>
  );
};

export default ChatWidget;
