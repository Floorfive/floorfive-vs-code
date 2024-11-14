let body;

window.onload = function () {
  // Get the body element
  body = document.querySelector("body");

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
        break;
    }
  });
};

function log(log) {
  let message = document.createElement("div");
  message.className = log.type;
  message.innerHTML = log.message;
  body.appendChild(message);
}
