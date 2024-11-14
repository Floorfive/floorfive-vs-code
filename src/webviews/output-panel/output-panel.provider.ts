import * as vscode from "vscode";
import BaseWebViewViewProvider from "../webview.base.provider";
import CoreController from "../../core/core.controller";

export default class OutputPanelViewProvider extends BaseWebViewViewProvider {
  constructor(_extensionUri: vscode.Uri, _coreController: CoreController) {
    super(
      _extensionUri,
      _coreController,
      "floorfive-vs-code-output.outputPanel",
      "output-panel"
    );
  }
}
