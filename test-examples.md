# Примеры тестирования Auto Slug Manager

## 🧪 Тестовые данные для разных типов полей

### 1. Обычное строковое поле

**Входные данные:**
```json
{
  "title": "Моя первая статья"
}
```

**Ожидаемый результат:**
```
slug: "moya-pervaya-statya"
```

---

### 2. Rich Text Blocks (новый редактор)

**Входные данные:**
```json
{
  "title": [
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Как создать успешный проект"
        }
      ]
    }
  ]
}
```

**Ожидаемый результат:**
```
slug: "kak-sozdat-uspeshnyj-proekt"
```

---

### 3. Classic Rich Text (HTML)

**Входные данные:**
```json
{
  "title": "<h1>Руководство по веб-разработке</h1><p>Полное описание</p>"
}
```

**Ожидаемый результат:**
```
slug: "rukovodstvo-po-veb-razrabotke-polnoe-opisanie"
```

---

### 4. Сложный Rich Text Blocks

**Входные данные:**
```json
{
  "title": [
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Лучшие практики "
        },
        {
          "type": "text",
          "text": "JavaScript разработки",
          "bold": true
        }
      ]
    }
  ]
}
```

**Ожидаемый результат:**
```
slug: "luchshie-praktiki-javascript-razrabotki"
```

---

### 5. Сложный Classic Rich Text

**Входные данные:**
```json
{
  "title": "<h2>Современные <strong>технологии</strong></h2><p>и их применение</p><ul><li>React</li><li>Vue</li></ul>"
}
```

**Ожидаемый результат:**
```
slug: "sovremennye-tehnologii-i-ih-primenenie-react-vue"
```

---

### 6. Fallback поле

**Входные данные:**
```json
{
  "title": "",
  "name": "Название проекта"
}
```

**Ожидаемый результат:**
```
slug: "nazvanie-proekta"
```

---

### 7. Проверка уникальности

**Первая запись:**
```json
{
  "title": "Тестовая статья"
}
```
Результат: `slug: "testovaya-statya"`

**Вторая запись:**
```json
{
  "title": "Тестовая статья"
}
```
Результат: `slug: "testovaya-statya-1"`

**Третья запись:**
```json
{
  "title": "Тестовая статья"
}
```
Результат: `slug: "testovaya-statya-2"`

---

## 🔍 Логи для отладки

При работе плагина в консоли должны появляться подробные логи:

```
🔍 [Auto Slug] Обнаружена обычная строка
📝 [Auto Slug] Извлеченный текст из основного поля: Моя статья
🚀 [Auto Slug] Генерируем слаг для api::article.article из текста: Моя статья
🔄 [Auto Slug] Базовый слаг: moya-statya
✅ [Auto Slug] Уникальный слаг найден: moya-statya
✅ [Auto Slug] Итоговый слаг: moya-statya
```

```
🔍 [Auto Slug] Обнаружен Rich Text Blocks (массив)
📝 [Auto Slug] Извлекаем текст из блоков: [...]
✅ [Auto Slug] Извлеченный текст: Моя статья
```

```
🔍 [Auto Slug] Обнаружен классический Rich Text (HTML)
📝 [Auto Slug] Извлекаем текст из HTML: <h1>Заголовок</h1>
✅ [Auto Slug] Извлеченный текст из HTML: Заголовок
``` 