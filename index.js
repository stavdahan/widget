import { createArticleElement } from "./elements.js";
import { resizeLastRow, fetchImg } from "./utils.js";
import { getArticles } from "./api.js";
import { COUNT } from "./config.js";

let presentedArticles = [];

const createArticlesList = async () => {
  const data = await getArticles();
  const articlesObj = data.list;
  const images = articlesObj.map((articleObj) =>
    fetchImg(articleObj.thumbnail[0].url)
  );

  const filteredObjects = await Promise.all(images).then((res) =>
    res
      .map((src, idx) => {
        articlesObj[idx].src = src;
        return articlesObj[idx];
      })
      .filter((article) => !!article.src)
  );

  presentedArticles = filteredObjects
    .map((obj) => createArticleElement(obj))
    .slice(0, COUNT);

  presentedArticles.forEach((article) => {
    document.getElementById("articlesList").appendChild(article);
  });

  resizeLastRow(window.innerWidth, presentedArticles);
};

createArticlesList();

window.addEventListener("resize", () => {
  resizeLastRow(window.innerWidth, presentedArticles);
});
