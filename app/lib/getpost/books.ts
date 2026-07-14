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
// genres page
export const getDynamicGenresFromBooks = async () => {
  const res = await fetch(`${baseUrl}/api/genres`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }
  return res.json();
};

//  genres slug
export const getGenreCounts = async () => {
  const res = await fetch(`${baseUrl}/api/genres-count`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch genre counts");
  }
  return res.json();
};
