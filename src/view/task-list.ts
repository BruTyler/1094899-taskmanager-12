import AbstractView from './abstract';

const createTasksTemplate = (): string => {
  return `<div class="board__tasks"></div>`;
};

export default class TaskList extends AbstractView {
  getTemplate(): string {
    return createTasksTemplate();
  }
}
