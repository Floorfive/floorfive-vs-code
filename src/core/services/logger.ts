import EventEmitter from "events";
import { Log, LogEvents, LogTypes } from "../../types/log";

export default class Logger extends EventEmitter {
  // #region Properties

  private static instance: Logger;
  private _logs: Log[] = [];

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
    const log = this._getLogFromMessage(message, LogTypes.Log);
    this._logs.push(log);
    this.emit(LogEvents.Log, log);
  }

  public error(message: string): void {
    const log = this._getLogFromMessage(message, LogTypes.Error);
    this._logs.push(log);
    this.emit(LogEvents.Log, log);
  }

  public warn(message: string): void {
    const log = this._getLogFromMessage(message, LogTypes.Warning);
    this._logs.push(log);
    this.emit(LogEvents.Log, log);
  }

  public info(message: string): void {
    const log = this._getLogFromMessage(message, LogTypes.Info);
    this._logs.push(log);
    this.emit(LogEvents.Log, log);
  }

  public success(message: string): void {
    const log = this._getLogFromMessage(message, LogTypes.Success);
    this._logs.push(log);
    this.emit(LogEvents.Log, log);
  }

  public step(step: string, message: string): void {
    const formattedMessage = `<span class="number">${step}</span> ${message}`;
    const log = this._getLogFromMessage(formattedMessage, LogTypes.Step);
    this._logs.push(log);
    this.emit(LogEvents.Log, log);
  }

  public clear(): void {
    this._logs = [];
    this.emit(LogEvents.Clear);
  }

  public getLogs(): Log[] {
    return this._logs;
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
