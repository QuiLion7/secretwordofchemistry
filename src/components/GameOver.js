import './GameOver.css'

const GameOver = ({ restartGame, punctuation, chosenCategory }) => {
  return (
    <div>
      <h1>Fim do Jogo!</h1>
      <h2>Categoria: <span>{chosenCategory}</span></h2>
      <h2>Sua Pontuação nesta rodada foi: <span>{punctuation}</span> </h2>
      <button onClick={restartGame}>Resetar Jogo</button>
    </div>
  )
}

export default GameOver