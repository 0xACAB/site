# xTranscendence

Сайт-проект на Next.js. В тестовом Docker-сценарии Nginx проксирует запросы к приложению по HTTPS.

## Сам лендинг

[Frontend Lab](https://xtranscendence.vercel.app/) — лендинг.

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Запуск по HTTPS через Docker

Для этого сценария нужны Docker и локальный сертификат.

1. Добавьте в файл `hosts` запись:

   ```text
   127.0.0.1 xtranscendence.local
   ```

   В Windows файл находится в `%SystemRoot%\System32\drivers\etc\hosts`; в macOS и Linux — `/etc/hosts`.

2. Создайте сертификаты. Например, в Git Bash на Windows:

   ```bash
   bash scripts/init-certs.sh
   ```

   Скрипт создаёт файлы в `data/ssl/live/xtranscendence.local/`. Сертификат самоподписанный, поэтому браузер может показать предупреждение.

3. Соберите и запустите тестовую Docker-конфигурацию:

   ```bash
   docker compose -f docker-compose.test.yml up -d --build
   ```

4. Откройте [https://xtranscendence.local](https://xtranscendence.local).

Остановить контейнеры:

```bash
docker compose -f docker-compose.test.yml down
```

> В тестовой конфигурации `data/ssl` подключена как bind mount. Команда `down -v` не удалит сертификаты из этой папки.

## Примечание

Тестовая Docker-конфигурация запускает Next.js и Nginx; отдельный контейнер базы данных в ней не настроен.
