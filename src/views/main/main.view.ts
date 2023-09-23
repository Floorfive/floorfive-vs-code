import * as vscode from 'vscode';
import { Modules } from '../../modules/_index';
import { IconsService } from '../../services/icons.service';
import { ANIMATIONS_CSS } from '../_animations';
import { CSS } from './main.view.css';
import { HTML } from './main.view.html';
import { MainViewScript } from './main.view.script';

// View class
export class MainView {

    private static readonly viewType = 'floorfive-vs-code.webview';

    public static activate = (context: vscode.ExtensionContext) => {
        // Create a new webview panel
        vscode.window.registerWebviewViewProvider(MainView.viewType, new MainViewProvider(context));
    };

}

// View provider class
class MainViewProvider implements vscode.WebviewViewProvider {

    private readonly extensionUri: vscode.Uri;
    private iconsScript: string = '';

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
        this.extensionUri = context.extensionUri;
    }

    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext<unknown>, token: vscode.CancellationToken): void | Thenable<void> {

        this.iconsScript = IconsService.getIconsScript(this.context);

        // Set the webview's initial html content
        webviewView.webview.html = this.replaceTemplateVariables(HTML);

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this.extensionUri, 'assets')]
        };

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            message => {
                this.messageHandler(webviewView.webview, message);
            },
            undefined,
            this.context.subscriptions
        );
    }

    private replaceTemplateVariables = (html: string): string => {

        return html
            .replace(/(?<!')\{\{actionsHtml\}\}(?!')/g, this.generateModulesHtml())
            .replace(/(?<!')\{\{css\}\}(?!')/g, CSS)
            .replace(/(?<!')\{\{animationsCss\}\}(?!')/g, ANIMATIONS_CSS)
            .replace(/(?<!')\{\{js\}\}(?!')/g, MainViewScript.getScript())
            .replace(/(?<!')\{\{iconsVariables\}\}(?!')/g, this.iconsScript); // Must be last
    };

    private generateModulesHtml = (): string => {
        const modulesHtml: string[] = [];

        Object.keys(Modules.getModules()).forEach((id: any) => {
            modulesHtml.push(Modules.getModule(id).getActionsHtml());
        });

        return modulesHtml.join('\n');
    };

    private messageHandler = (webview: vscode.Webview, message: any) => {

        switch (message.command) {
        }
    };
}

