var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var oembed_exports = {};
__export(oembed_exports, {
  oembed: () => oembed
});
module.exports = __toCommonJS(oembed_exports);
var import_notion_utils = require("notion-utils");
var config = __toESM(require("./config"));
var import_notion = require("./notion");
const oembed = async ({
  url,
  maxWidth,
  maxHeight,
  dark = false
}) => {
  var _a;
  const pageId = (0, import_notion_utils.parsePageId)(url);
  let title = config.name;
  let authorName = config.author;
  const page = await (0, import_notion.getPage)(pageId);
  const pageTitle = (0, import_notion_utils.getPageTitle)(page);
  if (pageTitle)
    title = pageTitle;
  const user = (_a = page.notion_user[Object.keys(page.notion_user)[0]]) == null ? void 0 : _a.value;
  const name = [user.given_name, user.family_name].filter(Boolean).join(" ").trim();
  if (name)
    authorName = name;
  const params = { lite: "true" };
  if (dark) {
    params.dark = "true";
  }
  const query = new URLSearchParams(params).toString();
  const embedUrl = `${config.host}/${pageId}?${query}`;
  const defaultWidth = 800;
  const defaultHeight = 600;
  const width = maxWidth ? Math.min(maxWidth, defaultWidth) : defaultWidth;
  const height = maxHeight ? Math.min(maxHeight, defaultHeight) : defaultHeight;
  return {
    version: "1.0",
    type: "rich",
    provider_name: config.author,
    provider_url: config.host,
    title,
    author_name: authorName,
    url,
    width,
    height,
    html: `<iframe src="${embedUrl}" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts" width="${width}" height="${height}" frameborder="0"></iframe>`
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  oembed
});
//# sourceMappingURL=oembed.js.map
