import BaseCommand from "../../../base/base.command";

export default class SampleCommand extends BaseCommand {
  // #region Constructor

  constructor() {
    super({
      id: "sample",
      label: "Sample",
      icon: "settings",
      isUnstoppable: true,
    });
  }

  // #endregion Constructor

  // #region Public Methods

  public async execute(): Promise<void> {
    this.start();

    this.logger.log("Sample Command Executed");
    this.logger.info("Sample Command Executed");
    this.logger.success("Sample Command Executed");
    this.logger.warn("Sample Command Executed");
    this.logger.error("Sample Command Executed");
    this.logger.step("1", "Sample Command Executed");

    setTimeout(() => {
      this.stop();
    }, 20000);
  }

  public async stopExecution(): Promise<void> {
    this.stop();
  }

  // #endregion Public Methods
}
