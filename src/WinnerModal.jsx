import { Square } from "./components/Square"

export function WinnerModal({winner, resetGame}) {
    if (winner === null) return null

    const winnerText = 'Empate' ? winner === false : 'Ganó:'
    return (
        <section className="winner">
            <div className="text">
                <h2>{winnerText}</h2>

                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                    <button onClick={resetGame}>Reset Game</button>
                </footer>
            </div>

        </section>
    )

}