// Cache clearing utility for debugging routing and data loading issues
import { LocalStore } from '../assets/js/Local';

export const clearAllCaches = () => {
  console.log('🧹 Starting comprehensive cache clearing...');

  // Clear Electron store caches
  try {
    LocalStore.clear();
    LocalStore.public.clear();
    LocalStore.temp.clear();
    console.log('✅ Electron store caches cleared');
  } catch (error) {
    console.warn('⚠️ Error clearing Electron store:', error);
  }

  // Clear browser storage
  try {
    localStorage.clear();
    sessionStorage.clear();
    console.log('✅ Browser storage cleared');
  } catch (error) {
    console.warn('⚠️ Error clearing browser storage:', error);
  }

  // Clear IndexedDB
  try {
    if (window.indexedDB) {
      // Clear common IndexedDB databases
      const dbNames = ['LocalData', 'AppCache', 'UserData'];
      dbNames.forEach(dbName => {
        const deleteReq = indexedDB.deleteDatabase(dbName);
        deleteReq.onsuccess = () => console.log(`✅ IndexedDB ${dbName} cleared`);
        deleteReq.onerror = () => console.warn(`⚠️ Error clearing IndexedDB ${dbName}`);
      });
    }
  } catch (error) {
    console.warn('⚠️ Error clearing IndexedDB:', error);
  }

  // Clear service worker cache
  try {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
          console.log('✅ Service worker unregistered');
        });
      });
    }
  } catch (error) {
    console.warn('⚠️ Error clearing service worker:', error);
  }

  // Clear cache API
  try {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
          console.log(`✅ Cache ${name} cleared`);
        });
      });
    }
  } catch (error) {
    console.warn('⚠️ Error clearing cache API:', error);
  }

  console.log('🎉 Cache clearing completed');
};

export const clearVueCache = () => {
  console.log('🔄 Clearing Vue-specific caches...');

  // Clear reactive data that might be stale
  try {
    // Force reload of components by clearing component cache
    if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush');
    }
    console.log('✅ Vue devtools cache cleared');
  } catch (error) {
    console.warn('⚠️ Error clearing Vue devtools cache:', error);
  }
};

export const clearRouterCache = () => {
  console.log('🛣️ Clearing router cache...');

  // Force router refresh
  try {
    if (window.location.hash) {
      const currentPath = window.location.hash;
      window.location.hash = '#/';
      setTimeout(() => {
        window.location.hash = currentPath;
      }, 100);
    }
    console.log('✅ Router cache cleared');
  } catch (error) {
    console.warn('⚠️ Error clearing router cache:', error);
  }
};

export const performHardRefresh = () => {
  console.log('🔃 Performing hard refresh...');

  // Clear all caches first
  clearAllCaches();
  clearVueCache();

  // Force a complete reload
  setTimeout(() => {
    if (window.electron && window.electron.ipcRenderer) {
      // Electron environment - reload the window
      window.electron.ipcRenderer.send('reload-app');
    } else {
      // Browser environment - hard reload
      window.location.reload(true);
    }
  }, 500);
};

// Debug function to check current cache state
export const debugCacheState = () => {
  console.log('🔍 Current cache state:');

  try {
    console.log('LocalStore keys:', Object.keys(LocalStore.get('') || {}));
    console.log('LocalStorage keys:', Object.keys(localStorage));
    console.log('SessionStorage keys:', Object.keys(sessionStorage));
    console.log('Current route:', window.location.hash);
  } catch (error) {
    console.warn('Error debugging cache state:', error);
  }
};
