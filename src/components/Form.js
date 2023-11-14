import React, { useState } from 'react';
import '../css/Form.css';
import axios from 'axios'; 
import FileBase64 from "react-file-base64";


export default function Form({ onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(localStorage.getItem('name') || '');
  const [attachment, setAttachment] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postData = {
        title,
        content,
        author,
        attachment,
      }; 


      await axios.post('http://localhost:3001/api/v1/posts', postData);
      onSave();
      setTitle('');
      setContent('');
      setAuthor('');
      setAttachment('');
    } catch (error) {
      console.log(error);
    }
  }; 

  console.log("attachment", attachment);

  return (
    <section className="form-section">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          className="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          type="text"
          name="content"
          id="content"
          className="content"
          placeholder="what's happening?"
          value={content}
          onChange={handleContentChange}
        />
        <input
          type="text"
          name="author"
          id="author"
          className="title author"
          placeholder="Author"
          value={author} 
          disabled="disabled"
          onChange={handleAuthorChange}
        />
      <FileBase64
        accept="image/*"
        multiple={false}
        type="file"
        value={attachment.image}
        onDone={({ base64 }) =>  
          setAttachment(base64)
        }
      /> 
      <p>{attachment.image}</p>
        <button type="submit" className="bnt">
          POST
        </button>
      </form>
    </section>
  );
}