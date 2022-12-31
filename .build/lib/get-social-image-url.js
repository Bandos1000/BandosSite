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
var get_social_image_url_exports = {};
__export(get_social_image_url_exports, {
  getSocialImageUrl: () => getSocialImageUrl
});
module.exports = __toCommonJS(get_social_image_url_exports);
var import_config = require("./config");
function getSocialImageUrl(pageId) {
  try {
    const url = new URL(import_config.api.getSocialImage, import_config.host);
    if (pageId) {
      url.searchParams.set("id", pageId);
      return url.toString();
    }
  } catch (err) {
    console.warn("error invalid social image url", pageId, err.message);
  }
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSocialImageUrl
});
//# sourceMappingURL=get-social-image-url.js.map