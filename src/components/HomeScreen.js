import { useState} from "react";
import './HomeScreen.css'

const HomeScreen = ({ wordList, randomOrChosen}) => {
  const list = Object.keys(wordList)
  const categoryList = list.map((category, index) => 
    <option key={index} value={category}>{category}</option>
  )

  const [chosenCategory, setChosenCategory] = useState('Matéria e Energia')

  const chooseProcess = () => {
    randomOrChosen(chosenCategory)
  }
  
  return (
    <div className="startContainer">
      <div className='start'>
        <h1>Palavra Secreta de Química</h1>
        <div>
          <label htmlFor="category">Escolha a Categoria:</label>
          <select name="category" value={chosenCategory} onChange={(event) => setChosenCategory(event.target.value)}>
            {categoryList}
          </select>
        </div>
        <button onClick={chooseProcess}>Começar a jogar</button>
      </div>
    </div>
  )
}

export default HomeScreen