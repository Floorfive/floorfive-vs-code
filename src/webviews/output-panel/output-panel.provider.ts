import * as vscode from "vscode";
import BaseWebViewViewProvider from "../webview.base.provider";
import CoreController from "../../core/core.controller";
import Logger from "../../core/services/logger";
import { Log, LogEvents } from "../../types/log";

export default class OutputPanelViewProvider extends BaseWebViewViewProvider {
  private _logger: Logger;

  constructor(_extensionUri: vscode.Uri, _coreController: CoreController) {
    super(
      _extensionUri,
      _coreController,
      "floorfive-vs-code-output.outputPanel",
      "output-panel"
    );

    this._logger = Logger.getInstance();
  }

  protected override async postResolveWebviewView(): Promise<void> {
    this._logger.on(LogEvents.Log, (log: Log) => {
      this.postMessage<Log>(LogEvents.Log, log);
    });
    this._logger.on(LogEvents.Clear, () => {
      this.postMessage(LogEvents.Clear, null);
    });
  }
}
