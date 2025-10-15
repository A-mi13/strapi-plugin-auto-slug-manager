'use strict';

const settingsStore = require('./utils/settings-store');

module.exports = ({ strapi }) => {
  // Регистрируем universal lifecycle хуки при старте Strapi
  const registerSlugLifecycles = () => {
    console.log('🚀 [Auto Slug Manager] Plugin initialization...');
    
    // Получаем конфигурацию плагина из Strapi
    const pluginConfig = strapi.config.get('plugin.auto-slug-manager') || {};
    console.log('⚙️ [Auto Slug Manager] Plugin configuration:', pluginConfig);
    
    // Инициализируем настройки из конфигурации плагина
    settingsStore.initializeSettings(pluginConfig);
    
    const slugService = strapi.plugin('auto-slug-manager').service('slug-generator');
    
    // Получаем все content-types с полем slug
    const contentTypesWithSlug = slugService.getContentTypesWithSlug();
    
    if (contentTypesWithSlug.length === 0) {
      console.log('⚠️ [Auto Slug Manager] No content-types with slug field found');
      return;
    }

    // Регистрируем lifecycle хуки для каждого content-type
    contentTypesWithSlug.forEach(({ uid, displayName }) => {
      console.log(`📝 [Auto Slug Manager] Registering lifecycle for ${displayName} (${uid})`);
      
      // В Strapi v5 используем прямую регистрацию через strapi.db.lifecycles
      strapi.db.lifecycles.subscribe({
        models: [uid],
        
        // beforeCreate хук
        async beforeCreate(event) {
          const { data } = event.params;
          console.log(`🆕 [Auto Slug Manager] beforeCreate for ${uid}:`, data.title || data.name);
          
          if (!data.slug) {
            const slug = await slugService.generateSlugForEntry(data, uid);
            if (slug) {
              data.slug = slug;
              console.log(`✅ [Auto Slug Manager] Slug created: "${slug}"`);
            }
          }
        },

        // beforeUpdate хук
        async beforeUpdate(event) {
          const { data, where } = event.params;
          console.log(`🔄 [Auto Slug Manager] beforeUpdate for ${uid}:`, data.title || data.name);
          
          // Генерируем слаг только если его нет или если нужно обновить
          if (data.title || data.name) {
            // Получаем текущую запись
            const currentEntity = await strapi.db.query(uid).findOne({ where });
            
            // Пробуем сгенерировать слаг (сервис сам решит, обновлять или нет)
            const slug = await slugService.generateSlugForEntry(data, uid, currentEntity?.documentId);
            if (slug) {
              data.slug = slug;
              console.log(`✅ [Auto Slug Manager] Slug updated: "${slug}"`);
            } else if (currentEntity?.slug) {
              console.log(`⚠️ [Auto Slug Manager] Slug already exists, skipping: "${currentEntity.slug}"`);
            }
          }
        }
      });
    });
    
    console.log(`✅ [Auto Slug Manager] Plugin initialized for ${contentTypesWithSlug.length} content-types`);
  };

  // Запускаем регистрацию после полной инициализации Strapi
  registerSlugLifecycles();
}; 