import { useState, useEffect } from 'react';
import axios from 'axios';

const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
        setIsFacingUp (isUp => !isUp)
    };
    return [isFacingUp, flipCard];
}

const useAxios = (keyInLS, baseUrl) => {
    const [array, setArray] = useLocalStorage(keyInLS);
    const addToArray = async (restOfUrl='') => {
        const response = await axios.get(`${baseUrl}${restOfUrl}`);
        setArray([...array, response.data])
    }
    const deleteArray = () => {
        setArray([]);
    }
    return [array, addToArray, deleteArray];
}

const useLocalStorage= (keyInLS, initialValue=[]) => {
    if (localStorage.getItem(keyInLS)) {
        initialValue = JSON.parse(localStorage.getItem(keyInLS));
      }
      const [value, setValue] = useState(initialValue);
    
      useEffect(() => {
        localStorage.setItem(keyInLS, JSON.stringify(value));
      }, [value, keyInLS]);
    
      return [value, setValue];
}




export {useFlip, useAxios, useLocalStorage};