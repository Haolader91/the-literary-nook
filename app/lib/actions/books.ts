"use server";

interface NewBook {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  genre: string;
  imageUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL;
export const addedBook = async (newBookData: NewBook) => {
  const res = await fetch(`${baseUrl}/api/books`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newBookData),
  });
  return res.json();
};

// ১. ডেটাবেজ কার্টে পাঠানোর অ্যাকশন
export const addToCartDB = async (cartData: {
  bookId: string;
  title: string;
  genre: string;
  price: string | number;
  imageUrl?: string;
  quantity: number;
}) => {
  const res = await fetch(`${baseUrl}/api/carts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(cartData),
  });
  return res.json();
};

// ২. ডেটাবেজ থেকে কার্ট ডেটা আনার অ্যাকশন
export const getCartFromDB = async () => {
  const res = await fetch(`${baseUrl}/api/carts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }
  return res.json();
};

// ৩. ডেটাবেজ থেকে কার্ট আইটেম ডিলিট করার অ্যাকশন
export const removeFromCartDB = async (bookId: string) => {
  const res = await fetch(`${baseUrl}/api/carts/${bookId}`, {
    method: "DELETE",
  });
  return res.json();
};

// payment method
export const createCheckoutSession = async (
  cartItems: any[],
  shippingFee: number,
) => {
  const res = await fetch(`${baseUrl}/api/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems, shippingFee }),
  });

  if (!res.ok) {
    throw new Error("Checkout session creation failed");
  }

  return res.json();
};
