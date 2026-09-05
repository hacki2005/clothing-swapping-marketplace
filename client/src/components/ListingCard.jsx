import { Link } from "react-router-dom";

function ListingCard({ item }) {
  return (
    <Link
      to={`/item/${item.id}`}
      className="group block bg-[#FAF6EF] border border-[#E4DCC8] rounded-sm overflow-hidden hover:border-[#4A5D45] transition-colors"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.type}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#4A5D45] text-[#FAF6EF] text-xs px-2 py-1 rounded-sm">
          {item.condition}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg text-[#2B2B26]">
          {item.brand} {item.type}
        </h3>
        <p className="text-sm text-[#6B6558] mt-1">
          Size {item.size} · {item.location}
        </p>
        <p className="mt-3 font-semibold text-[#C17A5A]">
          Swap value ₹{item.estimatedValue}
        </p>
      </div>
    </Link>
  );
}

export default ListingCard;