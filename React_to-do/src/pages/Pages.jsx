import { Route,Routes } from "react-router-dom";
import Home from "./Home";
import AddItems from "./Add";
import To_do from "./To-do";
import CompletedItems from "./Completed";


export default function Pages() {
    return(
        <>
        <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddItems />} />
            <Route path="/to-do" element={<To_do />} />
            <Route path="/completed" element={<CompletedItems />} />

        </Routes>
        </>
    )
}