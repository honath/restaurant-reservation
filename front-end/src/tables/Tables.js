import React from "react";
import { Link } from "react-router-dom";
import { sortTables } from "../common/sortTables";

import "../common/common.css";

function Tables({ tables }) {
  /* Sort tables by name */
  const sortedTables = sortTables(tables);

  /* Format tables as table rows */
  const mapTables = sortedTables.map((tbl) => {
    return (
      <tr key={tbl.table_id}>
        <td className="text-center">{tbl.table_name}</td>
        <td className="text-center">{tbl.capacity}</td>
        <td className="text-center" data-table-id-status={tbl.table_id}>
          {tbl.reservation_id === null ? "Free" : "Occupied"}
        </td>
      </tr>
    );
  });

  /* Render when ready */
  if (mapTables.length) {
    return (
      <div className="container-fluid mr-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">Table</th>
              <th className="text-center">Capacity</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>{mapTables}</tbody>
        </table>
      </div>
    );
  }

  /* Default render */
  return (
    <div className="text-center pt-3 mr-3">
      <h3 className="mb-3">Tables</h3>
      <Link to="/tables/new">Add a table</Link>
    </div>
  );
}

export default Tables;
