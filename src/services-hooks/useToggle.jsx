import { useState } from "react";

export default function useToggle({value = false, onToggle = () => {}}){
    const [on, setOn] = useState(value)

    function toggle(){
        setOn(prevOn => !prevOn)
    }

    return [on, toggle]
}