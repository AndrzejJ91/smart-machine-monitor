import React from 'react';
import api from '../utlis/axios.Config';

interface MessagesComponentProps {
    id: string;
    name?: string;
    config?: string;
    data?: string;
    created_at?: string;
    timestamp?: string;
    source?: string;
    isRead: boolean;  // Poprawka: zmiana na boolean
}

const MessageComponent: React.FC<MessagesComponentProps> = ({ name, config, data, created_at, timestamp, source, id, isRead }) => {

    const markAsRead = async () => {
        try {
            // Wysłanie statusu jako boolean
            const response = await api.put(`/messages/${source}/${id}/status`, { isRead: true });
            alert("Message marked as read");
            console.log("Response data:", response.data);
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
