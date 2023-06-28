import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Body.css";
const Body = ({ keyFilter }) => {
    const [detail, setDetail] = useState("");
    const [listDetails, setListDetails] = useState(() => {
        const storedTasks = localStorage.getItem("details");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        const storageDetails = localStorage.getItem("details");
        if (storageDetails) {
            setListDetails(JSON.parse(storageDetails));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("details", JSON.stringify(listDetails));
        // console.log(listDetails);
    }, [listDetails]);

    const handleAdd = () => {
        if (detail.trim() != "") {
            setListDetails((prev) => {
                const newDetail = {
                    id: new Date().getTime(),
                    detail: detail,
                    completed: false,
                };
                const newDetails = [...prev, newDetail];
                localStorage.setItem("details", JSON.stringify(newDetails));
                return newDetails;
            });
        }

        setDetail("");
    };

    const handleDetailCompleted = (parmIdDetail) => {
        const updateListDetail = listDetails.map((itemDetail) => {
            if (itemDetail.id === parmIdDetail) {
                return {
                    ...itemDetail,
                    completed: !itemDetail.completed,
                };
            }
            return itemDetail;
        });

        // console.log(updateListDetail);

        setListDetails(updateListDetail);
    };

    const handleDetailDelete = (parmIdDetail) => {
        // console.log("sdsad");
        const confirm = window.confirm("Bạn có chắc muốn xoá !!!");
        if (confirm) {
            const updateListDetail = listDetails.filter(
                (itemDetail) => itemDetail.id !== parmIdDetail
            );
            setListDetails(updateListDetail);
        }
    };

    const handleDeleteAll = () => {
        const confirm = window.confirm("Bạn có chắc muốn xoá tất cả không !!!");
        if (confirm) {
            setListDetails([]);
        }
    };

    const filterDetails = listDetails.filter((itemDetail) => {
        if (keyFilter === "all") {
            return true;
        } else if (keyFilter === "active") {
            return !itemDetail.completed;
        } else if (keyFilter === "completed") {
            return itemDetail.completed;
        }
        return true;
    });

    return (
        <div className="bd-wrapper">
            <div className="inp">
                <input
                    className="inp-form"
                    placeholder="add details"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                ></input>
                <button className="inp-btn" onClick={handleAdd}>
                    Add
                </button>
            </div>
            <ul className="result">
                {filterDetails.map((itemDetail) => {
                    return (
                        <li key={itemDetail.id}>
                            <input
                                className="mr-c"
                                type="checkbox"
                                checked={itemDetail.completed}
                                onChange={() =>
                                    handleDetailCompleted(itemDetail.id)
                                }
                            />
                            <span
                                style={{
                                    textDecoration: itemDetail.completed
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {itemDetail.detail}
                            </span>
                            <Link
                                className="mr-c btn-delete"
                                onClick={() =>
                                    handleDetailDelete(itemDetail.id)
                                }
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {listDetails.length > 0 && (
                <button
                    className="inp-btn"
                    style={{ backgroundColor: "red" }}
                    onClick={handleDeleteAll}
                >
                    Delete All
                </button>
            )}
        </div>
    );
};

export default Body;
