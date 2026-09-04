export const mockUsers = [
  {
    id: "u1",
    name: "Aravind Kumar",
    location: "Madurai, Tamil Nadu",
    contact: "aravind@example.com",
    swapHistory: ["s1"],
  },
  {
    id: "u2",
    name: "Priya Sharma",
    location: "Coimbatore, Tamil Nadu",
    contact: "priya@example.com",
    swapHistory: [],
  },
];

export const mockListings = [
  {
    id: "i1",
    ownerId: "u1",
    type: "Jacket",
    brand: "Levi's",
    size: "M",
    condition: "Good",
    estimatedValue: 1200,
    location: "Madurai, Tamil Nadu",
    status: "available",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
  },
  {
    id: "i2",
    ownerId: "u2",
    type: "Dress",
    brand: "Zara",
    size: "S",
    condition: "Like New",
    estimatedValue: 1500,
    location: "Coimbatore, Tamil Nadu",
    status: "available",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
  },
  {
    id: "i3",
    ownerId: "u1",
    type: "Sneakers",
    brand: "Nike",
    size: "9",
    condition: "Fair",
    estimatedValue: 900,
    location: "Madurai, Tamil Nadu",
    status: "available",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
  },
];

export const mockSwapRequests = [
  {
    id: "s1",
    fromUserId: "u2",
    toUserId: "u1",
    offeredItemId: "i2",
    requestedItemId: "i1",
    status: "pending", // pending | accepted | rejected | completed
  },
];

export const mockMessages = [
  {
    id: "m1",
    swapId: "s1",
    senderId: "u2",
    text: "Hi! Interested in swapping my Zara dress for your jacket.",
    timestamp: "2026-09-01T10:00:00Z",
  },
  {
    id: "m2",
    swapId: "s1",
    senderId: "u1",
    text: "Sounds good, can you share more photos of the dress?",
    timestamp: "2026-09-01T10:05:00Z",
  },
];