import * as vscode from "vscode";
import ExecutionPanelViewProvider from "./execution-panel/execution-panel.provider";
import { WebviewViewProvider } from "../types/webview-provider";
import OutputPanelViewProvider from "./output-panel/output-panel.provider";
import CoreController from "../core/core.controller";

export default class WebviewsController {
  public webviewsProviders: WebviewViewProvider[] = [];

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _coreController: CoreController
  ) {
    this.webviewsProviders.push(
      new ExecutionPanelViewProvider(this._extensionUri, this._coreController),
      new OutputPanelViewProvider(this._extensionUri, this._coreController)
    );
  }

  public registerWebviews(context: vscode.ExtensionContext) {
    this.webviewsProviders.forEach((webviewProvider) => {
      context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
          webviewProvider.viewType,
          webviewProvider
        )
      );
    });
  }
}
