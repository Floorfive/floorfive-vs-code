export interface Log {
  type: "log" | "error" | "warning" | "info" | "success" | "step";
  message: string;
}

export const LogTypes = {
  Log: "log" as "log",
  Error: "error" as "error",
  Warning: "warning" as "warning",
  Info: "info" as "info",
  Success: "success" as "success",
  Step: "step" as "step",
};

export const LogEvents = {
  Log: "log",
  LogsList: "logsList",
  Clear: "clear",
};
