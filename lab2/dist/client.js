"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var config_1 = require("./config");
var fs_1 = __importDefault(require("fs"));
var students = [
    "Караваев К.Р. М3О-310Б-21",
    "Алиякбяров М.А. М3О-310Б-21",
    "Терещук А.А М3О-310Б-21",
    "Турлаков В.Т. М3О-310Б-21",
    "Капланов Э.Т. М3О-310Б-21",
];
function main() {
    // const CLIENT_OWNER = "Дудоров Д.А. М3О-310Б-21";
    var TIMEOUT = [2000, 1000, 3000, 1500, 2500];
    var LOG_FILE = "log.txt";
    function getCurrentTime() {
        return new Date();
    }
    var _loop_1 = function (i) {
        var updateLog = function (str) {
            fs_1.default.appendFileSync("log".concat(i, ".txt"), "".concat(str, "\n"));
        };
        var socket = new net_1.Socket();
        socket.connect(config_1.PORT, config_1.HOST);
        socket.on("connect", function () {
            console.log("client connected");
            updateLog("\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F: ".concat(getCurrentTime()));
            updateLog("\u0410\u0434\u0440\u0435\u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: ".concat(config_1.HOST, ":").concat(config_1.PORT));
            setTimeout(function () {
                updateLog("\u0412\u0440\u0435\u043C\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F: ".concat(getCurrentTime()));
                updateLog("\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435: ".concat(students[i]));
                socket.write(students[i]);
            }, TIMEOUT[i]);
        });
        socket.on("data", function (data) {
            var message = data.toString();
            console.log("client received data", message);
            updateLog("\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F: ".concat(getCurrentTime()));
            updateLog("\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435: ".concat(message));
            updateLog("---");
            setTimeout(function () {
                console.log("client disconnected");
                socket.end();
            }, TIMEOUT[i]);
        });
    };
    for (var i = 0; i < 5; i++) {
        _loop_1(i);
    }
}
main();
