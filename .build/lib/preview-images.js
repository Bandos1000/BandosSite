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
var preview_images_exports = {};
__export(preview_images_exports, {
  getPreviewImage: () => getPreviewImage,
  getPreviewImageMap: () => getPreviewImageMap
});
module.exports = __toCommonJS(preview_images_exports);
var import_got = __toESM(require("got"));
var import_lqip_modern = __toESM(require("lqip-modern"));
var import_notion_utils = require("notion-utils");
var import_p_map = __toESM(require("p-map"));
var import_p_memoize = __toESM(require("p-memoize"));
var import_config = require("./config");
var import_db = require("./db");
var import_map_image_url = require("./map-image-url");
async function getPreviewImageMap(recordMap) {
  const urls = (0, import_notion_utils.getPageImageUrls)(recordMap, {
    mapImageUrl: import_map_image_url.mapImageUrl
  }).concat([import_config.defaultPageIcon, import_config.defaultPageCover]).filter(Boolean);
  const previewImagesMap = Object.fromEntries(
    await (0, import_p_map.default)(
      urls,
      async (url) => {
        const cacheKey = (0, import_notion_utils.normalizeUrl)(url);
        return [cacheKey, await getPreviewImage(url, { cacheKey })];
      },
      {
        concurrency: 8
      }
    )
  );
  return previewImagesMap;
}
async function createPreviewImage(url, { cacheKey }) {
  try {
    try {
      const cachedPreviewImage = await import_db.db.get(cacheKey);
      if (cachedPreviewImage) {
        return cachedPreviewImage;
      }
    } catch (err) {
      console.warn(`redis error get "${cacheKey}"`, err.message);
    }
    const { body } = await (0, import_got.default)(url, { responseType: "buffer" });
    const result = await (0, import_lqip_modern.default)(body);
    console.log("lqip", { ...result.metadata, url, cacheKey });
    const previewImage = {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64
    };
    try {
      await import_db.db.set(cacheKey, previewImage);
    } catch (err) {
      console.warn(`redis error set "${cacheKey}"`, err.message);
    }
    return previewImage;
  } catch (err) {
    console.warn("failed to create preview image", url, err.message);
    return null;
  }
}
const getPreviewImage = (0, import_p_memoize.default)(createPreviewImage);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPreviewImage,
  getPreviewImageMap
});
//# sourceMappingURL=preview-images.js.map
