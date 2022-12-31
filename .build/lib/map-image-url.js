var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var map_image_url_exports = {};
__export(map_image_url_exports, {
  mapImageUrl: () => mapImageUrl
});
module.exports = __toCommonJS(map_image_url_exports);
var import_react_notion_x = require("react-notion-x");
var import_config = require("./config");
const mapImageUrl = (url, block) => {
  if (url === import_config.defaultPageCover || url === import_config.defaultPageIcon) {
    return url;
  }
  return (0, import_react_notion_x.defaultMapImageUrl)(url, block);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mapImageUrl
});
//# sourceMappingURL=map-image-url.js.map
