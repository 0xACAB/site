'use server';
import { connectToDatabase } from '@/lib/mongodb';
import data from './db_nba.json' with { type: 'json' };

export async function moveDatabase() {
    const { db } = await connectToDatabase();
    const collection = db.collection('nba');
    console.log(`📥 Импортируем ${data.events.length} событий...`);

    try {
        // 2. Добавляем все записи
        const result = await collection.insertMany(data.events);
        console.log(`✅ Добавлено ${result.insertedCount} записей`);
        // 3. Создаем уникальный индекс на поле eventId
        await collection.createIndex(
            { eventId: 1 },
            {
                unique: true,
                name: 'eventId_unique'
            }
        );
        console.log('✅ Уникальный индекс на eventId создан');

        return { success: true, id: 0 };
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
    }

    await collection.createIndex({ eventId: 1 }, { unique: true });
    console.log('Элементы добавлены!');
    return {
        success: true
    };
}
