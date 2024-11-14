import BaseCommand from "../../../base/base.command";

export default class StoppableCommand extends BaseCommand {
  // #region Constructor

  constructor() {
    super({
      id: "stoppable",
      label: "Stoppable",
      icon: "block",
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
    console.log("Stopping Stoppable Command");
    this.stop();
  }

  // #endregion Public Methods
}
