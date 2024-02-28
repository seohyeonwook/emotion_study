import { useState } from "react";

export function useInput() {
    const [ inputValue, setInputValue ] = useState("");

    const onChange = (e) => {
        const { value } = e.target;
        setInputValue(() => value);
            // value 리턴값
        } 
        return [ inputValue, onChange ];
    }
/**
 * 
 * @param {*} maxSize 
 * @returns 
 */
export function useMaxValueValidateInput(maxSize) {
    const [ inputValue, setInputValue ] =useState("");

    const onChange = (e) => {
        const { value } = e.target;
        if(value.length < maxSize ){
            setInputValue(() => value);
        }
        
            // value 리턴값
    } 
     return [ inputValue, onChange ];
}

   
