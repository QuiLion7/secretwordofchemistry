import './App.css';

import {wordList} from './data/wordList'

import {useState, useEffect, useCallback} from 'react'

import HomeScreen from './components/HomeScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

const chanceQuantity = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)

  const [chosenCategory, setChosenCategory] = useState('')
  const [chosenWord, setChosenWord] = useState('')
  const [lettersChosenWord, setLettersChosenWord] = useState([])

  const [chances, setChances] = useState(chanceQuantity)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [punctuation, setPunctuation] = useState(0)
  
  const [checkingCategory, setChekingCategory] = useState([])
  const [checkingWord, setChekingWord] = useState([])
  
  const savingCategoryAndWordNotToRepeat = (selectedCategory, selectedWord) => {
    setChekingCategory(addCategory => [
      ...addCategory,
      selectedCategory,
    ])

    setChekingWord(addWord => [
      ...addWord,
      selectedWord,
    ])
  }

  const randomSelection = (object, size) => object[Math.floor(Math.random() * size)]

  const userSelectedCategory = useCallback((selectedCategory) => {
    const categoryChosenByUser = wordList[selectedCategory]
    const sizeSelectedCategory = categoryChosenByUser.length
    const selectedWord = randomSelection(categoryChosenByUser, sizeSelectedCategory)

    if(checkingWord.includes(selectedWord)) {
      return
    } else {
      startGame(selectedCategory, selectedWord)
    }

    savingCategoryAndWordNotToRepeat(selectedCategory, selectedWord)
  }, [checkingWord])

  // const categoryAndRandomWordChosen = useCallback(() => {
  //   const categoriesWordList = Object.keys(wordList)
  //   const sizeCategoryWordList = Object.keys(wordList).length
  //   const selectedCategory = randomSelection(categoriesWordList, sizeCategoryWordList)
  //   const sizeSelectedCategory = wordList[selectedCategory].length
  //   const selectedWord = randomSelection(wordList[selectedCategory], sizeSelectedCategory)

  //   console.log(selectedCategory, selectedWord)

  //   startGame(selectedCategory, selectedWord)

  //   savingCategoryAndWordNotToRepeat(selectedCategory, selectedWord)
  // }, [])

  const randomOrChosen = useCallback((chosenCategory) => {
      userSelectedCategory(chosenCategory)
      setChekingCategory(chosenCategory)
    },[userSelectedCategory])
  
  const startGame = useCallback((selectedCategory, selectedWord) => {
    clearLettersGuessedAndWrong()

    let lettersOfTheChosenWord = selectedWord.split('').map(letter => letter.toLowerCase())

    setChosenCategory(selectedCategory)
    setChosenWord(selectedWord)
    setLettersChosenWord(lettersOfTheChosenWord)

    setGameStage(stages[1].name)
  }, [])

  const verifyLetter = (letter) => {
    const letterLowerCase = letter.toLowerCase()

    if(guessedLetters.includes(letterLowerCase) || wrongLetters.includes(letterLowerCase)) {
      return
    }

    if(lettersChosenWord.includes(letterLowerCase)) {
      setGuessedLetters(addedLetters => [
        ...addedLetters, 
        letterLowerCase,
      ])
    } else {
      setWrongLetters(addedLetters => [
        ...addedLetters, 
        letterLowerCase,
      ])

      setChances(actualChance => actualChance - 1)
    }
  }

  const clearLettersGuessedAndWrong = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(chances <= 0) {
      clearLettersGuessedAndWrong()
      setGameStage(stages[2].name)
    }
  }, [chances])

  useEffect(() => {
    const noRepeatChosenLetters = [...new Set(lettersChosenWord)]

    if(guessedLetters.length === noRepeatChosenLetters.length && gameStage === stages[1].name) {
      setPunctuation(actualPontuation => actualPontuation += 100)

      randomOrChosen(chosenCategory)

      if(wordList[checkingCategory] !== undefined) {
        if(wordList[checkingCategory].length === checkingWord.length) {
          clearLettersGuessedAndWrong()
          setGameStage(stages[2].name)
        }
      }
    }
  }, [checkingCategory, checkingWord, guessedLetters, lettersChosenWord, gameStage, randomOrChosen, chosenCategory])

  const restartGame = () => {
    setChances(chanceQuantity)
    setPunctuation(0)
    setChekingCategory([])
    setChekingWord([])

    setGameStage(stages[0].name)
  }
  
  return (
    <div className="App">
      {gameStage === 'start' && (
        <HomeScreen 
          startGame={startGame} 
          wordList={wordList} 
          randomOrChosen={randomOrChosen}
        />
        )}
      {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter} 
          chosenCategory={chosenCategory}
          chosenWord={chosenWord}
          lettersChosenWord={lettersChosenWord}
          chances={chances}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          punctuation={punctuation}
        />
      )}
      {gameStage === 'end' && (
        <GameOver 
          restartGame={restartGame} 
          punctuation={punctuation}
          chosenCategory={chosenCategory}
        />
      )}
    </div>
  );
}

export default App;
