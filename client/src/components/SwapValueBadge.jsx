function SwapValueBadge({ value }) {
  return (
    <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm">
      Estimated Value: ₹{value}
    </span>
  );
}

export default SwapValueBadge;