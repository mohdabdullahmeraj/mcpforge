"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Message {
    id: number;
    message: string;
    created_at: string;
}

export default function TestMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("test_messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching messages:", error);
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    };

    const handleInsert = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const { error } = await supabase
            .from("test_messages")
            .insert([{ message: newMessage }]);

        if (error) {
            console.error("Error inserting message:", error.message, error.details, error.hint, error);
            alert(`Error inserting: ${error.message}`);
        } else {
            setNewMessage("");
            fetchMessages();
            // Alternatively, optimism update the list here
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
                <h1 className="text-2xl font-bold text-neutral-900 mb-8 tracking-tight">Messages</h1>

                <form onSubmit={handleInsert} className="flex gap-3 mb-8">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-neutral-900 placeholder:text-neutral-400 transition-shadow"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all"
                    >
                        Post
                    </button>
                </form>

                <div className="space-y-3">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-pulse flex space-x-2">
                                <div className="h-2 w-2 bg-neutral-400 rounded-full"></div>
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animation-delay-200"></div>
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animation-delay-400"></div>
                            </div>
                        </div>
                    ) : messages.length === 0 ? (
                        <p className="text-neutral-500 text-center py-8 bg-neutral-50 rounded-lg border border-neutral-100 border-dashed">
                            No messages yet. Be the first to post!
                        </p>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className="p-4 bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors shadow-sm">
                                <p className="text-neutral-800 text-base">{msg.message}</p>
                                <p className="text-xs text-neutral-400 mt-2 font-medium">
                                    {new Date(msg.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
