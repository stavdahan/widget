import { titleCase } from "./utils.js";

export const createElement = (type, properties) => {
  const element = document.createElement(type);
  for (const [key, value] of Object.entries(properties)) {
    element[key] = value;
  }
  return element;
};

export const createArticleElement = (article) => {
  const listItem = createElement("li", {
    className: "article",
    id: article.id,
  });
  const linkElement = createArticleLinkElement(article);
  listItem.appendChild(linkElement);
  return listItem;
};

export const createArticleLinkElement = (article) => {
  const targetAttr = article.origin == "sponsored" ? "blank" : "";
  const linkElement = createElement("a", {
    className: "article-link",
    href: article.url,
    target: targetAttr,
  });
  let mediaType;
  let mediaObj;
  const url = article.thumbnail[0].url.toLowerCase();
  if (
    url.endsWith(".jpg") ||
    url.endsWith(".png") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".gif")
  ) {
    mediaType = "img";
    mediaObj = {
      className: "article-media",
      src: article.src,
    };
  } else {
    mediaType = "video";
    mediaObj = {
      className: "article-media",
      src: article.src,
      autoplay: false,
    };
  }
  const mediaElement = createElement(mediaType, mediaObj);
  linkElement.appendChild(mediaElement);
  const contentElement = createContentElement(article);
  linkElement.appendChild(contentElement);
  return linkElement;
};

export const createContentElement = ({ name, origin, branding }) => {
  const contentElement = createElement("div", { className: "content" });
  const title = titleCase(name);
  const titleElement = createElement("p", {
    className: "title",
    textContent: title,
  });
  contentElement.appendChild(titleElement);
  const sourceElement = createFooterElement(origin, branding);
  contentElement.appendChild(sourceElement);
  return contentElement;
};

const createFooterElement = (origin, branding = "") => {
  const footerElement = createElement("span", {
    className: "footer",
  });
  if (origin == "sponsored") {
      const originElement = createElement("span", {
        className: "origin",
        textContent: origin,
      });
      const separatorElement = createElement("span", {
        className: "separator",
        textContent: "|",
      });
    footerElement.appendChild(originElement);
    footerElement.appendChild(separatorElement);
  }
  
  const brandingElement = createElement("span", {
    className: "branding",
    textContent: branding,
  });
  
  footerElement.appendChild(brandingElement);
  return footerElement;
};
