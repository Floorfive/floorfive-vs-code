import * as vscode from "vscode";
import { WebviewViewProvider } from "../types/webview-provider";
import CoreController from "../core/core.controller";

export default class BaseWebViewViewProvider implements WebviewViewProvider {
  //#region Properties

  private _view?: vscode.WebviewView;

  //#endregion Properties

  //#region Constructor

  constructor(
    protected readonly _extensionUri: vscode.Uri,
    protected readonly _coreController: CoreController,
    public readonly viewType: string,
    protected readonly _viewCode: string
  ) {}

  //#endregion Constructor

  //#region Public Methods

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): Promise<void> {
    this._view = webviewView;

    this._view.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    this._view.webview.html = await this._getHtmlForWebview(this._view.webview);

    this._view.webview.onDidReceiveMessage(this.onDidReceiveMessageFn());

    await this.postResolveWebviewView();
  }

  protected async postResolveWebviewView(): Promise<void> {}

  protected postMessage<T>(command: string, data: T): void {
    this._view?.webview.postMessage({
      command,
      data,
    });
  }

  //#endregion Public Methods

  //#region Private Methods

  private async _getHtmlForWebview(webview: vscode.Webview): Promise<string> {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "resources",
        "webviews",
        this._viewCode,
        `${this._viewCode}.script.js`
      )
    );

    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "resources",
        "webviews",
        this._viewCode,
        `${this._viewCode}.style.css`
      )
    );

    const template = await this.getTemplate();

    const nonce = this._getNonce();

    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${
      webview.cspSource
    }; style-src ${
      webview.cspSource
    } 'nonce-${nonce}'; script-src 'nonce-${nonce}';"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="${styleUri}" rel="stylesheet"><style nonce="${nonce}">${this._getIconsStyle(
      webview
    )}</style></head><body>${this._minimizeTemplate(
      template
    )}<script nonce="${nonce}" src="${scriptUri}"></script></body></html>`;
  }

  private _minimizeTemplate(template: string): string {
    return template.replace(/\s+/g, " ").trim();
  }

  private _getNonce() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private _getIconsStyle(webview: vscode.Webview): string {
    const iconsFontUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "resources",
        "fonts",
        "material_icons.woff2"
      )
    );

    const iconsStyle = `/* fallback */
      @font-face {
        font-family: "Material Symbols Outlined";
        font-style: normal;
        font-weight: 400;
        src: url(${iconsFontUri})
          format("woff2");
      }

      .icon {
        font-family: "Material Symbols Outlined";
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: "liga";
        font-feature-settings: "liga";
        -webkit-font-smoothing: antialiased;
      }`;

    return iconsStyle;
  }

  protected async getTemplate(): Promise<string> {
    const templateUri = vscode.Uri.joinPath(
      this._extensionUri,
      "resources",
      "webviews",
      this._viewCode,
      `${this._viewCode}.template.html`
    );
    const template = (
      await vscode.workspace.fs.readFile(templateUri)
    ).toString();

    return template;
  }

  protected onDidReceiveMessageFn(): (message: any) => void {
    return (message: any) => {};
  }

  //#endregion Private Methods
}
