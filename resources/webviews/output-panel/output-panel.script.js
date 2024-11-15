let body;
let logo;

window.onload = function () {
  const vscode = acquireVsCodeApi();

  // Get the body element
  body = document.querySelector("body");
  logo = document.getElementById("logo");

  // Message listener
  window.addEventListener("message", (event) => {
    const message = event.data;
    const { command, data } = message;

    switch (command) {
      case "log":
        log(data);
        break;
      case "clear":
        body.innerHTML = "";
        body.appendChild(logo);
        break;
      case "logsList":
        for (const message of data) {
          log(message);
        }
        break;
    }
  });

  // Init event
  vscode.postMessage({
    command: "init",
  });
};

function log(log) {
  let message = document.createElement("div");
  message.className = log.type;
  message.innerHTML = log.message;
  body.appendChild(message);
}
