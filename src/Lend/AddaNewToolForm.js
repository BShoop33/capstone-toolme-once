import React, { useContext, useEffect, useState } from "react"
import { LendContext } from "./LendDataProvider.js"
import { useHistory, useParams } from 'react-router-dom';
import "./AddaNewTool.css"

export const AddToolPage = () => {
    const { getTools, getToolById, editTools, addTools, deleteTool } = useContext(LendContext)

    const [Tool, setNewTool] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { toolId } = useParams()
    const history = useHistory()
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ToolMeOnce')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dstfvbrwf/image/upload',
            {
                method: 'POST',
                body: data
            }
        )

        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
    }

    const handleControlledInputChange = (event) => {
        const addedTool = { ...Tool }

        addedTool[event.target.name] = event.target.value
        setNewTool(addedTool)
    }

    useEffect(() => {
        getTools().then(() => {
            if (toolId) {
                getToolById(toolId)
                    .then(NewTool => {
                        setNewTool(NewTool)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const toolstatus = true;

    const constructToolObject = () => {
        setIsLoading(true)
        if (toolId) {
            editTools({
                id: Tool.id,
                userid: localStorage.getItem("ToolMeOnce_Member"),
                lenderid: localStorage.getItem("ToolMeOnce_Member"),
                borrowerid: Tool.borrowerid,
                imageurl: Tool.imageurl,
                toolstatus: toolstatus,
                toolname: Tool.AddToolNameInput,
                tooldescription: Tool.AddToolDescriptionInput,
                toolspecs: Tool.AddToolSpecificationsInput,
                toolaccessories: Tool.AddToolAccessoriesInput
            })
                .then(() => history.push("/Lend"))
        }
        else {
            addTools({
                id: Tool.id,
                userid: localStorage.getItem("ToolMeOnce_Member"),
                lenderId: localStorage.getItem("ToolMeOnce_Member"),
                imageurl: Tool.imageurl,
                toolstatus: toolstatus,
                toolname: Tool.AddToolNameInput,
                tooldescription: Tool.AddToolDescriptionInput,
                toolspecs: Tool.AddToolSpecificationsInput,
                toolaccessories: Tool.AddToolAccessoriesInput
            })
                .then(() => history.push("/Lend"))
        }
    }

    let AddToolSpecificationsInput
    let AddToolAccessoriesInput

    return (
        <>
            <body className="addToolMain">
                <div className="AddTool">
                    {/* <h2 className="AddToolTitle">Add a New Tool</h2>    {chatId ? "Edit Message" : "Add Message"} */}
                    <div className="NewToolContainer">

                        <img className="AddToolPicture" src="/Images/Cat.jpg" alt="Logo" />
                        <div className="NewToolInputs">
                            <div className="AddToolNameInputBorder">
                                <input type="text" id="AddToolNameInput" name="AddToolNameInput" required autoFocus className="AddToolNameInput"
                                    onChange={handleControlledInputChange}
                                    placeholder="Enter your tool's name here"
                                />
                            </div>
                            <div className="AddToolDescriptionInputBorder">
                                <textarea id="AddToolDescriptionInput" name="AddToolDescriptionInput" required autoFocus className="AddToolDescriptionInput"
                                    onChange={handleControlledInputChange}
                                    placeholder="Enter your tool's description here"
                                />
                            </div>
                            <div className="AddToolSpecificationsInputBorder">
                                <textarea id="AddToolSpecificationsInput" name="AddToolSpecificationsInput" required autoFocus className="AddToolSpecificationsInput"
                                    onChange={handleControlledInputChange}
                                    placeholder="Enter your tool's specifications here"
                                />
                            </div>
                            <div className="AddToolAccessoriesInputBorder">
                                <textarea id="AddToolAccessoriesInput" name="AddToolAccessoriesInput" required autoFocus className="AddToolAccessoriesInput"
                                    onChange={handleControlledInputChange}
                                    placeholder="Enter your tool's accessories here"
                                />
                            </div>
                            <div className="AddToolButtonsContainer">
                                <button className="AddToolSaveButton"
                                    onClick={event => {
                                        event.preventDefault() // Prevent browser from submitting the form
                                        constructToolObject()
                                        history.push(`/lend`)
                                    }}

                                    type="button">Save Tool</button>
                                <button className="AddToolCancelButton"
                                    onClick={() => { history.push(`/lend`) }}
                                    type="button">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            <footer className="LendPageFooter">&copy; Tool Me Once, 2020</footer>
        </>
    )
}


// function App() {
//     const [image, setImage] = useState('')
//     const [loading, setLoading] = useState(false)

//     const uploadImage = async e => {
//         const files = e.target.files
//         const data = new FormData()
//         data.append('file', files[0])
//         data.append('upload_preset', 'ToolMeOnce')
//         setLoading(true)
//         const res = await fetch(
//             'https://api.cloudinary.com/v1_1/dstfvbrwf/image/upload',
//             {
//                 method: 'POST',
//                 body: data
//             }
//         )

//         const file = await res.json()
//         setImage(file.secure_url)
//         setLoading(false)
//     }



//     return (
//         <form>
//             <script src="jquery-3.5.1.min.js"></script>
//             <h1>Upload Testing</h1>

//             <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} className="cloudinary-fileupload" data-cloudinary-field="image_id" data-form-data=" --- Data-JSON --- " />

//             {loading ? (
//                 <h3> Loading . . . </h3>
//             ) : (
//                     <img src={image} style={{ width: '300px' }} />
//                 )}




//         </form>
//     )
// }

// export default App;



