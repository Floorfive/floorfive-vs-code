import { CommandInit } from "../../types/command-init";

export default class BaseCommand {
  // #region Properties

  // Command Information
  private readonly _id: string;
  private readonly _label: string;
  private readonly _icon: string;
  private readonly _isSubCommand: boolean = false;

  // #endregion Properties

  // #region Constructor

  constructor(props: CommandInit) {
    this._id = props.id;
    this._label = props.label;
    this._icon = props.icon;
    this._isSubCommand = props.isSubCommand || false;
  }

  // #endregion Constructor

  // #region Public Methods

  getTemplate(categoryId: string): string {
    if (this._isSubCommand) {
      return `<!-- Sub Command: ${categoryId}__${this._id} -->
<div class="command__button sub" id="${categoryId}__${this._id}" state="idle">
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
<div class="command__button" id="${categoryId}__${this._id}" state="idle">
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

  public getId(): string {
    return this._id;
  }

  public async isVisible(): Promise<boolean> {
    return true;
  }

  public execute(): void {
    throw new Error("Method not implemented.");
  }

  // #endregion Public Methods
}
