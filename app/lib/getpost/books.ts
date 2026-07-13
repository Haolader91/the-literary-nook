const baseUrl = process.env.NEXT_PUBLIC_URL;

export const getAllBooks = async () => {
  const res = await fetch(`${baseUrl}/api/books`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return res.json();
};
