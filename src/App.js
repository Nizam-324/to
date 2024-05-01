import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState(() => {
        return JSON.parse(localStorage.getItem("toDos")) || [];
    });
    const [completedDos, setCompletedDos] = useState(() => {
        return JSON.parse(localStorage.getItem("completedDos")) || [];
    });
    const date = new Date();
    const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        weekday: "long",
    };

    // Save tasks to local storage whenever there's a change
    useEffect(() => {
        localStorage.setItem("toDos", JSON.stringify(toDos));
        localStorage.setItem("completedDos", JSON.stringify(completedDos));
    }, [toDos, completedDos]);


    const [showCompleted, setShowCompleted] = useState(false);

    const toggleCompletedVisibility = () => {
        setShowCompleted(!showCompleted);
    };


    return (
        <div className="app">
            <div className="mainHeading">
                <h1>To Do List</h1>
            </div>
            <div className="input">
                <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="Whats your task?" />
                <i
                    onClick={() => {
                        setToDos([
                            ...toDos,
                            {
                                id: Date.now(),
                                text: toDo,
                                status: false,
                                date: date.toLocaleString("en-IN", options),
                            },
                        ]);
                        setToDo("");
                    }}
                    // className="fas fa-plus"
                    className="material-symbols-outlined"
                >
                    add_circle
                </i>
            </div>
            <div className="content">
                <div className="todos">
                    <h2>Task To Do</h2>
                    {toDos.map((obj) => {
                        return (
                            <div className="todo">
                                <div className="left">
                                    <span>
                                        <input
                                            onChange={(e) => {
                                                console.log(e.target.checked);
                                                console.log(obj);

                                                setToDos(
                                                    toDos.filter((obj2) => {
                                                        if (obj2.id === obj.id) {
                                                            obj2.status = e.target.checked;
                                                            if (obj2.status) {
                                                                setCompletedDos([...completedDos, obj2]);
                                                                return null;
                                                            }
                                                        }
                                                        return obj2;
                                                    })
                                                );
                                            }}
                                            value={obj.status}
                                            checked={false}
                                            type="checkbox"
                                            name=""
                                            id=""
                                        />
                                    </span>
                                    <div className="text">
                                        <p> {obj.text} </p>
                                        <p className="date"> {obj.date} </p>
                                    </div>
                                </div>

                                <div className="right">
                                    <i
                                        onClick={(e) => {
                                            setToDos(
                                                toDos.filter((obj2) => {
                                                    if (obj2.id === obj.id) {
                                                        obj2 = null;
                                                    }
                                                    return obj2;
                                                })
                                            );
                                        }}
                                        className="fas fa-times"
                                    ></i>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="completed-todo">
                <h2 onClick={toggleCompletedVisibility}>Completed <i className="material-symbols-outlined">expand_more</i> </h2>
                    {completedDos.map((obj) => {
                        if (obj.status) {
                            return (
                                <div className={`todo ${showCompleted && "show"}`}>
                                    <div className="left">
                                        <span>
                                            <input
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;

                                                    setCompletedDos(
                                                        completedDos.filter((obj2) => {
                                                            if (obj2.id === obj.id) {
                                                                obj2.status = isChecked;
                                                                if (!isChecked) {
                                                                    setToDos([...toDos, obj2]);
                                                                    return null;
                                                                }
                                                            }
                                                            return obj2;
                                                        })
                                                    );
                                                }}
                                                checked={true}
                                                type="checkbox"
                                                name=""
                                                id=""
                                            />
                                        </span>
                                        <div className="text">
                                            <p> {obj.text} </p>
                                            <p className="date"> {obj.date} </p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <i
                                            onClick={(e) => {
                                                setCompletedDos(
                                                    completedDos.filter((obj2) => {
                                                        if (obj2.id === obj.id) {
                                                            obj2 = null;
                                                        }
                                                        return obj2;
                                                    })
                                                );
                                            }}
                                            className="fas fa-times"
                                        ></i>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
