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
