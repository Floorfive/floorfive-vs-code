import { Category } from "../../types/category";
import { CategoryInit } from "../../types/category-init";
import BaseCommand from "./base.command";

export default class BaseCategory implements Category {
  // #region Properties

  // Category Information
  private readonly _id: string;
  private readonly _label: string;
  private readonly _icon: string;

  // Commands
  private readonly _commands: BaseCommand[] = [];

  // #endregion Properties

  // #region Constructor

  constructor(props: CategoryInit) {
    this._id = props.id;
    this._label = props.label;
    this._icon = props.icon;
  }

  // #endregion Constructor

  // #region Public Methods

  public async getTemplate(): Promise<string> {
    return `<!-- Category: ${this._id} -->
<div class="category" id="${this._id}" closed="true" style="--commands: ${
      (await this.visibleCommands()).length
    }">
  <!-- Category Button -->
  <div class="category__button" category="${this._id}">
    <div class="category__button_icon">
      <i class="icon">${this._icon}</i>
    </div>
    <div class="category__button_label">
      <span>${this._label}</span>
    </div>
    <div class="category__button_chevron">
      <i class="icon">chevron_right</i>
    </div>
  </div>

  <!-- Commands -->
  <div class="commands">
    ${(await this.visibleCommands())
      .map((command) => command.getTemplate(this._id))
      .join("\n")}
  </div>
</div>`;
  }

  public getCommandById(id: string): BaseCommand | null {
    return this._commands.find((command) => command.id === id) || null;
  }

  public async isVisible(): Promise<boolean> {
    return (await this.visibleCommands()).length > 0;
  }

  public executeCommand(commandId: string): void {
    this.getCommandById(commandId)?.execute();
  }

  public stopCommand(commandId: string): void {
    this.getCommandById(commandId)?.stopExecution();
  }

  // #endregion Public Methods

  // #region Protected Methods

  protected addCommand<T extends BaseCommand>(command: T): void {
    this._commands.push(command);
  }

  // #endregion Protected Methods

  // #region Private Methods

  private async visibleCommands(): Promise<BaseCommand[]> {
    const commands: BaseCommand[] = [];
    for (const command of this._commands) {
      if (await command.isVisible()) {
        commands.push(command);
      }
    }
    return commands;
  }

  // #endregion Private Methods

  // #region Getters

  get id(): string {
    return this._id;
  }

  // #endregion Getters
}
