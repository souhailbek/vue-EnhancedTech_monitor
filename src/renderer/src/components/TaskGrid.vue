<script setup>
import {useAuth} from "../composables/useAuth";
import {ref, onMounted} from "vue";
import {useTasks} from "../composables/cache/useTask";
import TaskCard from "./TaskCard.vue";
import TaskCardSkeleton from "./TaskCardSkeleton.vue";

const {getUser} = useAuth();
const {getTasks} = useTasks();

const user = ref(null);
const tasks = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const userResult = await getUser();
    user.value = userResult.user;

    const tasksResult = await getTasks();
    tasks.value = tasksResult.value || [];
    console.log('Loaded tasks:', tasks.value);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div
    v-if="!loading"
    class="grid"
  >
    <!--      Task cards       -->
    <div
      v-for="task in tasks"
      :key="task.id"
      class="col-4 p-1"
    >
      <TaskCard
        :task="task"
      />
    </div>
      <!-- Show message if no tasks -->
    <div
      v-if="tasks.length === 0"
      class="col-12 text-center p-4"
    >
      <div class="flex flex-column align-items-center gap-3">
        <i class="pi pi-inbox text-6xl text-400"></i>
        <h3 class="text-500">No tasks available</h3>
        <p class="text-400">Mock data should be loading automatically...</p>
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="3" />
      </div>
    </div>
  </div>

  <!-- Loading state -->
  <div
    v-else
    class="grid"
  >
    <div
      v-for="n in 6"
      :key="n"
      class="col-4 p-1"
    >
      <TaskCardSkeleton />
    </div>
  </div>
</template>

<style scoped>

</style>
