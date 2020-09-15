import fetchMock from 'fetch-mock-jest';
import Api from '../../api';
import {Color} from '../../const';

const END_POINT = `http://end-point.mock`;
const AUTH_KEY = `authorization-mock`;
const SUCCESS_HTTP_CODE = 200;

beforeEach(() => fetchMock.restore());

describe(`API suit`, () => {
  it(`fetchMock is called correctly`, async () => {
    fetchMock.mock(END_POINT, SUCCESS_HTTP_CODE);
    const res = await fetch(END_POINT);
    expect(res.status).toEqual(SUCCESS_HTTP_CODE);
    expect(fetchMock.lastUrl()).toEqual(expect.stringContaining(END_POINT));
  });

  it(`Api should fetch tasks`, async () => {
    const tasksJson = `[{
      "id": "0",
      "color": "yellow",
      "description": "find money for travel",
      "due_date": "2019-07-19T09:52:05.173Z",
      "is_archived": false,
      "is_favorite": false,
      "repeating_days": {
        "mo": false,
        "tu": false,
        "we": false,
        "th": false,
        "fr": false,
        "sa": false,
        "su": false
      }
    }]`;

    const ethalonTasks = [{
      id: `0`,
      color: Color.YELLOW,
      description: `find money for travel`,
      dueDate: new Date(`2019-07-19T09:52:05.173Z`),
      isArchive: false,
      isFavorite: false,
      repeatingMask: 0
    }];

    const url = END_POINT + `/tasks`;
    fetchMock.get(url, tasksJson);
    const api = new Api(END_POINT, AUTH_KEY);

    const tasksFromApi = await api.getTasks();

    expect(tasksFromApi).toEqual(ethalonTasks);
  });

  it(`Api should update task`, async () => {
    const taskId = 0;

    const task = {
      id: `${taskId}`,
      color: Color.BLACK,
      description: `new description`,
      dueDate: new Date(`2019-07-19T09:52:05.173Z`),
      isArchive: true,
      isFavorite: true,
      repeatingMask: 127,
    };

    const taskJson = `{
      "id": "${taskId}",
      "color": "black",
      "description": "new description",
      "due_date": "2019-07-19T09:52:05.173Z",
      "is_archived": true,
      "is_favorite": true,
      "repeating_days": {
        "mo": true,
        "tu": true,
        "we": true,
        "th": true,
        "fr": true,
        "sa": true,
        "su": true
      }
    }`;

    const url = `${END_POINT}/tasks/${taskId}`;
    fetchMock.put(url, taskJson);
    const api = new Api(END_POINT, AUTH_KEY);

    const taskFromApi = await api.updateTask(task);

    expect(taskFromApi).toEqual(task);
  });
});

