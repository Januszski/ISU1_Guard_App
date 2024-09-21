"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, AlertCircle, X } from "lucide-react";
import React from "react";
import { deleteMessageByIdDb, getAllMessagesDb } from "repo/messagesRepo";

const MessageRow = ({ message, onClick }) => (
  <div
    className={`flex items-center space-x-4 p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors duration-150 cursor-pointer `}
    onClick={onClick}
  >
    <div className='flex-grow'>
      <div className='flex justify-between items-center mb-1'>
        <span className='text-sm font-semibold text-gray-300'>
          {message.sender}
        </span>
        <span className='text-xs text-gray-500'>{message.created_at}</span>
      </div>
      <div className='text-sm font-medium text-gray-200'>{message.subject}</div>
      <div className='text-sm text-gray-400 truncate'>{message.message}</div>
    </div>
  </div>
);

export default function Component() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      const result = await getAllMessagesDb();
      console.log("MESSAGES ", result);
      setMessages(result);
    } catch (err) {
      //setError("Error fetching cells: " + err.message);
    }
  };

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(fetchMessages, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const [messages1, setMessages2] = useState([
    {
      id: 1,
      sender: "Warden Smith",
      subject: "New Security Protocols",
      content:
        "Please review the updated security protocols for Cell Block D. These changes are effective immediately and all staff must be briefed before their next shift. Failure to comply will result in disciplinary action.",
      date: "10:30 AM",
      isUrgent: true,
    },
    {
      id: 2,
      sender: "Officer Johnson",
      subject: "Shift Change Request",
      content:
        "I would like to request a shift change for next week. I have a family emergency and need to switch to the day shift if possible. I've already spoken with Officer Davis who is willing to swap. Please let me know if this is approved.",
      date: "Yesterday",
      isUrgent: false,
    },
    {
      id: 3,
      sender: "Maintenance Dept.",
      subject: "Cell Block A Repairs",
      content:
        "The following repairs are scheduled for Cell Block A: \n1. Plumbing fixes in cells 101-105\n2. Electrical maintenance in the common area\n3. Reinforcement of cell doors 110 and 111\nPlease ensure all inmates are cleared from these areas during the specified times.",
      date: "2 days ago",
      isUrgent: false,
    },
    {
      id: 4,
      sender: "Medical Staff",
      subject: "Inmate Health Report",
      content:
        "Attached is the weekly health report for all inmates. Notable points:\n- Inmate #4352 requires immediate dental treatment\n- Inmate #1187 has been cleared to return to general population\n- New medication schedule for Inmate #2290\nPlease review and take necessary actions.",
      date: "3 days ago",
      isUrgent: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleDelete = async (id) => {
    setMessages(messages.filter((msg) => msg.messageId !== id));
    await deleteMessageByIdDb(id);
    if (selectedMessage?.messageId === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className='min-h-screen  bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-screen mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden'>
        <div className='bg-gray-700 p-4'>
          <h1 className='text-2xl font-bold text-gray-100'>
            Incoming Messages
          </h1>
        </div>
        <div className='flex h-[calc(100vh-200px)]'>
          <div className='w-1/2 overflow-y-auto border-r border-gray-700'>
            {messages.map((message) => (
              <MessageRow
                key={message.messageId}
                message={message}
                onClick={() => setSelectedMessage(message)}
              />
            ))}
            {messages.length === 0 && (
              <div className='p-8 text-center text-gray-500'>
                <Mail className='h-12 w-12 mx-auto mb-4' />
                <p>No messages in your inbox</p>
              </div>
            )}
          </div>
          <div className='w-1/2 p-4 bg-gray-800 overflow-y-auto'>
            {selectedMessage ? (
              <div>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <h2 className='text-xl font-bold text-gray-100'>
                      {selectedMessage.subject}
                    </h2>
                    <p className='text-sm text-gray-400'>
                      From: {selectedMessage.sender_name}
                    </p>
                    <p className='text-sm text-gray-400'>
                      {selectedMessage.created_at}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage.messageId)}
                    className='p-1 hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500'
                  >
                    <Trash2 className='h-5 w-5 text-gray-500 hover:text-red-500' />
                  </button>
                </div>
                <div className='text-gray-300 whitespace-pre-wrap'>
                  {selectedMessage.message}
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-center h-full text-gray-500'>
                <p>Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
