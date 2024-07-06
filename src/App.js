import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
    const [writeTodo, setWriteTodo] = useState(false);
    const [toDo, setToDo] = useState("");
    const [toDoNote, setToDoNote] = useState("");
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

    const [showTaskNote, setShowTaskNote] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const filteredToDos = toDos.filter((obj) => obj.text.toLowerCase().includes(searchQuery.toLowerCase()) || obj.note.toLowerCase().includes(searchQuery.toLowerCase()) || obj.date.toLowerCase().includes(searchQuery.toLowerCase()));

    const filteredCompletedDos = completedDos.filter((obj) => obj.text.toLowerCase().includes(searchQuery.toLowerCase()) || obj.note.toLowerCase().includes(searchQuery.toLowerCase()) || obj.date.toLowerCase().includes(searchQuery.toLowerCase()));

    const [toggle, setToggle] = useState(1);
    function updateToggle(id) {
        setToggle(id);
    }

    return (
        <div className="app">
            <div className="mainHeading">
                <h1>TickDo</h1>
            </div>
            {writeTodo && (
                <div className="content-writer">
                    <div className="input">
                        <input value={toDo} onChange={(e) => setToDo(e.target.value)} required type="text" placeholder="Whats your task?" />
                        <textarea value={toDoNote} onChange={(e) => setToDoNote(e.target.value)} type="text" cols="10" rows="20" placeholder="Whats your note?" />

                        <div className="btns">
                            <i className="material-symbols-outlined close" onClick={() => setWriteTodo(false)}>
                                cancel <span>close</span>
                            </i>

                            <i
                                onClick={() => {
                                    setToDos([
                                        ...toDos,
                                        {
                                            id: Date.now(),
                                            text: toDo,
                                            note: toDoNote,
                                            status: false,
                                            date: date.toLocaleString("en-IN", options),
                                        },
                                    ]);
                                    setToDo("");
                                    setToDoNote("");
                                    setWriteTodo(false);
                                }}
                                // className="fas fa-plus"
                                className="material-symbols-outlined"
                            >
                                add_circle <span>Add</span>
                            </i>
                        </div>
                    </div>
                </div>
            )}
            <div className="search-add">
                <div className="search">
                    <i className="material-symbols-outlined">search</i>
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search tasks or notes" />
                </div>
                <div className="add-task-note-btn" onClick={() => setWriteTodo(true)}>
                    <i className="material-symbols-outlined">add_circle</i>
                </div>
            </div>
            <div className="headings">
                <h2 style={toggle === 1 ? { color: "#fff" } : { color: "#ffffff89" }} onClick={() => updateToggle(1)}>
                    Tasks To Do
                </h2>
                <h2 style={toggle === 2 ? { color: "#fff" } : { color: "#ffffff89" }} onClick={() => updateToggle(2)}>
                    Completed
                </h2>
            </div>

            <div className="content">
                <div className="todos">
                    {toggle === 1 &&
                        filteredToDos.map((obj) => {
                            return (
                                <div className={showTaskNote === obj.id ? "todo show" : "todo"} onClick={() => setShowTaskNote(obj.id)} key={obj.id}>
                                    <div className="left">
                                        <span>
                                            <input
                                                onChange={(e) => {
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
                                            <p className="date"> {obj.date} </p>
                                            <p> {obj.text} </p>
                                            <p className="note">{obj.note}</p>
                                        </div>
                                    </div>

                                    <div className="right">
                                        {showTaskNote && (
                                            <i
                                                className="fas fa-times"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowTaskNote(null);
                                                }}
                                            ></i>
                                        )}

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
                                            className="material-symbols-outlined"
                                        >
                                            delete
                                        </i>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div className="completed-todo">
                    {toggle === 2 &&
                        filteredCompletedDos.map((obj) => {
                            if (obj.status) {
                                return (
                                    <div className={showTaskNote === obj.id ? "todo show" : "todo"} onClick={() => setShowTaskNote(obj.id)}>
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
                                                <p className="date"> {obj.date} </p>
                                                <p> {obj.text} </p>
                                                <p className="note">{obj.note}</p>
                                            </div>
                                        </div>
                                        <div className="right">
                                            {showTaskNote && (
                                                <i
                                                    className="fas fa-times"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowTaskNote(null);
                                                    }}
                                                ></i>
                                            )}

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
                                                className="material-symbols-outlined"
                                            >
                                                delete
                                            </i>
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
