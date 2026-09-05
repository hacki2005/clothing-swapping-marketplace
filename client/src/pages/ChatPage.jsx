import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockMessages, mockUsers, mockSwapRequests } from "../data/mockData";
import { useAuth } from "../context/useAuth";

function ChatPage() {
  const { swapId } = useParams();
  const { currentUser } = useAuth();

  const swap = mockSwapRequests.find((s) => s.id === swapId);

  const [messages, setMessages] = useState(
    mockMessages.filter((m) => m.swapId === swapId)
  );
  const [newMessage, setNewMessage] = useState("");

  const getSenderName = (senderId) => {
    const user = mockUsers.find((u) => u.id === senderId);
    return user ? user.name : "Unknown";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: `m${Date.now()}`,
      swapId,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  if (!swap) {
    return <div className="p-6">Swap conversation not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Swap Negotiation Chat</h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-4 h-96 overflow-y-auto flex flex-col gap-3">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm">No messages yet. Say hello!</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  isMe
                    ? "bg-blue-600 text-white self-end"
                    : "bg-gray-100 text-gray-800 self-start"
                }`}
              >
                <p className="text-xs opacity-70 mb-1">
                  {getSenderName(msg.senderId)}
                </p>
                {msg.text}
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPage;