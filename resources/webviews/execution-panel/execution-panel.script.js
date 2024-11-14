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

      vscode.postMessage({
        command: `execute::${command}`,
      });
    });
  }

  // Message listener
  window.addEventListener("message", (event) => {
    const message = event.data;
    const { command, data } = message;

    console.log(command, data);
  });
};

function showModal() {
  const modal = document.getElementById("modal");
  const modalShow = modal.getAttribute("show");

  if (modalShow === "false") {
    modal.setAttribute("show", "true");
  } else {
    modal.setAttribute("show", "false");
  }
}
