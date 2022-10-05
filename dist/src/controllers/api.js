"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadApiEndpoints = void 0;
const courses_json_1 = __importDefault(require("../../data/courses.json"));
const loadApiEndpoints = (app) => {
    app.get("/api", (req, res) => {
        return res.status(200).send(courses_json_1.default);
    });
};
exports.loadApiEndpoints = loadApiEndpoints;
//# sourceMappingURL=api.js.map