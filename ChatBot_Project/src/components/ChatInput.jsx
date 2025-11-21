import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './Chatinput.css';


export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');
    // Update controlled input state
    function saveInputText(event) {
        setInputText(event.target.value);
    }

    // Send current input: add user message, get bot reply, clear input
    function sendMessage() {
        // Append user message to the list
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];
        setChatMessages(newChatMessages);

        // Generate bot response and append it
        const response = Chatbot.getResponse(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        // Reset input field
        setInputText('');
    }
    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                className='chat-input'
            />
            <button
                onClick={sendMessage}
                className="send-button"
            >Send</button>
        </div>
    );
}
