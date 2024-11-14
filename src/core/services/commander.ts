import EventEmitter from "events";
import { Log, LogEvents, LogTypes } from "../../types/log";

export default class Commander extends EventEmitter {
  // #region Properties

  private static instance: Commander;

  // #endregion Properties

  // #region Constructor

  private constructor() {
    super();
  }

  // #endregion Constructor

  // #region Public Methods

  public static getInstance(): Commander {
    if (!Commander.instance) {
      Commander.instance = new Commander();
    }
    return Commander.instance;
  }

  public sendCommand<T>(command: string, data: T): void {
    this.emit("command", {
      command,
      data,
    });
  }

  public sendToWebview<T>(command: string, data: T): void {
    this.emit("webview", {
      command,
      data,
    });
  }

  // #endregion Public Methods
}
