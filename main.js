const app = Vue.createApp({
    data() {
        return {
            tasks: []
        }
    },
    computed: {
        taskCount() {
            return this.tasks.length
        }
    },
    methods: {
        addNewTask(task) {
            this.tasks.push(task);
        },
        removeTask(key) {
            this.tasks.splice(key, 1);
        }
    }
});

app.component('to-do', {
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
        <div class="container-sm mt-2">
            <h4 class="mb-3">Remaining Tasks: {{ counter }}</h4>

            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="What do you need to do?" v-model="task" @keyup.enter="submitTask">
            </div>

            <div v-if="tasks.length > 0">
                <single-task v-for="(task, index) in tasks" :task="task" :key="index" :pkey="index">
                </single-task>
            </div>
            <p v-else>To add a new task, write something and press ENTER.</p>
        </div>
    `
});

app.component('single-task', {
    props: {
        task: {
            type: String,
            required: true
        },
        pkey: {
            type: Number,
            required: true
        }
    },
    methods: {
        deleteTask() {
            this.$parent.$emit('delete-task', this.pkey);
        }
    },
    template: `
        <div class="alert alert-success my-3 d-flex justify-content-between" role="alert">
            {{ task }}
            <button type="button" class="btn-close" @click="deleteTask"></button>
        </div>
    `
})

app.mount('#app');