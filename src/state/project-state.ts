import { Project, ProjectStatus } from "../models/project";

// Project State Management Class
type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  // List of function references
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  // List of projects
  private projects: Project[] = [];
  // Singleton instance
  private static instance: ProjectState;
  // Private constructor declaration
  private constructor() {
    super();
  }

  addProject(title: string, description: string, numOfPeople: number) {
    // Create new object with the use of func. args
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    // Push to projects list
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => {
      return prj.id === projectId;
    });

    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  // Singleton getter/setter
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      // Returns a copy so we don't edit from the outside
      listenerFn(this.projects.slice());
    }
  }
}
// Singleton State
export const projectState = ProjectState.getInstance();
