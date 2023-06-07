<script setup>
import TaskCardSkeleton from "../components/TaskCardSkeleton.vue";
import TaskGrid from "../components/TaskGrid.vue";
import {ref} from "vue";

// Add some UI state management
const isLoading = ref(false);
</script>

<template>
  <div class="home-container fade-in">
    <div class="home-header flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="home-title text-3xl font-bold text-color m-0 mb-2">
          Dashboard
        </h1>
        <p class="home-subtitle text-500 m-0">
          Manage your tasks and track progress efficiently
        </p>
      </div>
      <div class="home-actions flex align-items-center gap-3">        <Button
          v-tooltip.top="'Refresh'"
          icon="pi pi-refresh"
          class="p-button-rounded p-button-text"
        />
        <DataViewLayoutOptions />
      </div>
    </div>

    <Suspense>
      <TaskGrid />
      <template #fallback>
        <div class="loading-grid grid">
          <div
            v-for="n in 6"
            :key="n"
            class="col-4 p-1"
          >
            <TaskCardSkeleton />
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.home-container {
  padding: 1rem;
}

.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-title {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-subtitle {
  font-size: 1rem;
  opacity: 0.8;
}

.loading-grid {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.home-actions {
  gap: 0.75rem;
}

.home-header {
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--surface-200);
}
</style>
