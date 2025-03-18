import { FrameLocator, Locator, type Page } from "@playwright/test";
import BasePage from "./BasePage";
import BaseComponent from "./BaseComponent";
export default abstract class BaseElements {
  [name: string]: Locator | Page | BasePage | FrameLocator | BaseComponent | string;

  constructor(public page: Page) {}
}
