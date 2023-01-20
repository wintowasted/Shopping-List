import { useContext } from "react";
import ListContext from "../context/ListProvider";

const useLists = () => {
    return useContext(ListContext)
}

export default useLists