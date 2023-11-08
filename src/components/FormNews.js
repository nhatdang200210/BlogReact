import axios from "axios";
import { useEffect, useState } from "react"; 
import '../css/FormNews.css'

function FormNews() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    author: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        author: name,
      }));
    }
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/news",
        formData
      );
      console.log("Post created:", response.data);
      // Reset form data and close modal
      setFormData({
        title: "",
        image: "",
        content: "",
        author: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <div className="form-news-bg">
      <form onSubmit={handleFormSubmit}>
      <h3>Add Post</h3>
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Post content"
          value={formData.content}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
        <button onClick={handleCloseModal}>Close</button>
      </form>
    </div>
  );
}

export default FormNews;
