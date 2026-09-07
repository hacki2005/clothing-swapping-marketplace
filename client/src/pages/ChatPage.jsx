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

  const getSenderName = (senderId) => mockUsers.find((u) => u.id === senderId)?.name || "Unknown";

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: `m${Date.now()}`,
        swapId,
        senderId: currentUser.id,
        text: newMessage,
        timestamp: new Date().toISOString(),
      },
    ]);
    setNewMessage("");
  };

  if (!swap) {
    return <div className="p-6 text-[#23231F]">Swap conversation not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <p className="text-xs uppercase tracking-widest text-[#B5592F] font-medium mb-2">
        Negotiation
      </p>
      <h1 className="font-['Fraunces'] text-2xl font-semibold text-[#23231F] mb-6">
        Work out the details
      </h1>

      <div
        className="bg-white rounded-2xl shadow-lg p-5 mb-4 h-96 overflow-y-auto flex flex-col gap-3"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 ? (
          <p className="text-[#7A7264] text-sm">No messages yet. Say hello!</p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                  isMe
                    ? "bg-[#23231F] text-[#F6F1E4] self-end rounded-br-sm"
                    : "bg-[#F6F1E4] text-[#23231F] self-start rounded-bl-sm"
                }`}
              >
                <p className="text-xs opacity-70 mb-1">{getSenderName(msg.senderId)}</p>
                {msg.text}
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <label htmlFor="chatMessage" className="sr-only">Type a message</label>
        <input
          id="chatMessage"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-[#E5DFCF] bg-white rounded-full px-4 min-h-[44px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B5592F] transition-all"
        />
        <button
          type="submit"
          className="shine-btn bg-[#23231F] text-[#F6F1E4] px-6 min-h-[44px] rounded-full font-medium shadow-sm hover:shadow-md hover:bg-[#B5592F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B5592F] transition-all"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPage;