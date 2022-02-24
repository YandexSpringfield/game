### Запуск проекта
В файл hosts на локальной машине добавить запись:
```bash
127.0.0.1 my-app.localhost.ya-praktikum.tech
```
Приложение будет доступно по адресу; https://my-app.localhost.ya-praktikum.tech:3000

### Описание скриптов
- `lint` - запуск eslint;
- `test` - тесты;
- `test:dev` - тесты в режиме watch;
- `server` - запуск сервера node.js;
- `type-check` - проверка типов TypeScript;
- `start:dev` - запуск приложения в режиме development;
- `start:prod` - запуск приложения в режиме production.

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