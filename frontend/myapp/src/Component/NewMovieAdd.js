import React, { useState } from "react";

function NewMovieAdd() {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    duration: "",
    description: "",
    image_url: "",
    likeCount: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        alert("Movie data posted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add New Movie
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Movie</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                {[
                  { label: "Title", name: "title" },
                  { label: "Duration", name: "duration" },
                  { label: "Description", name: "description" },
                  { label: "Image URL", name: "image_url" },
                  { label: "Like Count", name: "likeCount" },
                ].map(({ label, name }) => (
                  <div className="mb-3" key={name}>
                    <label className="form-label">{label}:</label>
                    <input
                      type={name === "likeCount" || name === "id" ? "number" : "text"}
                      className="form-control"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save Movie</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewMovieAdd;
