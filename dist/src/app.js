"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const connection_1 = require("./util/connection");
const api_1 = require("./controllers/api");
// Create Express server
const app = (0, express_1.default)();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public"), { maxAge: 31557600000 }));
(0, connection_1.connectDB)();
(0, api_1.loadApiEndpoints)(app);
exports.default = app;
//# sourceMappingURL=app.js.map