import BaseCategory from "../../base/base.category";
import SampleCommand from "./commands/sample.command";

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
  }

  // #endregion Constructor
}
