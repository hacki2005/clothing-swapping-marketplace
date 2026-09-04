import { mockListings } from "../data/mockData";
import ListingCard from "../components/ListingCard";

function ListingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Browse Clothing Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockListings.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ListingsPage;