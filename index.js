import { createArticleElement } from "./elements.js";
import { resizeLastRow, fetchImg } from "./utils.js";
import { getArticles } from "./api.js";
import { COUNT } from "./config.js";

const presentedArticles = [];

const createArticlesList = async () => {
  const data = await getArticles();
  const articles = data.list;

  for (const article of articles) {
    const res = await fetchImg(article.thumbnail[0].url);
    if (!!res) {
      article.src = res;
      const articleElement = createArticleElement(article);
      presentedArticles.push(articleElement);
    }
    if (presentedArticles.length == COUNT) {
      break;
    } 
  }

  presentedArticles.forEach((presentedArticle) =>
    document.getElementById("articlesList").appendChild(presentedArticle)
  );

  resizeLastRow(window.innerWidth, presentedArticles);
};

createArticlesList();

window.addEventListener("resize", () => {
  resizeLastRow(window.innerWidth, presentedArticles);
});
