import { Socket } from "net";
import { HOST, PORT } from "./config";
import fs from "fs";

const CLIENT_OWNER = "Дудоров Д.А. М3О-310Б-21";
const TIMEOUT = 1000;
const LOG_FILE = "log.txt";

function getCurrentTime() {
  return new Date();
}

const updateLog = (str: string) => {
  fs.appendFileSync(LOG_FILE, `${str}\n`);
};

const socket = new Socket();

socket.connect(PORT, HOST);

socket.on("connect", () => {
  updateLog(`Время подключения: ${getCurrentTime()}`);
  updateLog(`Адрес сервера: ${HOST}:${PORT}`);

  setTimeout(() => {
    updateLog(`Время отправки сообщения: ${getCurrentTime()}`);
    updateLog(`Сообщение: ${CLIENT_OWNER}`);
    socket.write(CLIENT_OWNER);
  }, TIMEOUT);
});

socket.on("data", (data: Buffer) => {
  const message = data.toString();

  updateLog(`Время получения сообщения: ${getCurrentTime()}`);
  updateLog(`Сообщение: ${message}`);
  updateLog("---");

  setTimeout(() => {
    socket.end();
  }, TIMEOUT);
});
