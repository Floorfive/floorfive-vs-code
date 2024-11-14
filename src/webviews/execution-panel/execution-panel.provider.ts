import * as vscode from "vscode";
import BaseWebViewViewProvider from "../webview.base.provider";
import CoreController from "../../core/core.controller";

export default class ExecutionPanelViewProvider extends BaseWebViewViewProvider {
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

    return categoriesTemplates.join("\n");
  }

  protected override onDidReceiveMessageFn(): (message: any) => void {
    return (message) => {
      switch (message.command.split("::")[0]) {
        case "execute":
          const commandInfo = message.command.split("::")[1];
          this._coreController.executeCommand(commandInfo);
          break;
      }
    };
  }
}
