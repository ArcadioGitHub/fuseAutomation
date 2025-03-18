export type ExpediaEnvironments = "dev" | "prod";
export type DomainType = "api" | "ui";

export interface ApiDomains {
  anyApiDomainToUse: string;
}

export interface UiDomains {
  expedia: string;
  anyOtherUiDomainToUse: string;
}

export interface EnvironmentDomains {
  api: ApiDomains;
  ui: UiDomains;
}
