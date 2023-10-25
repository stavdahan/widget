export const titleCase = (str) => {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};

export const fetchImg = async (imageUrl) => {
  return fetch(imageUrl)
    .then((response) => {
      if (response.ok) {
        return response.blob().then((blob) => URL.createObjectURL(blob));
      }
    })
    .catch((error) => {
      console.error("Fetch image failed:", error);
    });
};

export const resizeLastRow = (browserWidth, articles) => {
  if (browserWidth > 900) {
    if (articles.length % 3 == 2) {
      const lastElements = articles.slice(-2);
      lastElements.forEach((element) =>
        element.setAttribute("class", "article-last-two")
      );
    } else if (articles.length % 3 == 1) {
      const lastElement = articles[articles.length - 1];
      lastElement.setAttribute("class", "article-last-one");
    }
  } else if (browserWidth > 600) {
    if (articles.length % 2 == 1) {
      const lastElement = articles[articles.length - 1];
      lastElement.setAttribute("class", "article-last-one");
    } else {
      const lastElement = articles[articles.length - 1];
      lastElement.setAttribute("class", "article-last-two");
    }
  } else {
    articles.forEach((element) => element.setAttribute("class", "article"));
  }
};
