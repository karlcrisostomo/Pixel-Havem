export const photoResources = (query, item) => {
  const photoUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=${item}`;
  return photoUrl;
};

export const videoResources = (query, item) => {
  const videoURL = `https://api.pexels.com/videos/search?query=${encodeURIComponent(
    query
  )}&per_page=${item}`;
  return videoURL;
};

export const curatedPhotos = (item) => {
  const photoUrl = `https://api.pexels.com/v1/curated?per_page=${item}`;

  return photoUrl;
};

export const avatar = (photographer_id, photographer_url) => {
  const avatarUrl = `https://images.pexels.com/users/avatars/${photographer_id}/${photographer_url}.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1`;
  return avatarUrl;
};

// export const pexelsResources = (query, item, category) => {
//   const baseURL = category === "Photos" ? photoURL : videoURL;

//   return `${baseURL}/search?query=${encodeURIComponent(
//     query
//   )}&per_page=${item}`;
// };
// export const videoURL = "https://api.pexels.com/videos";
// export const photoURL = "https://api.pexels.com/photos";

export const categoryList = [
  "Landscape",
  "Nature",
  "Animation",
  "Abstract",
  "Animals",
  "Skyscraper",
  "Ocean",
  "City",
  "Forest",
  "Mountain",
  "Interior Design",
  "Architecture",
  "Desert",
  "Wildlife",
  "Surreal",
  "Vintage",
  "Underwater",
  "Travel",
  "Macro Photography",
  "Industrial",
 
];
