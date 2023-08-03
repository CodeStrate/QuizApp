import RadioButton from './RadioButton'
import { PrefButton } from '../styledComponents/Button'
import CategoryData from '../../CategoryData'
import { SubTitle } from '../styledComponents/SubTitle'
import useEffectOnUpdate from '../services-hooks/useEffectOnUpdate'

export default function Preferences({open, prefState, prefDispatch}){
    // data arrays for mapping
    const numQues = [5, 10, 15, 20]
    const diff = ['easy', 'medium', 'hard']

    function handleChange(event) {
        const {name , value } = event.target
        const newValue = name === "amount" ? value.toString() : value
        prefDispatch({type: 'update', name, newValue})
       
     }

    function handlePrefReset() {
        prefDispatch({type: 'reset'})
    }

    useEffectOnUpdate(() => console.log(prefState), [prefState])


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
        >{d[0].toUpperCase() + d.slice(1)}
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