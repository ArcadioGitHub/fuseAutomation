import ApplicationEnvironment from "../types/ApplicationEnvironment";

const apiEnvUrls = ApplicationEnvironment.getDomains("api");
const uiEnvUrls = ApplicationEnvironment.getDomains("ui");

export const urlPaths = {
  paths: {
    api: {
      anyApiModule: {
        exampleApiEndpoint: () => new URL(`api/example/`, apiEnvUrls.anyApiDomainToUse),
      },
    },
    ui: {
      expediaMainPage: () => new URL(``, uiEnvUrls.expedia),
      expediaAccountDashboardPage: () => new URL(`account`, uiEnvUrls.expedia),
    },
  },
};
