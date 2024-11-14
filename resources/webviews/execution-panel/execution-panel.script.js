window.onload = () => {
  const vscode = acquireVsCodeApi();

  // Add event listener to all category buttons
  const categoryBtns = document.getElementsByClassName("category__button");
  for (let i = 0; i < categoryBtns.length; i++) {
    categoryBtns.item(i).addEventListener("click", (e) => {
      const category = e.currentTarget.getAttribute("category");
      const commandsContainer = document.getElementById(category);

      if (commandsContainer.getAttribute("closed") === "true") {
        commandsContainer.setAttribute("closed", "false");
      } else {
        commandsContainer.setAttribute("closed", "true");
      }
    });
  }

  // Add event listener to all command buttons
  const commandBtns = document.getElementsByClassName("command__button");
  for (let i = 0; i < commandBtns.length; i++) {
    commandBtns.item(i).addEventListener("click", (e) => {
      const command = e.currentTarget.id;

      // Command State
      const commandState = e.currentTarget.getAttribute("state");
      const commandUnstoppable = e.currentTarget.getAttribute("unstoppable");

      if (commandState === "executing" && commandUnstoppable === null) {
        vscode.postMessage({
          command: `stop`,
        });
      } else if (commandState === "idle") {
        const needsConfirmation =
          e.currentTarget.getAttribute("needs-confirmation") !== null;
        if (needsConfirmation) {
          showModal();
        } else {
          vscode.postMessage({
            command: `execute::${command}`,
          });
        }
      }
    });
  }

  // Message listener
  window.addEventListener("message", (event) => {
    const message = event.data;
    const { command, data } = message;

    switch (command) {
      case "command::start":
        startExecution(data);
        break;
      case "command::stop":
        stopExecution(data);
        break;
    }
  });

  // Add event listener to modal close buttons
  const modalCloseButtons = document.getElementsByClassName("modal_close");
  for (let i = 0; i < modalCloseButtons.length; i++) {
    modalCloseButtons.item(i).addEventListener("click", () => {
      hideModal();
    });
  }
};

function startExecution(commandButtonId) {
  document.getElementById(commandButtonId).setAttribute("state", "executing");
}

function stopExecution(commandButtonId) {
  document.getElementById(commandButtonId).setAttribute("state", "idle");
}

function showModal() {
  const modal = document.getElementById("modal");
  modal.setAttribute("show", "true");
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.setAttribute("show", "false");
}
