import { useEffect } from "react";

const useClickOutside = (handler, domNode) => {

    useEffect(() => {
        let maybeHandler = (e) =>{
            if(!domNode.current.contains(e.target)){
                handler()
            }
          
        }

        document.addEventListener("mousedown", maybeHandler)

        return () => {
            document.removeEventListener("mousedown", maybeHandler)
        }
        
    })
   
}

export default useClickOutside