export interface IAppAuthorizer {
  isAuthorized(email: string): boolean;
}

const DEFAULT_WHITELIST = (process.env.EMAIL_WHITELIST + "")
  .split(",")
  .map((v) => v.trim().toLowerCase());

export class FromEnvWhitelistAuthorizer implements IAppAuthorizer {
  private readonly whitelist: string[] = DEFAULT_WHITELIST;

  isAuthorized(email: string): boolean {
    return this.whitelist.includes(email.trim().toLowerCase());
  }
}
