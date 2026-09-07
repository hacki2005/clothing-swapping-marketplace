import { Link } from "react-router-dom";

function ListingCard({ item }) {
  return (
    <Link to={`/item/${item.id}`} className="group block">
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Punched hole — kept as signature, softened */}
        <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 rounded-full bg-white ring-2 ring-[#F6F1E4] z-10 shadow-inner" />

        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={`${item.brand} ${item.type}, size ${item.size}, ${item.condition} condition`}
            loading="lazy"
            width="400"
            height="256"
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          {/* Subtle gradient for depth + text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#23231F] text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
            {item.condition}
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-['Fraunces'] text-xl font-semibold text-[#23231F]">
            {item.brand}
          </h3>
          <p className="text-sm text-[#7A7264] mt-0.5">{item.type} · Size {item.size}</p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F0EBDE]">
            <span className="text-xs text-[#9A9284]">{item.location}</span>
            <span className="font-['Fraunces'] font-semibold text-[#B5592F] text-lg">
              ₹{item.estimatedValue}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;