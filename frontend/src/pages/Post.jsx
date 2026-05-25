import axios from "axios";
import { useEffect, useState } from "react";


export default function Post() {
    const [Posts, setPosts] = useState([])
    const token = localStorage.getItem("token");

    const [error, setError] = useState("");
    const [PostData, setPostData] = useState("");

    const handleChange = (e) => {
        setPostData(e.target.value);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:3001/post",
                {
                    postName: PostData
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setError(res.data.message);

            setPostData("");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                err.message
            );

        }

    };
    const GetPosts = async () => {
        try {
            const res = await axios.get('http://localhost:3001/post', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setPosts(res.data.results)


        } catch (err) {
            setError(err.message || err)
        }
    }
    useEffect(() => {
    GetPosts();
}, []);
    return (
<>
<div className="bg-white shadow-lg rounded-xl p-6 max-w-md">

            <h1 className="text-2xl font-bold mb-6">
                Create Post
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>

                    <label className="block mb-2 font-medium">
                        Post Name
                    </label>

                    <input
                        type="text"
                        value={PostData}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        placeholder="Enter post name"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white rounded-lg p-3 hover:bg-green-700"
                >
                    Add Post
                </button>

            </form>

            {error && (

                <p className="mt-4 text-red-500">
                    {error}
                </p>

            )}

        </div>

<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
                Posts
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Post ID
                            </th>

                            <th className="p-4 text-left">
                                Post Name
                            </th>

                        </tr>

                    </thead>

                    <tbody>

    {Posts.length < 1 ? (

        <tr>
            <td
                colSpan="2"
                className="text-center p-4"
            >
                No posts found
            </td>
        </tr>

    ) : (

        Posts.map((datas) => (

            <tr
                key={datas.postId}
                className="border-b hover:bg-gray-50"
            >

                <td className="p-4">
                    {datas.postId}
                </td>

                <td className="p-4">
                    {datas.postName}
                </td>

            </tr>

        ))

    )}

</tbody>

                </table>

            </div>

        </div>
</>
        

    );
}