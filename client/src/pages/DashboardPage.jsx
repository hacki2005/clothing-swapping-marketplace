import { Link } from "react-router-dom";
import { mockListings, mockSwapRequests, mockUsers } from "../data/mockData";
import { useAuth } from "../context/useAuth";

function DashboardPage() {
  const { currentUser } = useAuth();
  const myListings = mockListings.filter((item) => item.ownerId === currentUser.id);
  const sentRequests = mockSwapRequests.filter((s) => s.fromUserId === currentUser.id);
  const receivedRequests = mockSwapRequests.filter((s) => s.toUserId === currentUser.id);

  const getUserName = (userId) => mockUsers.find((u) => u.id === userId)?.name || "Unknown";
  const getItemName = (itemId) => {
    const item = mockListings.find((i) => i.id === itemId);
    return item ? `${item.brand} ${item.type}` : "Unknown item";
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <p className="text-xs uppercase tracking-widest text-[#B5592F] font-medium mb-2">
        Your account
      </p>
      <h1 className="font-['Fraunces'] text-4xl font-semibold text-[#23231F] mb-10">
        {currentUser.name}
      </h1>

      <section aria-label="My listings" className="mb-10">
        <h2 className="font-['Fraunces'] text-lg font-semibold text-[#23231F] mb-4">My Listings</h2>
        {myListings.length === 0 ? (
          <p className="text-[#7A7264] text-sm">You haven't listed any items yet.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 list-none p-0 m-0">
            {myListings.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/item/${item.id}`}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-3"
                >
                  <img
                    src={item.image}
                    alt={`${item.brand} ${item.type}`}
                    loading="lazy"
                    width="200"
                    height="112"
                    className="w-full h-28 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium text-[#23231F]">{item.brand} {item.type}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Swap requests I sent" className="mb-10">
        <h2 className="font-['Fraunces'] text-lg font-semibold text-[#23231F] mb-4">Swap Requests I Sent</h2>
        {sentRequests.length === 0 ? (
          <p className="text-[#7A7264] text-sm">You haven't sent any swap requests.</p>
        ) : (
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {sentRequests.map((swap) => (
              <li
                key={swap.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex justify-between items-center gap-4"
              >
                <div>
                  <p className="text-sm text-[#23231F]">
                    You offered <strong>{getItemName(swap.offeredItemId)}</strong> for{" "}
                    <strong>{getItemName(swap.requestedItemId)}</strong>
                  </p>
                  <p className="text-xs text-[#7A7264] mt-1">
                    To: {getUserName(swap.toUserId)} · {swap.status}
                  </p>
                </div>
                <Link
                  to={`/chat/${swap.id}`}
                  className="text-sm bg-[#23231F] text-[#F6F1E4] px-4 min-h-[44px] flex items-center rounded-full shadow-sm hover:shadow-md hover:bg-[#B5592F] transition-all whitespace-nowrap"
                  aria-label={`Open chat about ${getItemName(swap.requestedItemId)} with ${getUserName(swap.toUserId)}`}
                >
                  Open Chat
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Swap requests received">
        <h2 className="font-['Fraunces'] text-lg font-semibold text-[#23231F] mb-4">Swap Requests Received</h2>
        {receivedRequests.length === 0 ? (
          <p className="text-[#7A7264] text-sm">No one has requested a swap yet.</p>
        ) : (
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {receivedRequests.map((swap) => (
              <li
                key={swap.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex justify-between items-center gap-4"
              >
                <div>
                  <p className="text-sm text-[#23231F]">
                    <strong>{getUserName(swap.fromUserId)}</strong> offered{" "}
                    <strong>{getItemName(swap.offeredItemId)}</strong> for your{" "}
                    <strong>{getItemName(swap.requestedItemId)}</strong>
                  </p>
                  <p className="text-xs text-[#7A7264] mt-1">{swap.status}</p>
                </div>
                <Link
                  to={`/chat/${swap.id}`}
                  className="text-sm bg-[#23231F] text-[#F6F1E4] px-4 min-h-[44px] flex items-center rounded-full shadow-sm hover:shadow-md hover:bg-[#B5592F] transition-all whitespace-nowrap"
                  aria-label={`Open chat with ${getUserName(swap.fromUserId)} about ${getItemName(swap.requestedItemId)}`}
                >
                  Open Chat
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;