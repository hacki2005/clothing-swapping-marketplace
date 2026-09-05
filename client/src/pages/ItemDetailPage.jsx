import { useParams, Link } from "react-router-dom";
import { mockListings, mockUsers } from "../data/mockData";
import SwapValueBadge from "../components/SwapValueBadge";
import { useAuth } from "../context/useAuth";

function ItemDetailPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const item = mockListings.find((listing) => listing.id === id);

  if (!item) {
    return <div className="p-6">Item not found.</div>;
  }

  const owner = mockUsers.find((u) => u.id === item.ownerId);
  const isOwnItem = currentUser && currentUser.id === item.ownerId;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={item.image}
          alt={item.type}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">
            {item.brand} {item.type}
          </h1>
          <p className="text-gray-600 mb-1">Size: {item.size}</p>
          <p className="text-gray-600 mb-1">Condition: {item.condition}</p>
          <p className="text-gray-600 mb-1">Location: {item.location}</p>
          <p className="text-gray-600 mb-4">
            Owner: {owner ? owner.name : "Unknown"}
          </p>

          <SwapValueBadge value={item.estimatedValue} />

          <div className="mt-6">
            {isOwnItem ? (
              <p className="text-sm text-gray-500 italic">
                This is your own listing.
              </p>
            ) : (
              <Link
                to={`/swap-request/${item.id}`}
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                Request Swap
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;