import { useReducer } from 'react'
import './App.css'

//Components
import {AiFillSetting, AiFillPlayCircle } from 'react-icons/ai'
import Preferences from './components/Preferences'
import useToggle from './services-hooks/useToggle'

//styled Components
import { Paragraph } from './styledComponents/Paragraph'
import { Title } from './styledComponents/Title'
import { Button } from './styledComponents/Button'
import QuizScreen from './components/QuizScreen'

function App() {

  const [openPrefs, togglePrefs] = useToggle(false)
  const [isPlaying, togglePlaying] = useToggle(false)
  
  const initialPrefState = {
    amount : "5",
    difficulty : "",
    type : "",
    category : ""
  }

  function prefReducer(state, action){
    switch (action.type) {
      case 'update':
        return {
          ...state,
          [action.name] : action.value
        }
      case 'reset':
        return {
          amount : "5",
          difficulty : "",
          type : "",
          category : ""
        }
      default:
        return state
    }
  }

  const [apiPrefs, dispatch] = useReducer(prefReducer, initialPrefState)

  
  return (
    <main className="title--screen">
      <span onClick={togglePrefs} className='icon pref'>
      <AiFillSetting />
      </span>
      <span className='icon music'>
      <AiFillPlayCircle />
      </span>
      <Preferences open={openPrefs} prefState={apiPrefs} prefDispatch={(action) => dispatch(action)} />
        
      {isPlaying ? <QuizScreen className={`container quiz ${openPrefs && "open"}`}
      apiParams={apiPrefs}/> :
      <div className={`container ${openPrefs && "open"}`}>
      <Title>The Quiz Ultra Pro Max</Title>
      <br />  
      <Paragraph>This is probably the `Ultimate` and Best version of Quizzical you'll experience!</Paragraph>
      <br />
      <Button onClick={togglePlaying}>Begin Game</Button>
      </div>}
    </main>
  )
}

export default App
