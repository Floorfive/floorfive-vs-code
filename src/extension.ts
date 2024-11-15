// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import WebviewsController from "./webviews/webviews.controller";
import ExecutionPanelViewProvider from "./webviews/execution-panel/execution-panel.provider";
import CoreController from "./core/core.controller";
import Logger from "./core/services/logger";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "floorfive-vs-code" is now active!'
  );

  const coreController = new CoreController();
  const webviewsController = new WebviewsController(
    context.extensionUri,
    coreController
  );
  webviewsController.registerWebviews(context);

  context.subscriptions.push(
    vscode.commands.registerCommand("floorfive-vs-code.consoleClear", () => {
      Logger.getInstance().clear();
    })
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "floorfive-vs-code.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from FloorFive for KBS Developers!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
