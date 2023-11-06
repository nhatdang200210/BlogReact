import React, { useState } from 'react';
import '../css/Form.css';
import axios from 'axios';

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

  const handleAttachmentChange = (event) => {
    setAttachment(event.target.value);
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
      // Call the onSave function with the form data
      onSave();
      // Reset the form fields
      setTitle('');
      setContent('');
      setAuthor('');
      setAttachment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="form-section">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          type="text"
          name="content"
          id="content"
          className="input"
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
        />
        <input
          type="text"
          name="author"
          id="author"
          className="input"
          placeholder="Author"
          value={author}
          onChange={handleAuthorChange}
        />
        <input
          type="text"
          name="attachment"
          id="attachment"
          className="input"
          placeholder="Attachment"
          value={attachment}
          onChange={handleAttachmentChange}
        />
        <button type="submit" className="btn">
          Save
        </button>
      </form>
    </section>
  );
}