import projectsModule from "./projects";
import {
  PROJECT_CREATE,
  PROJECT_CREATE_SUCCESSFULLY,
  PROJECT_CREATE_FAILED,
  PROJECT_CLEAR_ERROR_MESSAGES
} from "../mutation-types";

/**
 * creates a project successfully
 * creates a project failed
 */
let mockError = false;

jest.mock("axios", () => ({
  post: (_url, _body) => {
    console.log("mock axios post", _url, _body);
    return new Promise(resolve => {
      if (mockError) {
        resolve({
          status: 400,
          errorMessages: ["project name should be greater than 5 characters"]
        });
      }

      resolve({
        status: 204,
        name: _body.name
      });
    });
  }
}));

describe("Vuex projects module - action", () => {
  let commit;

  beforeEach(() => {
    commit = jest.fn();
  });

  it("creates a project successfully", async () => {
    const name = "leo-project-1";
    await projectsModule.actions.createProject({ commit }, { name });

    expect(commit).toHaveBeenCalledWith(PROJECT_CREATE);
    expect(commit).toHaveBeenCalledWith(PROJECT_CREATE_SUCCESSFULLY, {
      name,
      status: 204
    });
  });

  it("creates a project failed", async () => {
    const name = "leo";
    mockError = true;
    await projectsModule.actions.createProject({ commit }, { name });

    expect(commit).toHaveBeenCalledWith(PROJECT_CREATE);
    expect(commit).toHaveBeenCalledWith(PROJECT_CREATE_FAILED, {
      status: 400,
      errorMessages: ["project name should be greater than 5 characters"]
    });
  });
});

/**
 * mutates state correctly by PROJECT_CREATE
 * mutates state correctly by PROJECT_CREATE_SUCCESSFULLY
 * mutates state correctly by PROJECT_CREATE_FAILED
 * mutates state correctly by PROJECT_CLEAR_ERROR_MESSAGES
 */
describe("Vuex projects module - mutation", () => {
  let state;

  beforeEach(() => {
    state = {
      name: "",
      loading: false,
      hasError: false,
      errorMessages: []
    };
  });

  it("mutates state correctly by PROJECT_CREATE", () => {
    projectsModule.mutations[PROJECT_CREATE](state);
    expect(state.loading).toBe(true);
  });

  it("mutates state correctly by PROJECT_CREATE_SUCCESSFULLY", () => {
    const name = "test name";
    projectsModule.mutations[PROJECT_CREATE_SUCCESSFULLY](state, {
      name
    });
    expect(state.name).toBe(name);
    expect(state.loading).toBe(false);
    expect(state.hasError).toBe(false);
    expect(state.errorMessages).toStrictEqual([]);
  });

  it("mutates state correctly by PROJECT_CREATE_FAILED", () => {
    const errorMessages = ["error-1", "error-2"];
    projectsModule.mutations[PROJECT_CREATE_FAILED](state, {
      errorMessages
    });
    expect(state.name).toBe(state.name);
    expect(state.loading).toBe(false);
    expect(state.hasError).toBe(true);
    expect(state.errorMessages).toStrictEqual(errorMessages);
  });

  it("mutates state correctly by PROJECT_CLEAR_ERROR_MESSAGES", () => {
    state = {
      name: "",
      loading: false,
      hasError: true,
      errorMessages: ["error-1", "error-2"]
    };
    projectsModule.mutations[PROJECT_CLEAR_ERROR_MESSAGES](state);
    expect(state.name).toBe(state.name);
    expect(state.loading).toBe(state.loading);
    expect(state.hasError).toBe(false);
    expect(state.errorMessages).toStrictEqual([]);
  });
});

/**
 * gets correct value from getDecoratedProjectName
 */
describe("Vuex projects module - getter", () => {
  let state;

  beforeEach(() => {
    state = {
      name: "test me",
      loading: false,
      hasError: false,
      errorMessages: []
    };
  });

  it("gets correct value from getDecoratedProjectName", () => {
    const value = projectsModule.getters.getDecoratedProjectName(state);
    expect(value).toBe("~~ " + state.name + " ~~");
  });
});
