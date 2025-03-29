import { useEffect, useState } from "react";
import MessageComponent from "./MessageComponent";
import api from "../utlis/axios.Config";

export interface MessagesProps {
    id: string;
    name?: string;
    config?: string;
    data?: string;
    created_at?: string;
    timestamp?: string;
    source?: string;
    isRead: boolean;
}

const Messages = () => {
    const [messages, setMessages] = useState<MessagesProps[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<MessagesProps[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>("all");

    // Fetch messages from API
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get('http://localhost:3000/api/messages');
                console.log("Dane z backendu:", response.data);

                const formattedMessages = response.data.map((item: any) => ({
                    id: item.id,
                    name: item.name || "",
                    config: item.config || "",
                    data: item.data || "",
                    created_at: item.created_at || "",
                    timestamp: item.timestamp || "",
                    source: item.source || "Unknown",
                    isRead: Boolean(item.isRead)  // <-- Poprawiony typ
                }));
                console.log("Formatted messages:", formattedMessages);
                setMessages(formattedMessages);
                setFilteredMessages(formattedMessages); // <-- Ustaw filtr na początku
            } catch (error) {
                console.error("Error with fetching messages", error);
            }
        };
        fetchMessages();
    }, []);

    // Filtrowanie wiadomości na podstawie aktywnego filtra
    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredMessages(messages);
        } else if (activeFilter === "read") {
            setFilteredMessages(messages.filter((msg) => msg.isRead));
        } else if (activeFilter === "unread") {
            setFilteredMessages(messages.filter((msg) => !msg.isRead));
        }
    }, [messages, activeFilter]);

    return (
        <div className="relative text-white w-full h-full flex flex-col justify-start gap-8 p-8 rounded-xl shadow-md opacity-0 animate-slide-up">
            <h1 className="text-3xl font-bold">Messages</h1>
            <div className="bg-gray-700 h-4/5 w-full rounded-xl shadow-lg">
                <div className="flex justify-evenly gap-6 bg-gray-600 text-semibold text-white text-xl rounded-t-xl p-4">
                    <button
                        className={`px-6 py-3 rounded-lg ${activeFilter === "all" ? "bg-blue-600" : "bg-gray-800"} hover:bg-gray-700 transition duration-300 cursor-pointer`}
                        onClick={() => setActiveFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={`px-6 py-3 rounded-lg ${activeFilter === "read" ? "bg-blue-600" : "bg-gray-800"} hover:bg-gray-700 transition duration-300 cursor-pointer`}
                        onClick={() => setActiveFilter("read")}
                    >
                        Read
                    </button>
                    <button
                        className={`px-6 py-3 rounded-lg ${activeFilter === "unread" ? "bg-blue-600" : "bg-gray-800"} hover:bg-gray-700 transition duration-300 cursor-pointer`}
                        onClick={() => setActiveFilter("unread")}
                    >
                        Unread
                    </button>
                </div>
                <div className="p-4 h-[calc(100%-80px)] overflow-y-auto">
                    {filteredMessages.length === 0 ? (
                        <p className="text-gray-400">Brak wiadomości do wyświetlenia</p>
                    ) : (
                        filteredMessages.map((message, index) => (
                            <MessageComponent 
                                key={index}
                                {...message}
                                setMessages={setMessages}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Messages;

