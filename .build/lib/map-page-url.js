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
var map_page_url_exports = {};
__export(map_page_url_exports, {
  getCanonicalPageUrl: () => getCanonicalPageUrl,
  mapPageUrl: () => mapPageUrl
});
module.exports = __toCommonJS(map_page_url_exports);
var import_notion_utils = require("notion-utils");
var import_config = require("./config");
var import_get_canonical_page_id = require("./get-canonical-page-id");
const uuid = !!import_config.includeNotionIdInUrls;
const mapPageUrl = (site, recordMap, searchParams) => (pageId = "") => {
  const pageUuid = (0, import_notion_utils.parsePageId)(pageId, { uuid: true });
  if ((0, import_notion_utils.uuidToId)(pageUuid) === site.rootNotionPageId) {
    return createUrl("/", searchParams);
  } else {
    return createUrl(
      `/${(0, import_get_canonical_page_id.getCanonicalPageId)(pageUuid, recordMap, { uuid })}`,
      searchParams
    );
  }
};
const getCanonicalPageUrl = (site, recordMap) => (pageId = "") => {
  const pageUuid = (0, import_notion_utils.parsePageId)(pageId, { uuid: true });
  if ((0, import_notion_utils.uuidToId)(pageId) === site.rootNotionPageId) {
    return `https://${site.domain}`;
  } else {
    return `https://${site.domain}/${(0, import_get_canonical_page_id.getCanonicalPageId)(pageUuid, recordMap, {
      uuid
    })}`;
  }
};
function createUrl(path, searchParams) {
  return [path, searchParams.toString()].filter(Boolean).join("?");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCanonicalPageUrl,
  mapPageUrl
});
//# sourceMappingURL=map-page-url.js.map
