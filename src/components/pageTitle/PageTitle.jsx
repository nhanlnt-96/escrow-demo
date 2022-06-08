import './PageTitle.scss';
import React from 'react';
import {Container} from 'react-bootstrap';

const PageTitle = ({title}) => {
  return (
      <div className="page-title">
        <Container fluid="xxl"
                   className="d-flex justify-content-center align-items-center page-title__container">
          <h1 className="text-white title">{title}</h1>
        </Container>
      </div>
  );
};

export default PageTitle;