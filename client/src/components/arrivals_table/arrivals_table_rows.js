import React from 'react';
import icons from '../../data/icons';

const ArrivalsTableRows = (props) => {

  function setArrivalTimes(arrivals) {
    const adjusted = arrivals.map(a => {
      const arrivalTime = Math.ceil((Number(a.arrivalTime) - props.timestamp) / 60);
      return { ...a, arrivalTime: arrivalTime, arrivalTimestamp: a.arrivalTime };
    });
    const filtered = adjusted.filter(a => {
      if (a.arrivalTime > -1) { return true; }
      else { return false; }
    });
    return filtered.map(a => {
      return { ...a, arrivalTime: `${a.arrivalTime} min` };
    });
  }

  function applyFilters(arrivals, options) {
    const directions = [null, "N", "S"];
    const timed = setArrivalTimes(arrivals);
    const filteredByDirection = options.direction === 0 ? timed : timed.filter(a => {
      return directions[options.direction] === a.direction;
    });
    const filteredByRoute = !options.route ? filteredByDirection : filteredByDirection.filter(a => {
      return a.routeId === options.route;
    });
    const limited = options.limit ? filteredByRoute.slice(0, options.limit) : filteredByRoute;
    return limited;
  }

  const arrivals = (props.arrivals !== undefined && props.arrivals.length > 0)
    ? applyFilters(props.arrivals, props.options) : [];

  const rows = arrivals.map(r => (
    <tr className="arrivals-table__row" key={String(r.arrivalTimestamp) + arrivals.indexOf(r)}>
      <td>
        <img className="arrivals-table__img" src={icons[r.routeId]} alt={r.routeId}>
        </img>
      </td>
      <td>{r.headsign}</td>
      <td>{r.arrivalTime}</td>
    </tr>
  ));

  const loadingRow = (
    <tr className="arrivals-table__row" key="0">
      <td colSpan="3">
        <div className="spinner arrivals-spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </td>
    </tr>
  );

  const defaultRow = (
    <tr className="arrivals-table__row" key="0">
      <td colSpan="3">
        <span className="arrivals-table__no-data">
          No Realtime Data Available
        </span>
      </td>
    </tr>
  );

  if (rows.length > 1) {
    return rows;
  }

  else if (props.arrivalsLoadState) {
    return loadingRow;
  }

  else {
    return defaultRow;
  }
}

export default ArrivalsTableRows;
