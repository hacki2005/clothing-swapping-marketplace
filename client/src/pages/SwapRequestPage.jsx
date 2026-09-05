import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockListings, mockSwapRequests } from "../data/mockData";
import { useAuth } from "../context/useAuth";

function SwapRequestPage() {
  const { itemId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [selectedItemId, setSelectedItemId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newSwapId, setNewSwapId] = useState(null);

  const requestedItem = mockListings.find((item) => item.id === itemId);

  const myItems = mockListings.filter(
    (item) => item.ownerId === currentUser.id && item.id !== itemId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedItemId) return;

    const id = `s${Date.now()}`;

    const newSwap = {
      id,
      fromUserId: currentUser.id,
      toUserId: requestedItem.ownerId,
      offeredItemId: selectedItemId,
      requestedItemId: itemId,
      status: "pending",
    };

    mockSwapRequests.push(newSwap);
    setNewSwapId(id);
    setSubmitted(true);
  };

  if (!requestedItem) {
    return <div className="p-6">Item not found.</div>;
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-2">Swap Request Sent!</h2>
        <p className="text-gray-600 mb-4">
          Your request for {requestedItem.brand} {requestedItem.type} has been sent.
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => navigate(`/chat/${newSwapId}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Chat
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">
        Request Swap for {requestedItem.brand} {requestedItem.type}
      </h1>

      {myItems.length === 0 ? (
        <p className="text-gray-500">
          You don't have any listings to offer. Add a listing first.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">
            Choose an item to offer:
          </label>
          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="border rounded px-3 py-2"
            required
          >
            <option value="">-- Select your item --</option>
            {myItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.brand} {item.type} (₹{item.estimatedValue})
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Swap Request
          </button>
        </form>
      )}
    </div>
  );
}

export default SwapRequestPage;