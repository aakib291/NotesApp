import React, { useState } from 'react'
import { postData, updateData } from '../apis/PostApi';
import { useEffect } from 'react';

function NotesForm({ data, SetData, updateDataApi, setUpdateDataApi }) {

  //State for Add data
  const [addData, SetAddData] = useState({
    title: "",
    body: ""

  });

  // Function for input changge when input fields had data
  const HandleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    //Setting state for inputed data
    SetAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };

    });

  };

  ///Add postdata fqn
  const addPostData = async () => {
    const res = await postData(addData)
    console.log("res", res);

    if (res.status === 201) {
      SetData([...data, res.data]);
      SetAddData({
        title: "",
        body: ""
      });
    }
  }

  //Update postdata fqn
  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        SetData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === updateDataApi.id ? res.data : curElem;
          });
        });
      }

      SetAddData({
        title: "",
        body: ""
      });

      setUpdateDataApi({});


    } catch (error) {
      console.log(error)
    }
  }

  //Form Submit fqn 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Update") {
      updatePostData();
    }
  };

  // let isEmpty = Object.keys(updateDataApi).lenght === 0;
  let isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi && SetAddData({
      title: updateDataApi.title || "",
      body: updateDataApi.body || ""
    })
  }, [updateDataApi])

  const { title, body } = addData;

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" placeholder='Add Title' id='title' name='title' value={title} onChange={HandleInputChange} />
      </div>

      <div>
        <label htmlFor="body">Note</label>
        <input type="text" placeholder='Add Note' id='body' name='body' value={body} onChange={HandleInputChange} />
      </div>

      <button type='submit' className=" relative p-2 text-white bg-blue-500 border-0 py-2 px-5 focus:outline-none hover:bg-blue-600 rounded"
        value={isEmpty ? "Add" : "Update"}>
        {isEmpty ? "Add" : "Update"}  </button>

    </form>
  )
}

export default NotesForm