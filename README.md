## Это сайт xtranscendence.ru


### Запустить можно локально по https:

0. Добавляем в hosts строку:
127.0.0.1 xtranscendence.local

1. Добавляем свои серты(pem) разраба в .data/ssl/live/xtranscendence.local

2. Потом сделаем докер сборку. В этом проекте нет базы данных. Всё достаточно просто.


### Кратко по докеру:

docker compose -f docker-compose.test.yml up -d
По умолчанию Docker ищет файлы: docker-compose.yml или compose.yaml.
Флаг -f позволяет указать другой файл (например, тестовый, продакшен, dev).

-v (--volumes)
Удаляет volumes (тома) вместе с контейнерами.

bash
docker compose -f docker-compose.test.yml down -v
down — остановить и удалить контейнеры

-v — дополнительно удалить volumes, которые были созданы для хранения данных

Без -v — данные (базы, файлы, загрузки) сохраняются.
С -v — всё удаляется, и при следующем запуске данные создаются заново.

Пример
bash
### Запуск с тестовым compose-файлом
docker compose -f docker-compose.test.yml up -d

### Остановка и удаление всего (включая данные)
docker compose -f docker-compose.test.yml down -v
Кратко
Флаг	Что делает
-f	Указывает файл конфигурации
-v	Удаляет тома (данные) при остановке
