import React from "react";
import { Link } from "react-router-dom";

const List = ({ picData }) => {
  return (
    <section className="list">
      <ul>
        LIST
        {picData.map((el) => {
          return (
            <>
              <Link to={`/add/${el.date}`} data={el}>
                <li key={el.id}>{el.date}</li>
              </Link>
            </>
          );
        })}
      </ul>
    </section>
  );
};

export default List;
