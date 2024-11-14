import BaseCategory from "../../base/base.category";
import ConfirmationCommand from "./commands/confirmation.command";
import SampleCommand from "./commands/sample.command";
import StoppableCommand from "./commands/stoppable.command";

export default class SampleCategory extends BaseCategory {
  // #region Constructor

  constructor() {
    super({
      id: "sample",
      label: "Sample",
      icon: "settings",
    });

    // Add Commands
    this.addCommand<SampleCommand>(new SampleCommand());
    this.addCommand<StoppableCommand>(new StoppableCommand());
    this.addCommand<ConfirmationCommand>(new ConfirmationCommand());
  }

  // #endregion Constructor
}
