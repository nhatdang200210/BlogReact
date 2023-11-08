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

        <input
          type="text"
          name="image"
          className="imgadd"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="author"
          className="authornews"
          placeholder="Author"
          onChange={handleInputChange}
        />

        <button type="submit" className="bnt">Save</button>
        <button onClick={handleCloseModal} className="bntnew">Close</button>
      </form>
    </section>
  );
}

export default FormNews;
