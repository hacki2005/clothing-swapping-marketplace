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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSwapId, setNewSwapId] = useState(null);

  const requestedItem = mockListings.find((item) => item.id === itemId);
  const myItems = mockListings.filter(
    (item) => item.ownerId === currentUser.id && item.id !== itemId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedItemId) return;
    setIsSubmitting(true);
    const id = `s${Date.now()}`;
    setTimeout(() => {
      mockSwapRequests.push({
        id,
        fromUserId: currentUser.id,
        toUserId: requestedItem.ownerId,
        offeredItemId: selectedItemId,
        requestedItemId: itemId,
        status: "pending",
      });
      setNewSwapId(id);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 300);
  };

  if (!requestedItem) {
    return <div className="p-6 text-[#23231F]">Item not found.</div>;
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg text-center" role="status">
        <p className="text-xs uppercase tracking-widest text-[#B5592F] font-medium mb-2">
          Request sent
        </p>
        <h2 className="font-['Fraunces'] text-2xl font-semibold text-[#23231F] mb-3">
          It's on its way
        </h2>
        <p className="text-[#7A7264] mb-6">
          Your request for {requestedItem.brand} {requestedItem.type} has been sent.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(`/chat/${newSwapId}`)}
            className="shine-btn bg-[#23231F] text-[#F6F1E4] px-5 min-h-[44px] rounded-full font-medium shadow-sm hover:shadow-md hover:bg-[#B5592F] transition-all"
          >
            Go to Chat
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white border border-[#E5DFCF] text-[#23231F] px-5 min-h-[44px] rounded-full font-medium shadow-sm hover:shadow-md transition-all"
          >
            Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <p className="text-xs uppercase tracking-widest text-[#B5592F] font-medium mb-2">
        Propose a swap
      </p>
      <h1 className="font-['Fraunces'] text-2xl font-semibold text-[#23231F] mb-6">
        For {requestedItem.brand} {requestedItem.type}
      </h1>

      {myItems.length === 0 ? (
        <p className="text-[#7A7264] text-sm">
          You don't have any listings to offer. Add a listing first.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="offerItem" className="block text-xs uppercase tracking-wide text-[#7A7264] mb-1.5">
              Choose an item to offer
            </label>
            <select
              id="offerItem"
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              disabled={isSubmitting}
              className="w-full border border-[#E5DFCF] bg-[#FBF9F3] rounded-xl px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#B5592F] focus:border-transparent transition-all disabled:opacity-50"
              required
            >
              <option value="">-- Select your item --</option>
              {myItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.brand} {item.type} (₹{item.estimatedValue})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="shine-btn bg-[#23231F] text-[#F6F1E4] py-3 min-h-[44px] rounded-xl font-medium shadow-sm hover:shadow-md hover:bg-[#B5592F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B5592F] transition-all disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Swap Request"}
          </button>
        </form>
      )}
    </div>
  );
}

export default SwapRequestPage;