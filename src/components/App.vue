<template>
  <div id="app">
    <div class="info">
      <h1>{{ description }}</h1>
      <p>{{ projectName }}</p>
      <p>loading: {{ loading }}</p>
      <p>hasError: {{ hasError }}</p>
      <p>errorMessages: {{ errorMessages }}</p>
    </div>
    <div class="create-project">
      <input v-model="name" />
      <button @click.prevent="createProject({name})">Create Project</button>
    </div>
    <div class="clear-error">
      <button @click.prevent="clearError">Clear Error</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { PROJECT_CLEAR_ERROR_MESSAGES } from '../store/mutation-types';

export default {
  name: 'app',
  data() {
    return {
      description: 'example app'
    };
  },
  methods: {
    ...mapMutations('projects', {
      clearError: PROJECT_CLEAR_ERROR_MESSAGES
    }),
    ...mapActions('projects', [
      'createProject'
    ]),
  },
  computed: {
    ...mapState('projects', {
      loading: state => state.loading,
      hasError: state => state.hasError,
      errorMessages: state => state.errorMessages
    }),
    ...mapGetters('projects', {
      projectName: 'getDecoratedProjectName'
    }),
  }
  
  
}
</script>

<style>
#app {
  
}
</style>
