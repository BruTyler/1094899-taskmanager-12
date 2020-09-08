import fetchMock from 'fetch-mock-jest';
import Api from '../../api';

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

    const url = END_POINT + `/tasks`;
    fetchMock.get(url, tasksJson);
    const api = new Api(END_POINT, AUTH_KEY);

    const tasks = await api.getTasks();

    expect(tasks).toEqual(JSON.parse(tasksJson));
  });

  it(`Api should update task`, async () => {
    const taskId = 0;

    const oldTaskJson = `{
      "id": "${taskId}",
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
    }`;

    const updatedTaskJson = `{
      "id": "${taskId}",
      "color": "yellow",
      "description": "find money for travel",
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
    fetchMock.put(url, updatedTaskJson);
    const api = new Api(END_POINT, AUTH_KEY);

    const taskFromApi = await api.updateTask(JSON.parse(oldTaskJson));

    expect(taskFromApi).toEqual(JSON.parse(updatedTaskJson));
  });
});

