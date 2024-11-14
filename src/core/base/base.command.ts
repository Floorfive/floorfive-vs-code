import { CommandInit } from "../../types/command-init";
import Commander from "../services/commander";
import Logger from "../services/logger";

export default class BaseCommand {
  // #region Properties

  // Command Information
  private readonly _id: string;
  private readonly _label: string;
  private readonly _icon: string;
  private readonly _isSubCommand: boolean = false;
  private readonly _stoppableAttribute: string = ``;
  private readonly _needsConfirmationAttribute: string = ``;

  // Command State
  private _isRunning: boolean = false;

  // #endregion Properties

  // #region Services

  protected logger: Logger;
  protected commander: Commander;

  // #endregion Services

  // #region Constructor

  constructor(props: CommandInit) {
    this._id = props.id;
    this._label = props.label;
    this._icon = props.icon;
    this._isSubCommand = props.isSubCommand || false;
    this._stoppableAttribute = props.isUnstoppable ? "unstoppable" : "";
    this._needsConfirmationAttribute = props.needsConfirmation
      ? "needs-confirmation"
      : "";

    // Services
    this.logger = Logger.getInstance();
    this.commander = Commander.getInstance();
  }

  // #endregion Constructor

  // #region Public Methods

  getTemplate(categoryId: string): string {
    if (this._isSubCommand) {
      return `<!-- Sub Command: ${categoryId}__${this._id} -->
<div class="command__button sub" id="${categoryId}__${this._id}" state="idle" ${this._stoppableAttribute} ${this._needsConfirmationAttribute}>
  <div class="command__button_tree_tail">
    <i class="icon">subdirectory_arrow_right</i>
  </div>
  <div class="command__button_icon">
    <i class="icon">${this._icon}</i>
  </div>
  <div class="command__button_label">
    <span>${this._label}</span>
  </div>
  <div class="command__button_state_icon">
    <i class="icon">progress_activity</i>
  </div>
</div>`;
    }

    return `<!-- Command: ${categoryId}__${this._id} -->
<div class="command__button" id="${categoryId}__${this._id}" state="idle" ${this._stoppableAttribute} ${this._needsConfirmationAttribute}>
  <div class="command__button_icon">
    <i class="icon">${this._icon}</i>
  </div>
  <div class="command__button_label">
    <span>${this._label}</span>
  </div>
  <div class="command__button_state_icon">
    <i class="icon">progress_activity</i>
  </div>
</div>`;
  }

  public async isVisible(): Promise<boolean> {
    return true;
  }

  public async execute(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async stopExecution(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  // #endregion Public Methods

  // #region Protected Methods

  protected start(): void {
    this._isRunning = true;
    this.commander.sendCommand("start", null);
  }

  protected stop(): void {
    this._isRunning = false;
    this.commander.sendCommand("stop", null);
  }

  // #endregion Protected Methods

  // #region Getters

  get id(): string {
    return this._id;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }

  // #endregion Getters
}
