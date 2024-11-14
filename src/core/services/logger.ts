import EventEmitter from "events";
import { Log, LogEvents, LogTypes } from "../../types/log";

export default class Logger extends EventEmitter {
  // #region Properties

  private static instance: Logger;

  // #endregion Properties

  // #region Constructor

  private constructor() {
    super();
  }

  // #endregion Constructor

  // #region Public Methods

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    this.emit(LogEvents.Log, this._getLogFromMessage(message, LogTypes.Log));
  }

  public error(message: string): void {
    this.emit(LogEvents.Log, this._getLogFromMessage(message, LogTypes.Error));
  }

  public warn(message: string): void {
    this.emit(
      LogEvents.Log,
      this._getLogFromMessage(message, LogTypes.Warning)
    );
  }

  public info(message: string): void {
    this.emit(LogEvents.Log, this._getLogFromMessage(message, LogTypes.Info));
  }

  public success(message: string): void {
    this.emit(
      LogEvents.Log,
      this._getLogFromMessage(message, LogTypes.Success)
    );
  }

  public step(step: string, message: string): void {
    const formattedMessage = `<span class="number">${step}</span> ${message}`;
    this.emit(
      LogEvents.Log,
      this._getLogFromMessage(formattedMessage, LogTypes.Step)
    );
  }

  public clear(): void {
    this.emit(LogEvents.Clear);
  }

  // #endregion Public Methods

  // #region Private Methods

  private _getLogFromMessage(message: string, type: Log["type"]): Log {
    return {
      type,
      message,
    };
  }

  // #endregion Private Methods
}
