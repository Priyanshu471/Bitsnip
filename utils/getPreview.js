import linkPreview from "linkpreview-for-node";

const cache = new Map();

export const getPreviewData = async ({ longUrl }) => {
  if (!longUrl) {
    return [];
  }

  // Check if the result is in the cache
  // if (cache.has(longUrl)) {
  //   return cache.get(longUrl);
  // }

  try {
    const data = await linkPreview(longUrl);
    const { title, description, image, url } = data;
    let result;
    if (
      !title ||
      title === null ||
      !description ||
      description === null ||
      !image ||
      image === null ||
      !url ||
      url === null
    ) {
      result = {
        title: "No title available",
        description: "No description available",
        image: image,
        url: longUrl,
      };
    } else {
      result = {
        title,
        description,
        image,
        url,
      };
    }

    // Store the result in the cache
    cache.set(longUrl, result);
    return result;
  } catch (error) {
    const result = {
      title: error.message,
      description: "fetching preview failed",
      image: "No image available",
      longUrl,
    };
    // Store the error in the cache
    cache.set(longUrl, result);
    return result;
  }
};
