import { expect, test } from "vitest";
import { titleCase } from "../utils.js";

test("titleCase capitalizes the first letter of each word", () => {
  const str = "hello world";
  expect(titleCase(str)).toBe("Hello World");
});
