import { useState } from "react";
import Body from "../Body/Body";
import Header from "../Header/Header";

const Home = () => {
    const [filter, setFilter] = useState("all");
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <>
            <Header onFilterChange={handleFilterChange} />
            <Body keyFilter={filter} />
        </>
    );
};

export default Home;
