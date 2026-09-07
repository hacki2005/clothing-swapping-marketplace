import { mockListings } from "../data/mockData";
import ListingCard from "../components/ListingCard";

function ListingsPage() {
  return (
    <div>
      <div className="px-8 pt-20 pb-14 max-w-3xl">
        <p className="text-[#B5592F] font-medium text-sm uppercase tracking-widest mb-3">
          A barter economy for your closet
        </p>
        <h1 className="font-['Fraunces'] text-6xl font-semibold leading-[0.95] text-[#23231F]">
          Trade what you have
          <br />
          for what you'll wear.
        </h1>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="sr-only">Available clothing listings</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 list-none p-0 m-0">
          {mockListings.map((item) => (
            <li key={item.id}>
              <ListingCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListingsPage;