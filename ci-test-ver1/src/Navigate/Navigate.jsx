import { Router, Route, Routes } from "react-router-dom";
import Home from "../Layout/Home/Home";

const Navigate = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default Navigate;
