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
var search_notion_exports = {};
__export(search_notion_exports, {
  default: () => search_notion_default
});
module.exports = __toCommonJS(search_notion_exports);
var import_notion = require("../../lib/notion");
var search_notion_default = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "method not allowed" });
  }
  const searchParams = req.body;
  console.log("<<< lambda search-notion", searchParams);
  const results = await (0, import_notion.search)(searchParams);
  console.log(">>> lambda search-notion", results);
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, max-age=60, stale-while-revalidate=60"
  );
  res.status(200).json(results);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=search-notion.js.map
