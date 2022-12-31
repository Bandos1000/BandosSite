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
var use_dark_mode_exports = {};
__export(use_dark_mode_exports, {
  useDarkMode: () => useDarkMode
});
module.exports = __toCommonJS(use_dark_mode_exports);
var import_use_dark_mode = __toESM(require("@fisch0920/use-dark-mode"));
function useDarkMode() {
  const darkMode = (0, import_use_dark_mode.default)(false, { classNameDark: "dark-mode" });
  return {
    isDarkMode: darkMode.value,
    toggleDarkMode: darkMode.toggle
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDarkMode
});
//# sourceMappingURL=use-dark-mode.js.map
