import net from "net";

const host = "127.0.0.1";
const port = 3000;

net
  .createServer((sock) => {
    console.log(`connected: ${sock.remoteAddress}:${sock.remotePort}`);

    sock.on("data", (data) => {
      console.log(`${sock.remoteAddress}: ${data}`);
      sock.write(`${data}`);
    });

    sock.on("close", (data) => {
      console.log(
        `connection closed: ${sock.remoteAddress}:${sock.remotePort}`
      );
    });
  })
  .listen(port, host);

console.log(`Server listening on ${host}:${port}`);
