require("dotenv").config();
import {
  ApiDomains,
  DomainType,
  EnvironmentDomains,
  ExpediaEnvironments,
  UiDomains,
} from "./types";

export default class ApplicationEnvironment {
  /** Gets the current application environment ex. DEV, PROD */
  public static readonly current = ApplicationEnvironment.getCurrent();

  static getDomains<T extends DomainType>(
    domainType: T,
    environment?: ExpediaEnvironments
  ): T extends "api" ? ApiDomains : UiDomains {
    const expediaUrls = require("../../shared/assets/expediaDomains") as {
      environmentDomains: Record<ExpediaEnvironments, EnvironmentDomains>;
    };

    if (!expediaUrls?.environmentDomains) {
      throw new Error(
        `Invalid feature environmentDomains. An object literal of type EnvironmentData should exist in shared/assets/reachTvDomains.ts`
      );
    }

    environment ??= process.env.APP_ENVIRONMENT as ExpediaEnvironments;

    if (!environment || !expediaUrls.environmentDomains[environment]) {
      throw new Error(
        `Invalid environment value: '${environment}'. Set your environment variable APP_ENVIRONMENT to a valid value ('dev' | 'prod')`
      );
    }

    const domains = expediaUrls.environmentDomains[environment][domainType];

    if (!domains) {
      throw new Error(
        `No existing domains for type '${domainType}' in '${environment}' environment.`
      );
    }

    return domains as T extends "api" ? ApiDomains : UiDomains;
  }

  private static getCurrent(): ExpediaEnvironments {
    let environment = process.env.APP_ENVIRONMENT as ExpediaEnvironments;
    if (environment == null)
      throw new Error(
        `Invalid environment value: '${environment}'. Set your environment variable APP_ENVIRONMENT to a valid value ('DEV' | 'PROD')`
      );
    return environment;
  }
}
