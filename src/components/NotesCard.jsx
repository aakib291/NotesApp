import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from '../apis/PostApi';
import { HttpStatusCode } from 'axios';
import NotesForm from './NotesForm';

function NotesCard() {

    const [data, SetData] = useState([]);

    const [updateDataApi, setUpdateDataApi] = useState({});

    const GetPostData = async () => {
        const post = await getPost();
        // console.log(post.data);
        SetData(post.data);
    }

    const DeletePostData = async (id) => {
        try {
            const deletepost = await deletePost(id);
            if (deletepost.status === 200) {
                const newData = data.filter((currPost) => {
                    return currPost.id !== id;
                });
                SetData(newData);
                console.log('Data of', { id }, ' is deleted successfully')
            }
            else {
                console.log('Failed to delete post', deletepost.status)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const HandleUpdatePost = (curElem) => setUpdateDataApi(curElem);

    useEffect(() => {
        GetPostData();
    }, [])

    return (
        <>

            <section className='section-form'>
                <NotesForm data={data} SetData={SetData}
                    updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}
                />
            </section>

            <section className="section-post">
                <div className="flex flex-wrap justify-end">
                    {
                        data.map((CurrElm) => {
                            const { id, body, title } = CurrElm;

                            return (
                                <div key={id} className="w-full md:w-1/3 p-4">
                                    <div className="max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 m-4 h-full">
                                        <div className="p-4 flex flex-col justify-between h-full">
                                            <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    {id}
                                                </div>
                                                <div>
                                                    <p className="mt-1 text-gray-600"><strong>Title:</strong> {title}</p>
                                                    <br />
                                                    <p className="mt-1 text-gray-600"><strong>Content:</strong> {body}</p>
                                                </div>
                                            </div>
                                            <div className='relative flex -mt-0 p-6'>
                                                <button className="flex mx-auto mt-6 text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded" onClick={() => HandleUpdatePost(CurrElm)}>Edit</button>
                                                <button className="flex mx-auto mt-6 text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded" onClick={() => DeletePostData(id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </>
    );




}

export default NotesCard