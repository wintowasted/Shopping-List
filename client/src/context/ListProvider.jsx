import {createContext, useState} from 'react'

const ListContext = createContext({})

export const ListProvider = ({children}) => {
    const [lists, setLists] = useState([])

    return (
        <ListContext.Provider value={{lists, setLists}}>
            {children}
        </ListContext.Provider>
    )
}

export default ListContext