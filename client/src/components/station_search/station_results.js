import React from 'react';
import { Link } from 'react-router-dom';

const Results = (props) => {
  const options = props.results.map(r => (
    <Link key={r.complexId} to={`/stations/${r.complexId}`}>
      <li className="station-search__result">
        {r.stationName} <span className="station-search__result-routes">{r.routes.join(" ")}</span>
      </li>
    </Link>

  ))
  return (
    <div className="station-search__results-wrapper">
      <ul className="station-search__results-container">
        {options}
      </ul>
    </div>
  );
}

export default Results;
