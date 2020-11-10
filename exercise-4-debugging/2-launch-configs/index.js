"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_BASE = process.env.API_BASE;
const axios_1 = require("axios");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
function setColor(color) {
    axios_1.default
        .get(`${API_BASE}/setColor?color=${color}`)
        .then(() => {
        console.log(`The lamp color has been changed to: ${color}`);
    })
        .catch(err => {
        console.log(err.message);
    });
}
readline.question("Enter a color: ", (color) => __awaiter(void 0, void 0, void 0, function* () {
    yield setColor(color);
    readline.close();
}));
//# sourceMappingURL=index.js.map