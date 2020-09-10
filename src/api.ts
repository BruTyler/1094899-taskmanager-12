import TasksModel from './model/tasks';
import {HTTPMethod, SuccessHTTPStatusRange} from './const';
import {Task, IRemoteStorage} from './types';

export default class Api implements IRemoteStorage {
  private _endPoint: string;
  private _authorization: string;

  constructor(endPoint: string, authorization: string) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks(): Promise<Task[]> {
    return this._load({url: `tasks`})
      .then(Api.toJSON)
      .then((tasks) => tasks.map(TasksModel.adaptToClient));
  }

  updateTask(task: Task): Promise<Task> {
    return this._load({
      url: `tasks/${task.id}`,
      method: HTTPMethod.PUT,
      body: JSON.stringify(TasksModel.adaptToServer(task)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(TasksModel.adaptToClient);
  }

  _load(loadData: {
    url: string,
    method?: HTTPMethod,
    body?: BodyInit | null,
    headers?: Headers
  }): Promise<any> {

    const {
      url,
      method = HTTPMethod.GET,
      body = null,
      headers = new Headers()
    } = loadData;

    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response: Response): Response {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response: Body): Promise<any> {
    return response.json();
  }

  static catchError(err: Error): void {
    throw err;
  }
}
