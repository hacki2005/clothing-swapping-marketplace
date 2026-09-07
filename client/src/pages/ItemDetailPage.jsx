import { useParams, Link } from "react-router-dom";
import { mockListings, mockUsers } from "../data/mockData";
import { useAuth } from "../context/useAuth";

function ItemDetailPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const item = mockListings.find((listing) => listing.id === id);

  if (!item) {
    return <div className="p-6 text-[#23231F]">Item not found.</div>;
  }

  const owner = mockUsers.find((u) => u.id === item.ownerId);
  const isOwnItem = currentUser && currentUser.id === item.ownerId;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="relative bg-white border-2 border-[#23231F] overflow-hidden [clip-path:polygon(0_0,94%_0,100%_5%,100%_100%,0_100%)]">
        <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[#F6F1E4] border-2 border-[#D9C9AE] z-10" />

        <img
          src={item.image}
          alt={`${item.brand} ${item.type}, size ${item.size}, ${item.condition} condition`}
          loading="lazy"
          width="800"
          height="384"
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          <p className="text-xs uppercase tracking-widest text-[#B5592F] font-medium mb-2">
            {item.condition} · Size {item.size}
          </p>
          <h1 className="font-['Fraunces'] text-4xl font-semibold text-[#23231F]">
            {item.brand} {item.type}
          </h1>

          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6 pt-6 border-t border-dashed border-[#D9C9AE] text-sm text-[#7A7264]">
            <span>📍 {item.location}</span>
            <span>Owner: {owner ? owner.name : "Unknown"}</span>
          </div>

          <p className="font-['Fraunces'] text-3xl font-semibold text-[#B5592F] mt-6">
            ₹{item.estimatedValue}
          </p>

          <div className="mt-8">
            {isOwnItem ? (
              <p className="text-sm text-[#7A7264] italic">This is your own listing.</p>
            ) : (
              <Link
                to={`/swap-request/${item.id}`}
                aria-label={`Request a swap for ${item.brand} ${item.type}`}
                className="shine-btn inline-flex items-center bg-[#23231F] text-[#F6F1E4] px-8 min-h-[44px] rounded-full font-medium hover:bg-[#B5592F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B5592F] transition-colors"
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