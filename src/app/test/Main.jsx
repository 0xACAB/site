'use client';
import './styles.css';

export default function Main() {
    return (
        <div className="flex flex-col w-full justify-between items-center">
            <header className="flex flex-col w-full divide-x-2">
                <div className="flex flex-col w-full items-center">
                    <span>div in header</span>
                </div>
            </header>

            <main className="w-1/2">
                <article>Article1</article>
                <article>Article2</article>
                <button style={{ all: 'revert' }} onClick={() => alert('test')}>
                    test
                </button>
            </main>
        </div>
    );
}
