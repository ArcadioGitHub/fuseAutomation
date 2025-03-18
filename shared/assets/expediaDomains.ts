import { EnvironmentDomains, ExpediaEnvironments } from "../types/types";

export const environmentDomains: Record<ExpediaEnvironments, EnvironmentDomains> = {
  dev: {
    api: {
      anyApiDomainToUse: "https://www.dev.apidomaintouse.com/",
    },
    ui: {
      expedia: "https://www.dev.expedia.com/",
      anyOtherUiDomainToUse: "https://www.dev.anotherexample.com/",
    },
  },
  prod: {
    api: {
      anyApiDomainToUse: "https://apidomaintouse.com/",
    },
    ui: {
      expedia: "https://www.expedia.com/",
      anyOtherUiDomainToUse: "https://www.anotherexample.com/",
    },
  },
};
