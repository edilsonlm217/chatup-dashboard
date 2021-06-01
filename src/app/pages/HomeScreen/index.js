import React from 'react';

function HomeScreen() {
  return (
    <div>
      <div className="page-header">
          <h3 className="page-title"> Basic Tables </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
              <li className="breadcrumb-item active" aria-current="page">Basic tables</li>
            </ol>
          </nav>
        </div>
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Hello World Card Title</h4>
              <p>Hello World</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;