import { useState } from "react";
import { mockUsers, mockListings as initialListings, mockSwapRequests } from "../data/mockData";

function AdminPanelPage() {
  const [listings, setListings] = useState(initialListings);
  const handleRemove = (itemId) => setListings(listings.filter((item) => item.id !== itemId));
  const getUserName = (userId) => mockUsers.find((u) => u.id === userId)?.name || "Unknown";

  return (
    <div className="max-w-4xl mx-auto p-8">
      <p className="text-xs uppercase tracking-widest text-[#B5592F] font-medium mb-2">
        Back office
      </p>
      <h1 className="font-['Fraunces'] text-4xl font-semibold text-[#23231F] mb-10">
        Admin Panel
      </h1>

      <section aria-label="Users" className="mb-10">
        <h2 className="font-['Fraunces'] text-lg font-semibold text-[#23231F] mb-4">
          Users ({mockUsers.length})
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">List of registered users</caption>
            <thead className="bg-[#FBF9F3] text-left">
              <tr>
                <th scope="col" className="p-3 text-[#23231F]">Name</th>
                <th scope="col" className="p-3 text-[#23231F]">Contact</th>
                <th scope="col" className="p-3 text-[#23231F]">Location</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-t border-[#F0EBDE] hover:bg-[#FBF9F3]/60 transition-colors">
                  <td className="p-3 text-[#23231F]">{user.name}</td>
                  <td className="p-3 text-[#7A7264]">{user.contact}</td>
                  <td className="p-3 text-[#7A7264]">{user.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Clothing listings" className="mb-10">
        <h2 className="font-['Fraunces'] text-lg font-semibold text-[#23231F] mb-4">
          Clothing Listings ({listings.length})
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">List of clothing items with owner, value, status, and remove action</caption>
            <thead className="bg-[#FBF9F3] text-left">
              <tr>
                <th scope="col" className="p-3 text-[#23231F]">Item</th>
                <th scope="col" className="p-3 text-[#23231F]">Owner</th>
                <th scope="col" className="p-3 text-[#23231F]">Value</th>
                <th scope="col" className="p-3 text-[#23231F]">Status</th>
                <th scope="col" className="p-3 text-[#23231F]">Action</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item.id} className="border-t border-[#F0EBDE] hover:bg-[#FBF9F3]/60 transition-colors">
                  <td className="p-3 text-[#23231F]">{item.brand} {item.type}</td>
                  <td className="p-3 text-[#7A7264]">{getUserName(item.ownerId)}</td>
                  <td className="p-3 text-[#B5592F] font-medium">₹{item.estimatedValue}</td>
                  <td className="p-3 text-[#7A7264]">{item.status}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-[#B5592F] hover:underline min-h-[44px] min-w-[44px] px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B5592F]"
                      aria-label={`Remove ${item.brand} ${item.type}`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Swap requests">
        <h2 className="font-['Fraunces'] text-lg font-semibold text-[#23231F] mb-4">
          Swap Requests ({mockSwapRequests.length})
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">List of swap requests between users</caption>
            <thead className="bg-[#FBF9F3] text-left">
              <tr>
                <th scope="col" className="p-3 text-[#23231F]">From</th>
                <th scope="col" className="p-3 text-[#23231F]">To</th>
                <th scope="col" className="p-3 text-[#23231F]">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSwapRequests.map((swap) => (
                <tr key={swap.id} className="border-t border-[#F0EBDE] hover:bg-[#FBF9F3]/60 transition-colors">
                  <td className="p-3 text-[#23231F]">{getUserName(swap.fromUserId)}</td>
                  <td className="p-3 text-[#23231F]">{getUserName(swap.toUserId)}</td>
                  <td className="p-3 text-[#7A7264]">{swap.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminPanelPage;