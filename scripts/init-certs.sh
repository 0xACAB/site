#!/bin/bash

# Создаем папки
mkdir -p data/ssl/live/xtranscendence.local
mkdir -p data/html

echo "🔐 Генерируем сертификаты для xtranscendence.local..."

# Для Windows (Git Bash) используем //CN
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Windows
    openssl req -x509 -newkey rsa:4096 \
        -keyout data/ssl/live/xtranscendence.local/privkey.pem \
        -out data/ssl/live/xtranscendence.local/fullchain.pem \
        -days 365 -nodes \
        -subj "//CN=xtranscendence.local" \
        -addext "subjectAltName=DNS:xtranscendence.local,DNS:*.xtranscendence.local,IP:127.0.0.1"
else
    # Linux/Mac
    openssl req -x509 -newkey rsa:4096 \
        -keyout data/ssl/live/xtranscendence.local/privkey.pem \
        -out data/ssl/live/xtranscendence.local/fullchain.pem \
        -days 365 -nodes \
        -subj "/CN=xtranscendence.local" \
        -addext "subjectAltName=DNS:xtranscendence.local,DNS:*.xtranscendence.local,IP:127.0.0.1"
fi

if [ -f "data/ssl/live/xtranscendence.local/fullchain.pem" ]; then
    echo "✅ Сертификаты созданы успешно!"
    echo "📁 data/ssl/live/xtranscendence.local/"
else
    echo "❌ Ошибка создания сертификатов"
    exit 1
fi