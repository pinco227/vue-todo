const app = Vue.createApp({
    data() {
        return {
            counter: 0,
            tasks: [
                "first task",
                "second task"
            ]
        }
    }
});

app.component('tasks-list', {
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="container-sm">
            <single-task v-for="(task, index) in tasks" :task="task" :key="index">
            </single-task>
    `
});

app.component('single-task', {
    props: {
        task: {
            type: String,
            required: true
        }
    },
    template: `
        <div class="alert alert-success alert-dismissible fade show my-1" role="alert">
            {{ task }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
})

app.mount('#app');