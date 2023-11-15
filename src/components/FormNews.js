import axios from "axios";
import FileBase64 from "react-file-base64";
import { useEffect, useState } from "react";
import "../css/FormNews.css";

function FormNews() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    author: localStorage.getItem("name"),
  });

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
    window.location.reload();
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
      alert("Successfully created news!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <section className="form-news-bg">
    <form onSubmit={handleFormSubmit}>
      <h2 className="h2">CREATE NEWS</h2>

      <input
        type="text"
        name="title"
        className="posttitle"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />

      <textarea
        name="content"
        placeholder="News content"
        className="contentnews"
        value={formData.content}
        onChange={handleInputChange}
      />

      {/* <input
    type="text"
    name="image"
    className="imgadd"
    placeholder="Image URL"
    value={formData.image}
    onChange={handleInputChange}
  /> */}
      <FileBase64
        accept="image/*"
        multiple={false}
        type="file"
        value={formData.image}
        onDone={({ base64 }) =>
          setFormData({ ...formData, image: base64 })
        }
      />

      <input
        type="text"
        name="author"
        className="authornews"
        placeholder="Author" 
        value={formData.author}
        onChange={handleInputChange}
      />

      <button type="submit" className="bnt">
        Save
      </button>
      <button onClick={handleCloseModal} className="bntnew">
        Close
      </button>
    </form>
  </section>
  );
}

export default FormNews;
