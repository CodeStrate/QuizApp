import RadioButton from './RadioButton'
import { PrefButton } from '../styledComponents/Button'
import CategoryData from '../../CategoryData'
import { SubTitle } from '../styledComponents/SubTitle'
import { useEffect } from 'react'

export default function Preferences({open, prefState, setPrefState}){
    // data arrays for mapping
    const numQues = [5, 10, 15, 20]
    const diff = ['easy', 'medium', 'hard']

    const initialPrefState = {
        amount : "",
        difficulty : "",
        type : "",
        category : ""
      }

    function handleChange(event) {
        const {name , value } = event.target
        setPrefState(prevState => {
            return {...prevState, [name] : value}
        })
       
     }

    // useEffect(() => {
    //     console.log(prefState)
    // }, [prefState])

    function handlePrefReset() {
        setPrefState(initialPrefState)
    }


    const numQuesComponents = numQues.map(num => {
            return <RadioButton 
            key={`key_${num}`} 
            id={`${num}ques`} 
            name='amount' 
            value={num}
            onChange={handleChange}
            checked={prefState.amount === num.toString()}
            >{num}
            </RadioButton>
    })
    
    const diffComponents = diff.map((d, index) => {
        return <RadioButton 
        key={index} 
        id={`${d}ques`} 
        name='difficulty' 
        value={d} 
        variant={d}
        onChange={handleChange}
        checked={prefState.difficulty === d}    
        >{d.charAt(0).toUpperCase() + d.slice(1)}
        </RadioButton>
    })
    
    const categoryComponents = CategoryData.map(item => {
        return <RadioButton 
        key={item.ID} 
        id={`category${item.CategoryID}`} 
        name='category' 
        value={item.CategoryID}
        onChange={handleChange}
        checked={prefState.category === item.CategoryID.toString()}
        >{item.CategoryName}
        </RadioButton>
    })
    
    const typeComponents = [
        <RadioButton 
        key={1} 
        id='multi' 
        name='type' 
        value='multiple'
        onChange={handleChange}
        checked={prefState.type === 'multiple'}    
        >Multiple</RadioButton>,
        
        <RadioButton 
        key={2} 
        id='bool' 
        name='type' 
        value='boolean'
        onChange={handleChange}
        checked={prefState.type === 'boolean'}    
        >Boolean</RadioButton>
    ]

    return (
        <div className={`pref-container ${open ? "" : "close"}`}>
            <SubTitle>Number of Questions</SubTitle>
            {numQuesComponents}
            <SubTitle>Difficulty</SubTitle>
            {diffComponents}
            <SubTitle>Type</SubTitle>
            {typeComponents}
            <SubTitle>Category</SubTitle>
            {categoryComponents}
            <hr></hr>
        <div className="buttons">
            <PrefButton>Save Prefs</PrefButton>
            <PrefButton onClick={handlePrefReset}>Reset Prefs</PrefButton>
        </div>
        </div>
    )
}