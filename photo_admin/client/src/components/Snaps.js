import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainContainer = styled.div`
  margin: 6rem auto;
  padding: 3rem 14rem;
  display: flex;
  justify-content: space-between;
`;

const SnapSection = styled.div`
  width: 45%;
`;

const grayTextStyle = {
  color: 'gray',
};

const Snaps = () => {
  const [snaps, setSnaps] = useState([]);

  // Fetch snaps from an API endpoint
  useEffect(() => {
    axios
      .get('http://localhost:4080/snaps')
      .then((res) => setSnaps(res.data))
      .catch((error) => console.log(error));
  }, []);

  // Delete snap by id
  const deleteSnap = (id) => {
    axios
      .delete(`/snaps/${id}`)
      .then((res) => alert(res.data))
      .then(() => {
        // Remove the deleted snap from the state
        setSnaps(snaps.filter((snap) => snap._id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert('Error deleting snap.');
      });
  };

  return (
    <MainContainer>
      <SnapSection>
        {snaps.map((snap, index) => {
          if (index % 2 === 0) {
            return (
              <div key={snap._id}>
                <img src={`/uploads/${snap.snapImage}`} alt="Snap" style={{ width: '100%' }} />
                <h2>{snap.title}</h2>
                <p>{snap.description}</p>
                <span className="badge badge-secondary" style={grayTextStyle}>
                  {snap.photographer}
                </span>
                <p>Date: {new Date(snap.date).toLocaleDateString()}</p>
                <div className="row">
                  <div className="col-sm-2">
                    <Link to={`/update/${snap._id}`} className="btn btn-outline-success">
                      Edit Snap
                    </Link>
                  </div>
                  <div className="col-sm-2">
                    <button onClick={() => deleteSnap(snap._id)} className="btn btn-outline-danger">
                      Delete Snap
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </SnapSection>

      <SnapSection>
        {snaps.map((snap, index) => {
          if (index % 2 !== 0) {
            return (
              <div key={snap._id}>
                <img src={`/uploads/${snap.snapImage}`} alt="Snap" style={{ width: '100%' }} />
                <h2>{snap.title}</h2>
                <p>{snap.description}</p>
                <span className="badge badge-secondary" style={grayTextStyle}>
                  {snap.photographer}
                </span>
                <p>Date: {new Date(snap.date).toLocaleDateString()}</p>
                <div className="row">
                  <div className="col-sm-2">
                    <Link to={`/update/${snap._id}`} className="btn btn-outline-success">
                      Edit Snap
                    </Link>
                  </div>
                  <div className="col-sm-2">
                    <button onClick={() => deleteSnap(snap._id)} className="btn btn-outline-danger">
                      Delete Snap
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </SnapSection>
    </MainContainer>
  );
};

export default Snaps;



