const app = Vue.createApp({
    data() {
        return {
            counter: 2,
            tasks: [
                "first task",
                "second task"
            ]
        }
    },
    methods: {
        addNewTask(task) {
            this.tasks.push(task);
            this.counter += 1;
        }
    }
});

app.component('tasks-list', {
    data() {
        return {
            task: null,
            error: null
        }
    },
    methods: {
        submitTask() {
            if (this.task) {
                this.$emit('submit-task', this.task);

                this.task = null;

                if (this.error) {
                    this.error = null;
                }
            } else {
                this.error = "You cannot submit an empty task!";
            }
        }
    },
    props: {
        tasks: {
            type: Array,
            required: true
        },
        counter: {
            type: Number,
            required: true
        }
    },
    template: `
        <div class="container-sm">
            <h4 class="mb-3">Remaining Tasks: {{ counter }}</h4>

            <form @submit.prevent="submitTask">
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="What do you need to do?" v-model="task">
                </div>
            </form>

            <single-task v-for="(task, index) in tasks" :task="task" :key="index">
            </single-task>
        </div>
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
        <div class="alert alert-success alert-dismissible fade show my-3" role="alert">
            {{ task }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
})

app.mount('#app');