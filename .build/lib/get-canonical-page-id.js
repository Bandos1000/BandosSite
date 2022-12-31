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
var get_canonical_page_id_exports = {};
__export(get_canonical_page_id_exports, {
  getCanonicalPageId: () => getCanonicalPageId
});
module.exports = __toCommonJS(get_canonical_page_id_exports);
var import_notion_utils = require("notion-utils");
var import_config = require("./config");
function getCanonicalPageId(pageId, recordMap, { uuid = true } = {}) {
  const cleanPageId = (0, import_notion_utils.parsePageId)(pageId, { uuid: false });
  if (!cleanPageId) {
    return null;
  }
  const override = import_config.inversePageUrlOverrides[cleanPageId];
  if (override) {
    return override;
  } else {
    return (0, import_notion_utils.getCanonicalPageId)(pageId, recordMap, {
      uuid
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCanonicalPageId
});
//# sourceMappingURL=get-canonical-page-id.js.map
