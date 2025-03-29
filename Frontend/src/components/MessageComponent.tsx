import React from 'react';
import api from '../utlis/axios.Config';
import { MessagesProps } from './Messages';

interface LocalMessagesComponentProps extends MessagesProps {
    setMessages: React.Dispatch<React.SetStateAction<MessagesProps[]>>;
}

const MessageComponent: React.FC<LocalMessagesComponentProps> = ({
    name,
    config,
    data,
    created_at,
    timestamp,
    source,
    id,
    isRead,
    setMessages
}) => {
    const markAsRead = async () => {
        try {
            await api.put(`/messages/${source}/${id}/status`, { isRead: true });

            // Aktualizacja stanu po kliknięciu
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === id ? { ...msg, isRead: true } : msg
                )
            );
        } catch (error) {
            console.error("Error marking message as read:", error);
        }
    }

    return (
        <div 
            className={`bg-gray-800 p-4 rounded-lg mb-2 ${isRead ? "opacity-50" : ""}`} 
            onClick={markAsRead}
            style={{ cursor: "pointer" }}
        >
            <h3 className="text-xl font-semibold">{source || "Message"} - {id}</h3>
            {name && <p><strong>Name:</strong> {name}</p>}
            {config && <p><strong>Config:</strong> {config}</p>}
            {data && <p><strong>Data:</strong> {data}</p>}
            {created_at && <p><strong>Created At:</strong> {created_at}</p>}
            {timestamp && <p><strong>Timestamp:</strong> {timestamp}</p>}
            <p><strong>Status:</strong> {isRead ? "Read" : "Unread"}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Mark as Read
            </button>
        </div>
    )
}

export default MessageComponent;
