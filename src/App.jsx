import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS, WINNER_COMBOS } from "./constants"
import { WinnerModal } from "./WinnerModal"

function App() {
	const [board, setBoard] = useState(Array(9).fill(null))
	const [turn, setTurn] = useState(TURNS.x)
	const [winner, setWinner] = useState(null)

	const updateBoard = (index) => {
		// no actualiza si esta lleno el square
		if (board[index] || winner) return

		// actualiza el square si esta vacío
		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)

		// cambia el turno
		const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
		setTurn(newTurn)

		//revisa si hay ganador
		const newWinner = checkWinner(newBoard)
		if (newWinner) {
			setWinner(newWinner)
			confetti()
		} else if (checkEndGame(newBoard)) {
			setWinner(false)
		}

	}

	const checkWinner = (boardToCheck) => {
		// checkea si hay ganador y lo devuelve
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo
			if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
				return boardToCheck[a]
			}
		}

		// devuelve null si no hay ganador y sigue el juego
		return null
	}

	const checkEndGame = (newBoard) => {
		// checkear si todos los squares son diferentes a null
		return newBoard.every((square) => square !== null)
	}

	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.x)
		setWinner(null)
	}

	return (
		<>
			<main className="board">
				<h1>Ta-Te-Ti</h1>
				<section className="game">
					{
						board.map((square, index) => {
							return (
								<Square
									key={index}
									index={index}
									updateBoard={updateBoard}
								>
									{square}
								</Square>
							)
						})
					}
				</section>
				<section className="turn">
					<Square isSelected={turn === TURNS.x}>
						{TURNS.x}
					</Square>
					<Square isSelected={turn === TURNS.o}>
						{TURNS.o}
					</Square>
				</section>

				<WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>

			</main>
		</>
	)
}
export default App
