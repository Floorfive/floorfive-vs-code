import BaseCommand from "../../../base/base.command";

export default class ConfirmationCommand extends BaseCommand {
  // #region Constructor

  constructor() {
    super({
      id: "confirmation",
      label: "Confirmation",
      icon: "check_circle",
      needsConfirmation: true,
    });
  }

  // #endregion Constructor

  // #region Public Methods

  public async execute(): Promise<void> {
    this.start();

    setTimeout(() => {
      this.stop();
    }, 5000);
  }

  public async stopExecution(): Promise<void> {
    console.log("Stopping Confirmation Command");
    this.stop();
  }

  // #endregion Public Methods
}
