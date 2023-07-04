import React, { useState } from "react";
import { addStore } from "../../Redux/actions/actions";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import FileBase64 from 'react-file-base64';

const AddingStoreToDB = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(" "); 
  const [selling, setSelling] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDesc = (e) => {
    setDescription(e.target.value);
  };
  const handleSelling = (e) => {
    const selectedSelling = Array.from(e.target.selectedOptions).map(
      (option) => ({
        type: option.value,
      })
    );
    setSelling(selectedSelling);
  };
  const handlePicture = (e) => {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setPicture(reader.result);
    };
    reader.onerror = (error) => {
      console.log(`Error`, error);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      description,
      picture,
      selling,
    };
    console.log(`from clinet`, formData);
    dispatch(addStore(formData));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Add New Store</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleName} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={handleDesc} />
        </label>
        <div>
          <label>
            Images:{" "}
            <input
              accept="images/*"
              type="file"
              onChange={handlePicture}
            ></input>
          </label>
          {picture === "" || picture === null ? (
            " "
          ) : (
            <img width={100} height={100} src={picture} alt="storePicture" />
          )}
        </div>
        <label>
          Selling:
          <select multiple onChange={handleSelling}>
            <option value="Clothes">Clothes</option>
            <option value="Books">Books</option>
            <option value="Shorts">Shorts</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddingStoreToDB;
