import { Link } from "react-router-dom";

function ListingCard({ item }) {
  return (
    <Link
      to={`/item/${item.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
    >
      <img
        src={item.image}
        alt={item.type}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{item.brand} {item.type}</h3>
        <p className="text-sm text-gray-500">Size: {item.size} · {item.condition}</p>
        <p className="text-sm text-gray-500">{item.location}</p>
        <p className="mt-2 font-bold text-blue-600">₹{item.estimatedValue}</p>
      </div>
    </Link>
  );
}

export default ListingCard;