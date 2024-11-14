import BaseCategory from "./base/base.category";
import SampleCategory from "./categories/sample/sample.category";
import Commander from "./services/commander";
import * as vscode from "vscode";

export default class CoreController {
  // #region Properties

  // Categories
  private _categories: BaseCategory[] = [];

  // Command State Management
  private _currentCategoryId: string | null = null;
  private _currentCommandId: string | null = null;

  // #endregion Properties

  // #region Services

  private _commander: Commander = Commander.getInstance();

  // #region Constructor

  constructor() {
    this.addCategory<SampleCategory>(new SampleCategory());

    this._commander.on("command", (data: { command: string; data: any }) => {
      switch (data.command) {
        case "start":
          this._commander.sendToWebview<string>(
            "command::start",
            `${this._currentCategoryId}__${this._currentCommandId}`
          );
          break;
        case "stop":
          this._commander.sendToWebview<string>(
            "command::stop",
            `${this._currentCategoryId}__${this._currentCommandId}`
          );
          this._currentCommandId = null;
          this._currentCategoryId = null;
          break;
      }
    });
  }

  // #endregion Constructor

  // #region Public Methods

  public getCategories(): BaseCategory[] {
    return this._categories;
  }

  public getCategoryById(id: string): BaseCategory | null {
    return this._categories.find((category) => category.id === id) || null;
  }

  public executeCommand(commandInfo: string): void {
    const [categoryId, commandId] = commandInfo.split("__");

    if (this._currentCommandId === null) {
      this._currentCategoryId = categoryId;
      this._currentCommandId = commandId;
      this.getCategoryById(categoryId)?.executeCommand(commandId);
    } else {
      vscode.window.showWarningMessage("Another command is already running.");
    }
  }

  public stopCommand(): void {
    if (this._currentCommandId !== null && this._currentCategoryId !== null) {
      this.getCategoryById(this._currentCategoryId)?.stopCommand(
        this._currentCommandId
      );

      this._commander.sendToWebview<string>(
        "command::stop",
        `${this._currentCategoryId}__${this._currentCommandId}`
      );
      this._currentCommandId = null;
      this._currentCategoryId = null;
    }
  }

  // #endregion Public Methods

  // #region Private Methods

  private addCategory<T extends BaseCategory>(category: T): void {
    this._categories.push(category);
  }

  // #endregion Private Methods
}
