import { APPTYPE, APIKEY, GAP } from "./config.js";

// GET request for articles
export const getArticles = async () => {
  const jsonFileURL = URL;

  return fetch(jsonFileURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

const createURL = (appType, apiKey, count) => {
  return "/db.json";
  // return `http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=${appType}&app.apikey=${apiKey}&count=${count}&source.type=video&source.id=214321562187&source.url=http://www.site.com/videos/214321562187.html`;
};

const URL = createURL(APPTYPE, APIKEY, GAP);
