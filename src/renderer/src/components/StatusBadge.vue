<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'normal'
  }
})

const statusConfig = {
  'in_progress': {
    label: 'In Progress',
    severity: 'warning',
    icon: 'pi pi-clock',
    color: '#f59e0b'
  },
  'done': {
    label: 'Completed',
    severity: 'success',
    icon: 'pi pi-check',
    color: '#10b981'
  },
  'to_do': {
    label: 'To Do',
    severity: 'info',
    icon: 'pi pi-circle',
    color: '#6b7280'
  },
  'pending': {
    label: 'Pending',
    severity: 'warning',
    icon: 'pi pi-pause',
    color: '#f59e0b'
  }
}

const config = computed(() => statusConfig[props.status] || statusConfig['to_do'])
const sizeClass = computed(() => props.size === 'small' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-2')
</script>

<template>
  <span
    :class="sizeClass"
    class="inline-flex align-items-center gap-1 border-round font-medium"
    :style="{
      backgroundColor: `${config.color}20`,
      color: config.color,
      border: `1px solid ${config.color}40`
    }"
  >
    <i :class="config.icon" />
    {{ config.label }}
  </span>
</template>

<style scoped>
span {
  transition: all 0.2s ease;
}

span:hover {
  transform: scale(1.05);
}
</style>
