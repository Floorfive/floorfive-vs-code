import * as vscode from "vscode";

export interface WebviewViewProvider extends vscode.WebviewViewProvider {
  readonly viewType: string;
  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): Thenable<void> | void;
}
