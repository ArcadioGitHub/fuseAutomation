import { Locator, Page } from "@playwright/test";

export type ComponentOptions = {
  timeout?: number;
  waitForActions?: Promise<any> | Promise<any>[];
};

export default abstract class BaseComponent {
  public selector: string;
  public page: Page;

  constructor(
    public locator: Locator,
    public options: ComponentOptions = {}
  ) {
    this.page = locator.page();
    this.selector = locator["_selector"] ?? "";
  }

  abstract waitToBeReady(): Promise<void>;
}
