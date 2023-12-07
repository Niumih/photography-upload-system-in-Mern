import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditSnapContainer = styled.div`
  margin: 3rem auto;
  padding: 4rem;
  width: 31.25rem;

  h1 {
    font-weight: 900;
  }

  .btn-primary {
    margin-top: 2rem;
    background: var(--dark-orange);
    border: none;

    &:hover {
      background: var(--light-orange);
    }
  }

  .message {
    font-weight: 900;
    color: tomato;
    padding: 1rem 1rem 1rem 0;
  }
`;

export const EditSnap = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const { id } = useParams();

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4080/snaps/${id}`)
        .then((res) => {
          setTitle(res.data.title || '');
          setDescription(res.data.description || '');
          setPhotographer(res.data.photographer || '');
          setFileName(res.data.snapImage || '');
          setDate(res.data.date || '');
          setTime(res.data.time || '');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('photographer', photographer);
    formData.append('snapImage', fileName);
    formData.append('date', date);
    formData.append('time', time);

    if (id) {
      axios
        .put(`/snaps/update/${id}`, formData)
        .then((res) => {
          setMessage('Snap updated successfully.');
          console.log(res.data);
        })
        .catch((err) => {
          setMessage('Error updating snap.');
          console.log(err);
        });
    }
  };

  return (
    <EditSnapContainer>
      <div className="container">
        <h1>Edit Snap</h1>
        {message && (
          <span className="message">{message}</span>
        )}
        <form onSubmit={changeOnClick} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="photographer">Photographer</label>
            <input
              type="text"
              value={photographer}
              onChange={(e) => setPhotographer(e.target.value)}
              className="form-control"
              id="photographer"
              placeholder="Photographer"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
              id="date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Choose Image</label>
            <input type="file" name="snapImage" className="form-control-file" onChange={onChangeFile} />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Snap
          </button>
        </form>
      </div>
    </EditSnapContainer>
  );
};

export default EditSnap;
