# vue-hello-world

## Folders
```
.
├── README.md
├── public
├── node_modules
├── package-lock.json
├── package.json
├── babel.config.js
└── src
    ├── api
    ├── assets
    ├── components
    ├── store (Vuex store, `index.js` exports a factor function for create store)
    │   ├── modules
    │   ├── actions.js
    │   ├── mutation-types.js
    │   ├── mutations.js
    │   └── index.js
    └── main.js (Client entry point)
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Third Party

### State Management - Vuex

Libraries:

* [Vuex](https://vuex.vuejs.org/)

Flow to create a new module and then use it.

1. Add types to `src/store/mutation-types.js`

```javaScript
// project
export const PROJECT_CREATE = "PROJECT_CREATE";
export const PROJECT_CREATE_SUCCEEDED = "PROJECT_CREATE_SUCCEEDED";
export const PROJECT_CREATE_FAILED = "PROJECT_CREATE_FAILED";
export const PROJECT_CLEAR_ERROR_MESSAGES = "PROJECT_CLEAR_ERROR_MESSAGES";
```

2. Create `<your-module>.js` in `src/store/modules/`

3. Define state, actions, mutations, getters then export it.

```javaScript
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

```



