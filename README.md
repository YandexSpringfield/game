### Запуск проекта
В файл hosts на локальной машине добавить запись:
```bash
127.0.0.1 my-app.localhost.ya-praktikum.tech
```
Приложение будет доступно по адресу; https://my-app.localhost.ya-praktikum.tech:3000

### Запуск докер контейнера
```
docker-compose build
docker-compose up
```

### Переменные окружения
Для запуска докер контейнера необходимо добавить env файл в корень проекта. Пример содержимого env-файла:
```
NODE_ENV=development
POSTGRES_USER=postgres
POSTGRES_PASSWORD=some_password
POSTGRES_HOST=postgres
POSTGRES_DATABASE=postgres
POSTGRES_PORT=5432
PORT=3000
```

### Описание скриптов
- `lint` - запуск eslint;
- `type-check` - проверка типов TypeScript;
- `test` - тесты;
- `test:dev` - тесты в режиме watch;
- `serve` - запуск только сервера node.js;
- `start` - запуск приложения;

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