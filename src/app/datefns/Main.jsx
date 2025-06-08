import './styles.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Main() {
    return (
        <div className="flex flex-col w-full justify-between items-center">
            <header className="flex flex-col w-full divide-x-2">
                <div className="flex flex-col w-full items-center">
                    <a href="https://date-fns.org/">date-fns</a>
                </div>
            </header>

            <main className="flex flex-col w-1/2 items-center">
                <article className="flex flex-col items-center">
                    <p>{format(new Date(), "'Today is a' bbb")}</p>
                    <p>{formatRelative(subDays(new Date(), 3), new Date(), { locale: ru })}</p>
                    <p>{formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })}</p>
                </article>
            </main>
        </div>
    );
}
