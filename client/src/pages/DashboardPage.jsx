import { Link } from "react-router-dom";
import { mockListings, mockSwapRequests, mockUsers } from "../data/mockData";
import { useAuth } from "../context/useAuth";

function DashboardPage() {
  const { currentUser } = useAuth();

  const myListings = mockListings.filter(
    (item) => item.ownerId === currentUser.id
  );

  const sentRequests = mockSwapRequests.filter(
    (s) => s.fromUserId === currentUser.id
  );

  const receivedRequests = mockSwapRequests.filter(
    (s) => s.toUserId === currentUser.id
  );

  const getUserName = (userId) => {
    const user = mockUsers.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const getItemName = (itemId) => {
    const item = mockListings.find((i) => i.id === itemId);
    return item ? `${item.brand} ${item.type}` : "Unknown item";
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {currentUser.name}
      </h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">My Listings</h2>
        {myListings.length === 0 ? (
          <p className="text-gray-500 text-sm">You haven't listed any items yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {myListings.map((item) => (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.type}
                  className="w-full h-28 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium">{item.brand} {item.type}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Swap Requests I Sent</h2>
        {sentRequests.length === 0 ? (
          <p className="text-gray-500 text-sm">You haven't sent any swap requests.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {sentRequests.map((swap) => (
              <div
                key={swap.id}
                className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm">
                    You offered <strong>{getItemName(swap.offeredItemId)}</strong> for{" "}
                    <strong>{getItemName(swap.requestedItemId)}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    To: {getUserName(swap.toUserId)} · Status: {swap.status}
                  </p>
                </div>
                <Link
                  to={`/chat/${swap.id}`}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Open Chat
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Swap Requests Received</h2>
        {receivedRequests.length === 0 ? (
          <p className="text-gray-500 text-sm">No one has requested a swap yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {receivedRequests.map((swap) => (
              <div
                key={swap.id}
                className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm">
                    <strong>{getUserName(swap.fromUserId)}</strong> offered{" "}
                    <strong>{getItemName(swap.offeredItemId)}</strong> for your{" "}
                    <strong>{getItemName(swap.requestedItemId)}</strong>
                  </p>
                  <p className="text-xs text-gray-500">Status: {swap.status}</p>
                </div>
                <Link
                  to={`/chat/${swap.id}`}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Open Chat
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;