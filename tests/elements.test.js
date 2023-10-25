import { expect, describe, it, assert } from "vitest";
import { JSDOM } from "jsdom";
import { createElement, createArticleLinkElement } from "../elements.js";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;

describe("createElement function", () => {
  it("should create a div element with the specified properties", () => {
    const properties = {
      id: "test-div",
      className: "custom-class",
      textContent: "Hello, World!",
    };
    const div = createElement("div", properties);

    expect(div.tagName).toBe("DIV");
    expect(div.id).toBe("test-div");
    expect(div.className).toBe("custom-class");
    expect(div.textContent).toBe("Hello, World!");
  });

  it("should create an anchor element with the specified properties", () => {
    const properties = {
      href: "https://taboola.com",
      textContent: "taboola",
    };
    const a = createElement("a", properties);

    expect(a).toBeTruthy();
    expect(a.tagName).toBe("A");
    expect(a.href).toBe("https://taboola.com/");
    expect(a.textContent).toBe("taboola");
  });

  it("should create a list item element with the specified properties", () => {
    const properties = {
      className: "taboola",
      id: "taboola.id",
      textContent: "taboola",
    };
    const li = createElement("li", properties);

    expect(li).toBeTruthy();
    expect(li.tagName).toBe("LI");
    expect(li.className).toBe("taboola");
    expect(li.id).toBe("taboola.id");
    expect(li.textContent).toBe("taboola");
  });

  it("should create a paragraph element with the specified properties", () => {
    const properties = {
      className: "taboola",
      id: "taboola.id",
      textContent: "taboola",
    };
    const p = createElement("p", properties);

    expect(p).toBeTruthy();
    expect(p.tagName).toBe("P");
    expect(p.className).toBe("taboola");
    expect(p.id).toBe("taboola.id");
    expect(p.textContent).toBe("taboola");
  });

  it("should create a span element with the specified properties", () => {
    const properties = {
      className: "taboola",
      id: "taboola.id",
      textContent: "taboola",
    };
    const span = createElement("span", properties);

    expect(span).toBeTruthy();
    expect(span.tagName).toBe("SPAN");
    expect(span.className).toBe("taboola");
    expect(span.id).toBe("taboola.id");
    expect(span.textContent).toBe("taboola");
  });

  it("should create an image element with the specified properties", () => {
    const properties = {
      className: "taboola",
      id: "taboola.id",
      src: "./Taboola.jpg",
    };
    const img = createElement("img", properties);

    expect(img).toBeTruthy();
    expect(img.tagName).toBe("IMG");
    expect(img.className).toBe("taboola");
    expect(img.id).toBe("taboola.id");
  });
});

describe("createArticleLinkElement", () => {
  it("should create a link element with an image when the URL ends with a supported image extension", () => {
    const sampleArticle = {
      origin: "sponsored",
      url: "https://taboola.com",
      thumbnail: [{ url: "https://taboola.com/image.jpg" }],
      src: "./Taboola.jpg",
      name: "hello taboola",
      branding: "taboola",
    };

    const result = createArticleLinkElement(sampleArticle);

    assert.exists(result);
    const linkElement = result.getElementsByClassName(".article-link");
    assert.exists(linkElement);

    const imgElement = result.querySelector(".article-media");
    assert.exists(imgElement);
    assert.equal(imgElement.tagName, "IMG");
    assert.equal(imgElement.getAttribute("src"), sampleArticle.src);
  });

  it("should create a link element with a video when the URL does not end with a supported image extension", () => {
    const sampleArticle = {
      origin: "sponsored",
      url: "https://taboola.com",
      thumbnail: [{ url: "https://taboola.com/image.mp4" }],
      src: "./test.mp4",
      name: "hello taboola",
      branding: "taboola",
    };

    const result = createArticleLinkElement(sampleArticle);

    assert.exists(result);
    const linkElement = result.getElementsByClassName(".article-link");
    assert.exists(linkElement);

    const videoElement = result.querySelector(".article-media");
    assert.exists(videoElement);
    assert.equal(videoElement.tagName, "VIDEO");
    assert.equal(videoElement.getAttribute("src"), sampleArticle.src);
  });
});
