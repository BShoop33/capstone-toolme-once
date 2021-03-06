import React, { useState, createContext } from "react"

export const LendContext = createContext()

export const LendProvider = (props) => {
    const [tool, setTools] = useState([])

    const addTools = (tools) => {
        return fetch("http://localhost:8088/Toolstable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tools)
        })
            .then(getTools)
    }

    const deleteTool = (toolId) => {
        return fetch(`http://localhost:8088/Toolstable/${toolId}`, {
            method: "DELETE"
        })
            .then(getTools)
    }

    const editTools = tool => {
        return fetch(`http://localhost:8088/Toolstable/${tool.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tool)
        })
            .then(getTools)
    }

    const getTools = () => {
        return fetch(`http://localhost:8088/Toolstable?lenderId=${localStorage.getItem("ToolMeOnce_Member")}`)
            .then(res => res.json())
            .then(setTools)
    }

    const getToolById = (id) => {
        return fetch(`http://localhost:8088/Toolstable/${id}`)
            .then(res => res.json())
    }

    return (
        <LendContext.Provider value={{
            addTools, deleteTool, editTools, getToolById, getTools, tool
        }}>
            {props.children}
        </LendContext.Provider>
    )
}