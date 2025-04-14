import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import axios from "axios";
import "./styles.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

window.Pusher = Pusher;

const currentUserId = parseInt(localStorage.getItem("user_id")); // Store this at login

window.Echo = new Echo({
    broadcaster: 'reverb',
    key:'utrx4af59s2spcmvjykv',
    wsHost: 'localhost',
    wsPort: 8080,
    forceTLS: false,
    encrypted: false,
    enabledTransports: ['ws'],
    authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
    auth:{
        headers:{
            authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }

});

const ChatPage = () => {
    const navigate=useNavigate()
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    useEffect(() => {
        window.Echo.connector.pusher.connection.bind('connected', () => {
            console.log("Connected to WebSocket!");
        });
        window.Echo.channel("PublicChannel")
                .listen("PublicChannelEvent", (e) => {
                    console.log(e)
                    setMessages(prev => [...prev, {message:e.message,sender:{id:e.user_id,name:e.name}}]);
                });
    },[])
    


    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        await axios.post("http://127.0.0.1:8000/api/v0.1/test", {
            message: newMessage,
            user_id: currentUserId,
            first_name: localStorage.getItem("name"),
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("we sent: "+newMessage)
        setNewMessage("");
    };

    return (
        <>
        <button className="add-button" onClick={() => navigate('/home')}>
            Gallery
          </button>
        <div className="chat-container">
            <div className="chatBox">
                {messages.map((msg, i) => {
                    const isMe = msg.sender.id === currentUserId;
                    return (
                        <div
                            key={i}
                            className={`message ${isMe ? "message-me" : "message-other"}`}
                        >
                            <div className="sender">{isMe?"Me":msg.sender.name}</div>
                            <div>{msg.message}</div>
                        </div>
                    );
                })}
            </div>

            <div className="inputRow">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="input"
                />
                <button onClick={sendMessage} className="sendButton">Send</button>
            </div>
        </div>
        </>
    );
};

export default ChatPage;
