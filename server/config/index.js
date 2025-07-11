'use strict';

module.exports = {
  default: {
    // Глобальные настройки
    enabled: true,
    sourceField: 'title', // Основное поле для генерации слага
    fallbackField: 'name', // Резервное поле, если основное пустое
    handleRichText: true, // Обрабатывать Rich Text (blocks) поля
    addSuffixForUnique: true, // Добавлять суффиксы для уникальности (-1, -2, -3)
    supportCyrillic: true, // Поддержка кириллицы
    slugifyOptions: {
      lower: true,
      strict: true,
      locale: 'ru'
    },
    
    // Настройки по content-types (заполняется автоматически)
    contentTypes: {
      // 'api::article.article': { enabled: true },
      // 'api::page.page': { enabled: true },
    }
  },
  validator: (config) => {
    // Валидация конфигурации
    if (typeof config.enabled !== 'boolean') {
      throw new Error('enabled must be a boolean');
    }
    if (typeof config.sourceField !== 'string') {
      throw new Error('sourceField must be a string');
    }
  },
}; 