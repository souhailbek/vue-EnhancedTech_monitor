import {LocalStore} from "../../assets/js/Local";
import {
  until,
  useArrayDifference,
  useArrayJoin,
  useArrayUnique,
  useAsyncState,
  watchDeep,
  whenever
} from "@vueuse/core";
import {supabase} from "../../assets/js/Supabase";
import {ref} from "vue";


export const useTasks = () => {
  const user = LocalStore.public.get('user', {id: 'mock-user-123'});

  const localTasks = ref(LocalStore.get('tasks', []))
  const remoteTasks = ref([])

  watchDeep(localTasks, (tasks) => {
    LocalStore.set(`tasks`, getPlain(tasks))
  });

  const getTasks = async () => {
    try {
      // Get mock tasks from Supabase
      const response = await supabase.rpc('get_tasks', {p_id_employee: user.id});

      if (response.error) {
        console.error('Error fetching tasks:', response.error);
        return ref([]);
      }

      remoteTasks.value = response.data || [];
      console.log('remoteTasks', remoteTasks.value);

      // If local tasks is empty, use remote tasks
      if (localTasks.value.length === 0) {
        localTasks.value = remoteTasks.value;
      }

      // Merge and sort tasks
      const allTasks = [...localTasks.value, ...remoteTasks.value]
        .filter((task, index, self) => index === self.findIndex(t => t.id === task.id))
        .sort((a, b) => b.id - a.id);

      return ref(allTasks);
    } catch (error) {
      console.error('Error in getTasks:', error);
      return ref([]);
    }
  }

  return {getTasks, localTasks, remoteTasks}
}

const getPlain = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
