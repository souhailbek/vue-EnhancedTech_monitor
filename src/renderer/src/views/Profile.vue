<script setup>
import {useI18n} from 'vue-i18n'
import {computed, ref, onMounted} from 'vue'
import {useAuth} from "../composables/useAuth";

const {t} = useI18n()
const {signout, getUser} = useAuth()

// Get user data - using onMounted for proper async handling
const user = ref(null);
onMounted(async () => {
  const userData = await getUser();
  user.value = userData.user;
});

const information = [
  {
    id: 0,
    label: computed(() => t('profile.info.service.label')),
    value: computed(() => t('profile.info.service.value')),
    icon: 'pi pi-briefcase'
  },  {
    id: 1,
    label: computed(() => t('profile.info.phoneNumber')),
    value: ref('+1 555-123-4567'),
    icon: 'pi pi-phone'
  },
  {
    id: 2,
    label: computed(() => t('profile.info.email')),
    value: ref('user@example.com'),
    icon: 'pi pi-envelope'
  }
]

const stats = [
  {
    id: 0,
    label: 'Tasks Completed',
    value: '23',
    icon: 'pi pi-check-circle',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 1,
    label: 'In Progress',
    value: '8',
    icon: 'pi pi-clock',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 2,
    label: 'Total Pages',
    value: '420',
    icon: 'pi pi-file',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    id: 3,
    label: 'Success Rate',
    value: '94%',
    icon: 'pi pi-chart-line',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  }
]
</script>

<template>
  <div class="profile-container fade-in">
    <!--      Employee's Information      -->
    <Card class="profile-info-card shadow-2 border-none">
      <template #header>
        <div class="profile-header flex justify-content-between align-items-center">
          <div>
            <h1 class="profile-title text-2xl font-bold text-color m-0 mb-1">
              {{ t('profile.info.title') }}
            </h1>
            <p class="text-500 m-0">Welcome back to your dashboard</p>
          </div>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            severity="danger"
            outlined
            class="logout-btn"
            @click="signout"
          />
        </div>
      </template>

      <template #content>
        <div class="profile-content">
          <!--      Employee's Profile Picture       -->
          <div class="profile-avatar-section">
            <div class="avatar-container">
              <Avatar
                icon="pi pi-user"
                size="xlarge"
                shape="circle"
                class="profile-avatar"
              />
              <div class="status-indicator online"></div>
            </div>
          </div>

          <!--      Employee's Details       -->
          <div class="profile-details">
            <h2 class="user-name text-3xl font-bold text-color mb-3">
              {{ user?.user_metadata?.first_name || 'John' }} {{ user?.user_metadata?.last_name || 'Doe' }}
            </h2>

            <div class="info-grid">
              <div
                v-for="item in information"
                :key="item.id"
                class="info-item"
              >
                <div class="info-icon">
                  <i :class="item.icon" />
                </div>
                <div class="info-content">
                  <h4 class="info-label text-sm font-medium text-500 m-0">
                    {{ item.label.value }}
                  </h4>
                  <p class="info-value text-color font-semibold m-0">
                    {{ item.value.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!--      Employee's Statistics      -->
    <Card class="stats-card shadow-2 border-none">
      <template #header>
        <div class="stats-header">
          <h2 class="stats-title text-2xl font-bold text-color m-0 mb-1">
            {{ t('profile.stats.title') }}
          </h2>
          <p class="text-500 m-0">Your performance overview</p>
        </div>
      </template>

      <template #content>
        <div class="stats-grid">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="stat-card"
          >
            <div class="stat-icon-container" :class="stat.bgColor">
              <i :class="[stat.icon, stat.color]" />
            </div>
            <div class="stat-content">
              <h3 class="stat-value text-2xl font-bold text-color m-0">
                {{ stat.value }}
              </h3>
              <p class="stat-label text-sm text-500 m-0">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

.profile-info-card,
.stats-card {
  border-radius: 16px;
  padding: 2rem;
  background: var(--surface-0);
}

.profile-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--surface-200);
  margin-bottom: 2rem;
}

.profile-title {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logout-btn {
  transition: all 0.3s ease;
}

.logout-btn:hover {
  transform: translateY(-2px);
}

.profile-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.profile-avatar-section {
  flex-shrink: 0;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.profile-avatar {
  width: 120px !important;
  height: 120px !important;
  border: 4px solid var(--primary-100);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.status-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid var(--surface-0);
}

.status-indicator.online {
  background-color: #10b981;
}

.profile-details {
  flex: 1;
}

.user-name {
  margin-bottom: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface-50);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: var(--surface-100);
  transform: translateY(-2px);
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--primary-100);
  color: var(--primary-600);
}

.info-content {
  flex: 1;
}

.info-label {
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.stats-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--surface-200);
  margin-bottom: 2rem;
}

.stats-title {
  background: linear-gradient(135deg, var(--green-500), var(--blue-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--surface-0);
  border: 1px solid var(--surface-200);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-200);
}

.stat-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 12px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  margin-bottom: 0.25rem;
}

:deep(.p-avatar) {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
}

:deep(.p-avatar-icon) {
  font-size: 3rem;
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    text-align: center;
  }

  .info-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
