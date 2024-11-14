import BaseCommand from "../../../base/base.command";

export default class SampleCommand extends BaseCommand {
  // #region Constructor

  constructor() {
    super({
      id: "sample",
      label: "Sample",
      icon: "settings",
    });
  }

  // #endregion Constructor

  // #region Public Methods

  execute(): void {
    console.log("Sample Command Executed");
  }

  // #endregion Public Methods
}
