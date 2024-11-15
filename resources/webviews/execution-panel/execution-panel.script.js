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
          const confirmationMessage = e.currentTarget.getAttribute(
            "confirmation-message"
          );

          showModal(confirmationMessage, command);
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
      case "command::init":
        startExecution(data);
        const category = data.split("__")[0];
        categoryBtns.namedItem(category).click();
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

  // Add event listener to modal confirm button
  const modalConfirmButton = document.getElementById("modal-confirm");
  modalConfirmButton.addEventListener("click", () => {
    const command = modalConfirmButton.getAttribute("command");
    vscode.postMessage({
      command: `execute::${command}`,
    });

    hideModal();
  });

  // Init event
  vscode.postMessage({
    command: "init",
  });
};

function startExecution(commandButtonId) {
  document.getElementById(commandButtonId).setAttribute("state", "executing");
}

function stopExecution(commandButtonId) {
  document.getElementById(commandButtonId).setAttribute("state", "idle");
}

function showModal(message, command) {
  document.getElementById("modal-content").innerHTML = message;
  document.getElementById("modal-confirm").setAttribute("command", command);

  const modal = document.getElementById("modal");
  modal.setAttribute("show", "true");
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.setAttribute("show", "false");
}
