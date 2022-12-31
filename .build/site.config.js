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
var site_config_exports = {};
__export(site_config_exports, {
  default: () => site_config_default
});
module.exports = __toCommonJS(site_config_exports);
var import_site_config = require("./lib/site-config");
var site_config_default = (0, import_site_config.siteConfig)({
  rootNotionPageId: "c41c53e4c5e6464f847245b2c1261965",
  rootNotionSpaceId: null,
  name: "The Bandos Webspace",
  domain: "bandos.dev",
  author: "Bandos",
  description: "Bandos's Public Workspace",
  twitter: "bandos_1000",
  github: "Bandos1000",
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,
  isPreviewImageSupportEnabled: false,
  isRedisEnabled: false,
  pageUrlOverrides: null,
  navigationStyle: "default"
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=site.config.js.map
