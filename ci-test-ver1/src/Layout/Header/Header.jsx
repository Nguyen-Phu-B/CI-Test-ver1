import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Body from "../Body/Body";
import "./Header.css";

const Header = ({ onFilterChange }) => {
    const [filter, setFilter] = useState("all");
    const [activeBtn, setActiveBtn] = useState(null);

    const handleFilterChange = (prFilter) => {
        setFilter(prFilter);
        setActiveBtn(prFilter);
    };

    useEffect(() => {
        onFilterChange(filter);
    }, [filter]);

    return (
        <header className="header-wrapper">
            <h1 className="">Todo...</h1>
            <ul className="nav-wrapper">
                <li>
                    <button
                        onClick={() => handleFilterChange("all")}
                        style={
                            activeBtn === "all"
                                ? { borderBottom: "1px solid #ccc" }
                                : null
                        }
                    >
                        All
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleFilterChange("active")}
                        style={
                            activeBtn === "active"
                                ? { borderBottom: "1px solid #ccc" }
                                : null
                        }
                    >
                        Active
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleFilterChange("completed")}
                        style={
                            activeBtn === "completed"
                                ? { borderBottom: "1px solid #ccc" }
                                : null
                        }
                    >
                        Completed
                    </button>
                </li>
            </ul>
        </header>
    );
};

export default Header;
