export interface CommandInit {
  id: string;
  label: string;
  icon: string;
  isSubCommand?: boolean;
  isUnstoppable?: boolean;
  needsConfirmation?: boolean;
}
