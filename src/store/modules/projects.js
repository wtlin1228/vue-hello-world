import {
  PROJECT_CREATE,
  PROJECT_CREATE_SUCCEEDED,
  PROJECT_CREATE_FAILED,
  PROJECT_CLEAR_ERROR_MESSAGES
} from "../mutation-types";
import { apiPostProject } from "../../api/projects";

const state = {
  name: "",
  loading: false,
  hasError: false,
  errorMessages: []
};

const actions = {
  async createProject({ commit }, payload) {
    commit(PROJECT_CREATE);
    const res = await apiPostProject(payload);
    if (res.status >= 200 && res.status < 300) {
      commit(PROJECT_CREATE_SUCCEEDED, res);
    } else {
      commit(PROJECT_CREATE_FAILED, res);
    }
  }
};

const mutations = {
  [PROJECT_CREATE](state) {
    state.loading = true;
  },
  [PROJECT_CREATE_SUCCEEDED](state, payload) {
    state.name = payload.name;
    state.loading = false;
    state.hasError = false;
    state.errorMessages = [];
  },
  [PROJECT_CREATE_FAILED](state, payload) {
    state.loading = false;
    state.hasError = true;
    state.errorMessages = payload.errorMessages;
  },
  [PROJECT_CLEAR_ERROR_MESSAGES](state) {
    state.hasError = false;
    state.errorMessages = [];
  }
};

const getters = {
  getDecoratedProjectName: state => {
    return "~~ " + state.name + " ~~";
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
