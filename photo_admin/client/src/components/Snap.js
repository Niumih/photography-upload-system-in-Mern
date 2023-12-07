import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MainContainer = styled.div`
  margin: 6rem auto;
  padding: 3rem 14rem;

  h2 {
    text-align: center;
    font-weight: 900;
    color: var(--dark-orange);
  }
`;

export const Snap = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [date, setDate] = useState('');


  useEffect(() => {
    if (props && props.match && props.match.params && props.match.params.id) {
      const postId = props.match.params.id;

      axios
        .get(`http://localhost:4080/snaps/${postId}`)
        .then((res) => {
          setTitle(res.data.title || '');
          setDescription(res.data.description || '');
          setPhotographer(res.data.photographer || '');
          setDate(new Date(res.data.date).toLocaleDateString() || ''); 
        
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <MainContainer>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className='badge badge-secondary'>{photographer}</p>
      <p>Date: {date}</p> {}
       <br />
      <Link to="/" type="submit" className="btn btn-primary">
        Back to home
      </Link>
    </MainContainer>
  );
};

export default Snap;
