import { useState } from "react";
import { ChatMessage, Department } from "@/types/chat";
import { mockDepartments, initialMessagesByDepartment } from "./ChatState";

export function useChatState() {
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>();
  const [showIntro, setShowIntro] = useState(true);
  const [currentDepartment, setCurrentDepartment] = useState<Department>(mockDepartments[0]);
  const [messagesByDepartment, setMessagesByDepartment] = useState(initialMessagesByDepartment);

  const handleSendMessage = (content: string) => {
    if (!selectedContactId) return;

    const formattedContent = `[${currentDepartment.name}] ${content}`;
    
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: formattedContent,
      sender: "user",
      timestamp: new Date().toISOString(),
      type: "text"
    };

    setMessagesByDepartment(prevMessages => {
      const departmentMessages = prevMessages[currentDepartment.id] || {};
      const contactMessages = departmentMessages[selectedContactId] || [];
      
      return {
        ...prevMessages,
        [currentDepartment.id]: {
          ...departmentMessages,
          [selectedContactId]: [...contactMessages, newMessage]
        }
      };
    });

    console.log("Mensagem enviada:", formattedContent);
  };

  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
    setShowIntro(false);
  };

  const handleDepartmentChange = (departmentId: string) => {
    const department = mockDepartments.find(d => d.id === departmentId);
    if (department) {
      setCurrentDepartment(department);
      setSelectedContactId(undefined);
      setShowIntro(true);
    }
  };

  return {
    selectedContactId,
    showIntro,
    currentDepartment,
    messagesByDepartment,
    handleSendMessage,
    handleContactSelect,
    handleDepartmentChange,
  };
}