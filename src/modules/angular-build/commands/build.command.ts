import { ChildProcessWithoutNullStreams, spawn } from "node:child_process";
import { BaseCommand } from "../../../core/classes/base-command";
import { Command } from "../../../core/types/command";
import { Store } from "../../../store";

/**
 * Represents the BuildCommand class responsible for managing the Build command.
 */
export class BuildCommand extends BaseCommand implements Command {

    // Command Properties
    public showOnCommandPalette: boolean = false;

    // Properties
    private process: ChildProcessWithoutNullStreams | undefined;

    constructor(id: string, label: string) {
        // Call the parent constructor to initialize the command
        super(
            "angular-build",
            `${id}`,
            "building-castle",
            label,
            true
        );
    }

    /**
     * Determines whether to show this command based on the current workspace.
     * @returns {boolean} True if the command should be shown, otherwise false.
     */
    show(): boolean {
        return true;
    }

    /**
     * Determines whether to show this command in the panel.
     * @returns {boolean} True if the command should be shown in the panel, otherwise false.
     */
    showInPanel(): boolean {
        return true;
    }

    execute(): void {
        this.openLogPanel();

        this.executing = !this.executing;
        if (this.executing) {

            const command = `ng build --configuration=${this.getId()}`;

            this.console.clear();
            this.console.log(command, `consoleCommand`);

            this.process = spawn(command.split(` `)[0], command.split(` `).slice(1), {
                cwd: Store.rootPath,
                shell: true
            });

            this.process.stdout.on(`data`, (data) => {
                if (!this.process?.killed) {
                    this.console.log(data.toString());
                }
            });

            this.process.stderr.on(`data`, (data) => {
                if (!this.process?.killed) {
                    this.console.log(data.toString(), `error`);
                }
            });

            this.process.on(`close`, (code) => {
                if (!this.process?.killed) {
                    this.stopExecuting();
                }
            });
        }
        else {

            if (this.process) {
                this.process.kill();

                this.console.log(`Process killed.`);

                this.stopExecuting();
            }
        }
    }

    private stopExecuting() {
        this.executing = false;

        Store.mainViewWebview!.postMessage({
            command: `${this.getModule()}:${this.getId()}:listener`
        });
    }

}