import { useEffect, useRef } from "react";

export default function useEffectOnUpdate(effect, dependencies){
    const firstrender = useRef(true)

    useEffect(() => {
        if(firstrender.current) firstrender.current = false
        else effect()
    }, dependencies)
}