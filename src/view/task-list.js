import AbstractView from './abstract';

const createTasksTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

export default class TaskList extends AbstractView {
  getTemplate() {
    return createTasksTemplate();
  }
}
