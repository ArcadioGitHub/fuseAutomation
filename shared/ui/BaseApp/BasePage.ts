import { type Page } from "@playwright/test";
import BaseElements from "./BaseElements";

export type PageOptions = {
  timeout?: number;
  waitForActions?: Promise<any> | Promise<any>[];
};

export default abstract class BasePage {
  public abstract elements: BaseElements;

  constructor(
    public page: Page,
    public options: PageOptions = { timeout: 10000 }
  ) {}

  abstract goto(...args): Promise<void>;
  abstract waitForPageToLoad(): Promise<void>;
  abstract refresh(): Promise<void>;
}
