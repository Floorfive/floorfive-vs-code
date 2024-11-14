import BaseCategory from "./base/base.category";
import SampleCategory from "./categories/sample/sample.category";

export default class CoreController {
  // #region Properties

  private _categories: BaseCategory[] = [];

  // #endregion Properties

  // #region Constructor

  constructor() {
    this.addCategory<SampleCategory>(new SampleCategory());
  }

  // #endregion Constructor

  // #region Public Methods

  public getCategories(): BaseCategory[] {
    return this._categories;
  }

  public getCategoryById(id: string): BaseCategory | null {
    return this._categories.find((category) => category.getId() === id) || null;
  }

  public executeCommand(commandInfo: string): void {
    const [categoryId, commandId] = commandInfo.split("__");
    this.getCategoryById(categoryId)?.executeCommand(commandId);
  }

  // #endregion Public Methods

  // #region Private Methods

  private addCategory<T extends BaseCategory>(category: T): void {
    this._categories.push(category);
  }

  // #endregion Private Methods
}
