import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Backend_Url } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full">
                <div className="max-w-screen-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e) => {
                        setTitle(e.target.value)
                    }} type="email" id="helper-text" aria-describedby="helper-text-explanation"
                        className="border border-gray-700 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title" />
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="max-w-screen-lg w-full">
                    <TextEditor onChange={(e) => {
                        setContent(e.target.value)
                    }} />
                    <div className="flex justify-center mt-4">
                        <button onClick={async () => {
                            const response = await axios.post(`${Backend_Url}/api/v1/blog`, {
                                title,
                                content
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            });
                            navigate(`/blog/${response.data.id}`)
                        }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Publish post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="w-full pt-6">
            <form>
                <div className="w-full mb-4 rounded-lg bg-white dark:bg-white">
                    <div className="px-4 py-2 bg-white rounded-lg dark:bg-white">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className="p-6 block w-full px-0 text-sm text-gray-800 bg-white border border-black rounded-lg dark:bg-white focus:ring-0 dark:text-black dark:placeholder-gray-700 focus:outline-none focus:border-blue-500" placeholder="Write an article..." required autoFocus></textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}
