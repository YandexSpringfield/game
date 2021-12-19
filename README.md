### Описание скриптов
- `dev` - запуск приложения для локальной разработки;
- `build` - сборка проекта;
- `start` - запуск сервера node.js;
- `lint` - запуск eslint, фикс возможных ошибок;
- `type-check` - проверка типов TypeScript;
- `prepare` - установка husky для инициализации прекоммитов.

### Структура проекта
- `@appConstants` - константы. Здесь можно хранить переменные, которые зафиксированы и распространяются на все приложение;
- `@types` - файлы с общими типами;
- `@pages` - страницы приложения;
- `@containers` - контейнеры (умные компоненты);
- `@components` - "глупые" компоненты, которые никак не влияют на бизнес-логику.

### Алиасы
В проекте используются алиасы. Конфигурация алиасов доступа в `tsonfig.paths.json`.

### Написание стилей
Настройка обработки стилей в `webpack` рассчитана на css-модули. Пример использования:
```typescript jsx
import React from 'react';
import styles from './styles.module.scss';

export const Title = <h1 className={styles.title}>Hello world!</h1>

```
```sass
.title {
  font-size: 40px;
  font-weight: normal;
}
```

### Хостинг
Приложение доступно по адресу - [yandex-springfield.herokuapp.com](https://yandex-springfield.herokuapp.com/).
<br />
Инструкция по деплою проекта:
```shell
heroku login
heroku create [YOUR_APP_NAME]
heroku container:login
heroku container:push web --app [YOUR_APP_NAME]
heroku container:release web --app [YOUR_APP_NAME]
```