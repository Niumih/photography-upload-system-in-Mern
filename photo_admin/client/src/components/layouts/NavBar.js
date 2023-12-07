import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const NavBarContainer = styled.div`
  background: var(--dark-orange);
  .navbar {
    background: transparent;
    .navbar-brand {
      color: #000;
      font-weight: bold;
    }
    .navbar-toggler-icon {
      background-color: #000;
    }
    .navbar-nav {
      .nav-item {
        .nav-link {
          color: #000 !important;
          &:hover {
            background: var(--light-orange);
          }
        }
      }
    }
  }
`;

const generateReport = () => {
  axios.get('/generate-report', { responseType: 'blob' }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'snap-report.xlsx');
    document.body.appendChild(link);
    link.click();
  });
};

const NavBar = ({ type, user }) => {
  return (
    <NavBarContainer>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          Snap and Ride
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <FontAwesomeIcon icon={faHome} /> Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-snap">
                <FontAwesomeIcon icon={faCamera} /> Add Snap
              </Link>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={generateReport}>
                <FontAwesomeIcon icon={faCog} /> Generate Report
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </NavBarContainer>
  );
};

export default NavBar;


