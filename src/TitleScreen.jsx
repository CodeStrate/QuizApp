import { useState } from 'react'
import './App.css'

//Components
import {AiFillSetting, AiFillPlayCircle } from 'react-icons/ai'
import Preferences from './components/Preferences'

//styled Components
import { Paragraph } from './styledComponents/Paragraph'
import { Title } from './styledComponents/Title'
import { Button } from './styledComponents/Button'
import QuizScreen from './components/QuizScreen'

function App() {

  const [openPrefs, setOpenPrefs] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [apiPrefs, setApiPrefs] = useState({
    amount : "",
    difficulty : "",
    type : "",
    category : ""
  })
  

  
  return (
    <main className="title--screen">
      <span onClick={() => setOpenPrefs(prevPrefs => !prevPrefs)} className='icon pref'>
      <AiFillSetting />
      </span>
      <span className='icon music'>
      <AiFillPlayCircle />
      </span>
      <Preferences open={openPrefs} prefState={apiPrefs} setPrefState={setApiPrefs} />
        
      {isPlaying ? <QuizScreen className={`container quiz ${openPrefs && "open"}`}
      apiParams={apiPrefs}/> :
      <div className={`container ${openPrefs && "open"}`}>
      <Title>The Quiz Ultra Pro Max</Title>
      <br />  
      <Paragraph>This is probably the `Ultimate` and Best version of Quizzical you'll experience!</Paragraph>
      <br />
      <Button onClick={() => setIsPlaying(prevPlaying => !prevPlaying)}>Begin Game</Button>
      </div>}
    </main>
  )
}

export default App
