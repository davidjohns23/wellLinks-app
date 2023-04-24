import React from "react";

const StateList = ({ states }) => {
  return (
    <div>
      <h1>Top 10 states</h1>
      <ul>
        {states.map((state) => (
          <li key={state.name}>{state.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StateList;

