import BaseCommand from "../../../base/base.command";

export default class CustomConfirmationCommand extends BaseCommand {
  // #region Constructor

  constructor() {
    super({
      id: "custom-confirmation",
      label: "Custom Confirmation",
      icon: "question_answer",
      needsConfirmation: true,
      confirmationMessage: `Do you want to confirm this command?<br/>Command: <b>Custom Confirmation</b><br/><br/><i>This is a custom confirmation message.</i>`,
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
