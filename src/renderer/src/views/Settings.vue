<script setup>
import { useI18n } from "vue-i18n";
import { useSettings } from "../composables/useSettings";
import { ref } from 'vue';

const { t } = useI18n();
const { themeOptions, selectedTheme, changeTheme } = useSettings();

// Mock notification settings
const notifications = ref({
  taskReminders: true,
  emailUpdates: false,
  pushNotifications: true,
  soundEnabled: true
});

// Mock application info
const appInfo = ref({
  version: '1.0.0',
  buildDate: '2024-01-15',
  author: 'EnhancedTech Team',
  license: 'MIT'
});

// Mock preferences
const preferences = ref({
  autoSave: true,
  darkMode: selectedTheme.value === 'dark',
  language: 'English',
  dateFormat: 'MM/DD/YYYY'
});

const updateNotification = (key, value) => {
  notifications.value[key] = value;
};

const updatePreference = (key, value) => {
  preferences.value[key] = value;
  if (key === 'darkMode') {
    changeTheme(value ? 'dark' : 'light');
  }
};
</script>

<template>
  <div class="settings-container fade-in">
    <!-- Header Section -->
    <div class="settings-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="pi pi-cog text-primary text-4xl"></i>
        </div>
        <div class="header-text">
          <h1 class="settings-title">Settings</h1>
          <p class="settings-subtitle">Customize your application preferences and manage your account</p>
        </div>
      </div>
    </div>

    <!-- Settings Content -->
    <div class="settings-content">
      <div class="settings-grid">

        <!-- Theme Settings Card -->
        <div class="settings-card">
          <div class="card-header">
            <div class="card-icon">
              <i class="pi pi-palette text-primary"></i>
            </div>
            <div class="card-title">
              <h3>Appearance</h3>
              <p>Choose your preferred theme and visual style</p>
            </div>
          </div>

          <div class="card-content">
            <div class="theme-grid">
              <div
                v-for="option in themeOptions"
                :key="option.id"
                class="theme-option"
                :class="{ 'theme-selected': selectedTheme === option.label.value }"
                @click="changeTheme(option.key)"
              >
                <div class="theme-preview">
                  <img
                    :src="option.image"
                    :alt="`${option.label.value} theme preview`"
                    class="theme-image"
                  >
                  <div class="theme-overlay">
                    <i
                      v-if="selectedTheme === option.label.value"
                      class="pi pi-check text-white"
                    ></i>
                  </div>
                </div>
                <span class="theme-name">{{ option.label.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Card -->
        <div class="settings-card">
          <div class="card-header">
            <div class="card-icon">
              <i class="pi pi-bell text-primary"></i>
            </div>
            <div class="card-title">
              <h3>Notifications</h3>
              <p>Control when and how you receive notifications</p>
            </div>
          </div>

          <div class="card-content">
            <div class="notification-settings">              <div class="setting-item">
                <div class="setting-info">
                  <label for="task-reminders" class="setting-label">Task Reminders</label>
                  <span class="setting-description">Get reminded about upcoming tasks</span>
                </div>
                <ToggleSwitch
                  id="task-reminders"
                  v-model="notifications.taskReminders"
                  @update:model-value="updateNotification('taskReminders', $event)"
                />
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <label for="email-updates" class="setting-label">Email Updates</label>
                  <span class="setting-description">Receive email notifications for important updates</span>
                </div>
                <ToggleSwitch
                  id="email-updates"
                  v-model="notifications.emailUpdates"
                  @update:model-value="updateNotification('emailUpdates', $event)"
                />
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <label for="push-notifications" class="setting-label">Push Notifications</label>
                  <span class="setting-description">Show desktop notifications</span>
                </div>
                <ToggleSwitch
                  id="push-notifications"
                  v-model="notifications.pushNotifications"
                  @update:model-value="updateNotification('pushNotifications', $event)"
                />
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <label for="sound-enabled" class="setting-label">Sound Notifications</label>
                  <span class="setting-description">Play sound for notifications</span>
                </div>
                <ToggleSwitch
                  id="sound-enabled"
                  v-model="notifications.soundEnabled"
                  @update:model-value="updateNotification('soundEnabled', $event)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences Card -->
        <div class="settings-card">
          <div class="card-header">
            <div class="card-icon">
              <i class="pi pi-sliders-h text-primary"></i>
            </div>
            <div class="card-title">
              <h3>Preferences</h3>
              <p>General application preferences and behavior</p>
            </div>
          </div>

          <div class="card-content">            <div class="preference-settings">
              <div class="setting-item">
                <div class="setting-info">
                  <label for="auto-save" class="setting-label">Auto Save</label>
                  <span class="setting-description">Automatically save changes</span>
                </div>
                <ToggleSwitch
                  id="auto-save"
                  v-model="preferences.autoSave"
                  @update:model-value="updatePreference('autoSave', $event)"
                />
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <label for="language-select" class="setting-label">Language</label>
                  <span class="setting-description">Application language</span>
                </div>
                <Dropdown
                  id="language-select"
                  v-model="preferences.language"
                  :options="['English', 'French', 'Spanish', 'German']"
                  placeholder="Select Language"
                  class="language-dropdown"
                />
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <label for="date-format-select" class="setting-label">Date Format</label>
                  <span class="setting-description">How dates are displayed</span>
                </div>
                <Dropdown
                  id="date-format-select"
                  v-model="preferences.dateFormat"
                  :options="['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']"
                  placeholder="Select Format"
                  class="date-dropdown"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- About Card -->
        <div class="settings-card">
          <div class="card-header">
            <div class="card-icon">
              <i class="pi pi-info-circle text-primary"></i>
            </div>
            <div class="card-title">
              <h3>About</h3>
              <p>Application information and version details</p>
            </div>
          </div>

          <div class="card-content">
            <div class="about-info">
              <div class="info-item">
                <span class="info-label">Version</span>
                <span class="info-value">{{ appInfo.version }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Build Date</span>
                <span class="info-value">{{ appInfo.buildDate }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Author</span>
                <span class="info-value">{{ appInfo.author }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">License</span>
                <span class="info-value">{{ appInfo.license }}</span>
              </div>
            </div>

            <div class="about-actions">
              <Button
                label="Check for Updates"
                icon="pi pi-refresh"
                class="p-button-outlined"
                @click="() => {}"
              />
              <Button
                label="Release Notes"
                icon="pi pi-file-text"
                class="p-button-text"
                @click="() => {}"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 0.6s ease-out;
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

.settings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, var(--surface-ground) 0%, var(--surface-section) 100%);
  min-height: 100vh;
}

.settings-header {
  margin-bottom: 2rem;
  background: var(--surface-card);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--surface-border);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-600) 100%);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(var(--primary-color-rgb), 0.3);
}

.settings-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-600) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.settings-subtitle {
  color: var(--text-color-secondary);
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
}

.settings-content {
  animation: slideInUp 0.8s ease-out 0.2s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.settings-card {
  background: var(--surface-card);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--surface-border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.settings-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-600) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.settings-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.settings-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--surface-border);
}

.card-icon {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-600) 100%);
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.card-title h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.card-title p {
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid var(--surface-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--surface-ground);
}

.theme-option:hover {
  border-color: var(--primary-color);
  background: var(--surface-100);
  transform: translateY(-2px);
}

.theme-selected {
  border-color: var(--primary-color) !important;
  background: var(--primary-50) !important;
  box-shadow: 0 4px 15px rgba(var(--primary-color-rgb), 0.2);
}

.theme-preview {
  position: relative;
  width: 80px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.theme-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.theme-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.theme-selected .theme-overlay {
  opacity: 1;
}

.theme-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
  text-align: center;
}

.notification-settings,
.preference-settings {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--surface-ground);
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  transition: all 0.3s ease;
}

.setting-item:hover {
  background: var(--surface-100);
  border-color: var(--primary-200);
}

.setting-info {
  flex: 1;
  margin-right: 1rem;
}

.setting-label {
  display: block;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.setting-description {
  color: var(--text-color-secondary);
  font-size: 0.85rem;
  line-height: 1.4;
}

.language-dropdown,
.date-dropdown {
  min-width: 150px;
}

.about-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--surface-ground);
  border-radius: 8px;
  border: 1px solid var(--surface-border);
}

.info-label {
  font-weight: 600;
  color: var(--text-color);
}

.info-value {
  color: var(--text-color-secondary);
  font-family: 'Courier New', monospace;
}

.about-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.about-actions .p-button {
  flex: 1;
  min-width: 140px;
}

@media (max-width: 768px) {
  .settings-container {
    padding: 1rem;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .theme-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .setting-info {
    margin-right: 0;
  }
}
</style>
