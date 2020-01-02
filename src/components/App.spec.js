/**
 * renders the correct markup
 * renders state from local state
 * renders state from module's state
 * renders state from module's getters
 * dispatches 'createProject' when create project button is clicked
 */

import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "./App";
import projectsModule from "../store/modules/projects";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("App", () => {
  let actions;
  let state;
  let store;

  beforeEach(() => {
    actions = {
      createProject: jest.fn()
    };
    state = {
      name: "test name",
      loading: false,
      hasError: false,
      errorMessages: []
    };
    store = new Vuex.Store({
      modules: {
        projects: {
          namespaced: true,
          state,
          actions,
          mutations: projectsModule.mutations,
          getters: projectsModule.getters
        }
      }
    });
  });

  it("renders the correct markup", () => {
    const wrapper = shallowMount(App, { store, localVue });

    expect(wrapper.html()).toContain('<div class="info">');
    expect(wrapper.html()).toContain('<div class="create-project">');
    expect(wrapper.html()).toContain('<div class="clear-error">');
  });

  it("renders state from local state", () => {
    const wrapper = shallowMount(App, { store, localVue });
    const description = wrapper.vm.description;

    expect(
      wrapper
        .find(".info")
        .find("h1")
        .text()
    ).toBe(description);
  });

  it("renders state from module's state", () => {
    const wrapper = shallowMount(App, { store, localVue });
    const infos = wrapper.find(".info").findAll("p");
    const { loading, hasError, errorMessages } = wrapper.vm;

    expect(loading).toBe(state.loading);
    expect(hasError).toBe(state.hasError);
    expect(errorMessages).toBe(state.errorMessages);

    expect(infos.at(1).text()).toContain(loading);
    expect(infos.at(2).text()).toContain(hasError);
    expect(infos.at(3).text()).toContain(errorMessages);
  });

  it("renders state from module's getters", () => {
    const wrapper = shallowMount(App, { store, localVue });
    const projectName = wrapper.find(".info").find("p");

    expect(projectName.text()).toBe(
      projectsModule.getters.getDecoratedProjectName(state)
    );
  });

  it("dispatches 'createProject' when create project button is clicked", () => {
    const wrapper = shallowMount(App, { store, localVue });
    const button = wrapper.find(".create-project").find("button");

    button.trigger("click");
    expect(actions.createProject).toHaveBeenCalled();
  });
});
