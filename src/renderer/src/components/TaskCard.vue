<script setup>
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useRouter} from "vue-router";
import {useAppStore} from "../stores/AppStore";
import {STATUS} from "../assets/js/Enums";
import {formatDistanceToNow} from "date-fns";

const {t} = useI18n();
const router = useRouter();
const appStore = useAppStore();

const props = defineProps({
  task: {
    type: Object,
    required: true,
  }
})

const year = computed(() => props.task.part.folder.year);
const type = computed(() => props.task.part.folder.type);
const office = computed(() => props.task.part.folder.office);
const sequence = computed(() => props.task.part.sequence);
const totalPages = computed(() => props.task.pages_number);
const finishedPages = computed(() => props.task.completed_number);

const title = computed(() => {
  return t('home.task.titleTemplate', {
    type: t(`home.types.${type.value.abbrev}`, totalPages.value),
    year: year.value,
    sequence: sequence.value,
  })
})

const progress = computed(() => {
  return Math.round((finishedPages.value / totalPages.value) * 100);
})

const toTask = () => {
  appStore.data.setActiveTask(JSON.stringify(props.task));
  router.push({
    name: 'task',
    params: {id: props.task.id}
  })
}

const showOptions = () => {
  console.log('Show options for task:', props.task.id);
}

const getStatusIcon = (status) => {
  const icons = {
    'to_do': 'pi pi-circle',
    'in_progress': 'pi pi-clock',
    'done': 'pi pi-check-circle',
    'pending': 'pi pi-pause-circle'
  };
  return icons[status] || 'pi pi-circle';
}

const getProgressColor = (progress) => {
  if (progress === 100) return 'text-green-500';
  if (progress >= 70) return 'text-blue-500';
  if (progress >= 40) return 'text-orange-500';
  return 'text-red-500';
}

const getProgressBarClass = (progress) => {
  if (progress === 100) return 'progress-complete';
  if (progress >= 70) return 'progress-high';
  if (progress >= 40) return 'progress-medium';
  return 'progress-low';
}

const getTimeAgo = (dateString) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return 'recently';
  }
}
</script>

<template>
  <Card
    class="task-card shadow-1 border-2 surface-border h-full p-2 cursor-pointer select-none transition-all duration-300"
    @click="toTask"
  >
    <template #header>
      <div class="flex justify-content-between align-items-center mb-2">
        <Tag
          :class="STATUS[props.task.status]?.class"
          class="task-status-tag"
        >
          <i
            :class="getStatusIcon(props.task.status)"
            class="mr-1"
          />
          {{ STATUS[props.task.status]?.text.value }}
        </Tag>
        <Button
          class="task-options-btn p-1 border-circle bg-transparent border-none"
          size="small"
          @click.stop="showOptions"
        >
          <template #icon>
            <mdi-dots-vertical class="text-lg text-500" />
          </template>
        </Button>
      </div>
    </template>

    <template #title>
      <div class="task-content">
        <h1 class="task-title text-base font-semibold text-color mb-2">
          {{ title }}
        </h1>
        <div class="task-meta flex align-items-center gap-2 mb-3">
          <i class="pi pi-building text-xs text-500" />
          <span class="text-xs text-500">
            {{ t('home.task.office', {office: office.value.office_num}) }}
          </span>
          <i class="pi pi-calendar text-xs text-500 ml-2" />
          <span class="text-xs text-500">{{ year.value }}</span>
        </div>
      </div>
    </template>

    <template #footer>
      <Divider class="my-3" />
      <div class="task-progress-section">
        <div class="flex justify-content-between align-items-center mb-2">
          <div class="flex align-items-center gap-2">
            <i class="pi pi-list text-sm text-primary" />
            <span class="text-sm font-medium text-color">Progress</span>
          </div>
          <span
            class="text-sm font-semibold"
            :class="getProgressColor(progress)"
          >
            {{ progress }}%
          </span>
        </div>

        <div class="progress-container mb-2">
          <ProgressBar
            :value="progress"
            :show-value="false"
            class="w-full task-progress-bar"
            :class="getProgressBarClass(progress)"
          />
        </div>

        <div class="flex justify-content-between align-items-center">
          <span class="text-xs text-500">
            {{ finishedPages.value }} of {{ totalPages.value }} pages
          </span>
          <div class="flex align-items-center gap-1">
            <i class="pi pi-clock text-xs text-500" />
            <span class="text-xs text-500">{{ getTimeAgo(props.task.created_at) }}</span>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.p-card-body {
  min-height: 100% !important;
}

.task-card {
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.task-status-tag {
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
  padding: 0.25rem 0.75rem;
}

.task-options-btn {
  opacity: 0.6;
  transition: all 0.2s ease;
}

.task-options-btn:hover {
  opacity: 1;
  background-color: var(--surface-100) !important;
}

.task-title {
  transition: color 0.2s ease;
}

.task-card:hover .task-title {
  color: var(--primary-500) !important;
}

.task-progress-bar {
  height: 8px;
  border-radius: 10px;
  overflow: hidden;
}

.progress-complete :deep(.p-progressbar-value) {
  background: linear-gradient(90deg, #10b981, #059669);
}

.progress-high :deep(.p-progressbar-value) {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.progress-medium :deep(.p-progressbar-value) {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.progress-low :deep(.p-progressbar-value) {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.task-meta {
  opacity: 0.8;
}

.progress-container {
  position: relative;
}

.task-progress-section {
  border-top: 1px solid var(--surface-200);
  padding-top: 0.75rem;
}
</style>
