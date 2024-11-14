import * as vscode from "vscode";
import BaseWebViewViewProvider from "../webview.base.provider";
import CoreController from "../../core/core.controller";
import Commander from "../../core/services/commander";

export default class ExecutionPanelViewProvider extends BaseWebViewViewProvider {
  private _commander: Commander = Commander.getInstance();

  constructor(_extensionUri: vscode.Uri, _coreController: CoreController) {
    super(
      _extensionUri,
      _coreController,
      "floorfive-vs-code.executionPanel",
      "execution-panel"
    );
  }

  protected override async getTemplate(): Promise<string> {
    console.log(
      this._coreController
        .getCategories()
        .map((category) => {
          category.getTemplate();
        })
        .join("\n")
    );

    const categories = this._coreController.getCategories();

    const categoriesTemplates = [];

    for (const category of categories) {
      if (await category.isVisible()) {
        categoriesTemplates.push(await category.getTemplate());
      }
    }

    if (categoriesTemplates.length === 0) {
      return "No commands available";
    }

    const templateUri = vscode.Uri.joinPath(
      this._extensionUri,
      "resources",
      "webviews",
      this._viewCode,
      `${this._viewCode}.template.html`
    );
    const extendedTemplate = (
      await vscode.workspace.fs.readFile(templateUri)
    ).toString();

    return categoriesTemplates.join("\n") + "\n\n" + extendedTemplate;
  }

  protected override onDidReceiveMessageFn(): (message: any) => void {
    return (message) => {
      switch (message.command.split("::")[0]) {
        case "execute":
          const commandInfo = message.command.split("::")[1];
          this._coreController.executeCommand(commandInfo);
          break;
        case "stop":
          this._coreController.stopCommand();
          break;
      }
    };
  }

  protected override async postResolveWebviewView(): Promise<void> {
    this._commander.on("webview", (data: { command: string; data: any }) => {
      this.postMessage(data.command, data.data);
    });
  }
}
