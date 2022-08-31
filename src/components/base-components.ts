// Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    // Template
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    // Node that will host template elements
    this.hostElement = document.getElementById(hostElementId) as T;
    // Creating a DocumentFragment using the templateElement content
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // Getting the first nested child of the template content
    this.element = importedNode.firstElementChild as U;
    // If available set the id value of the new element
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAfterBegin: boolean): void {
    this.hostElement.insertAdjacentElement(
      insertAfterBegin ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
