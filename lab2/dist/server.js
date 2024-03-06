"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = __importDefault(require("net"));
var host = "127.0.0.1";
var port = 3000;
net_1.default
    .createServer(function (sock) {
    console.log("connected: ".concat(sock.remoteAddress, ":").concat(sock.remotePort));
    sock.on("data", function (data) {
        console.log("".concat(sock.remoteAddress, ": ").concat(data));
        sock.write("".concat(data));
    });
    sock.on("close", function (data) {
        console.log("connection closed: ".concat(sock.remoteAddress, ":").concat(sock.remotePort));
    });
})
    .listen(port, host);
console.log("Server listening on ".concat(host, ":").concat(port));
