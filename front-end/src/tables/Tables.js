import React from "react";

function Tables({ tables }) {
  /* Defined for testing and early development */
  const tempTables = [
    {
      table_name: "#1",
      capacity: 6,
      status: "free",
    },
    {
      table_name: "#2",
      capacity: 6,
      status: "free",
    },
    {
      table_name: "Bar #1",
      capacity: 1,
      status: "free",
    },
    {
      table_name: " Bar #2",
      capacity: 1,
      status: "free",
    },
  ];

  const mapTables = tempTables.map((tbl, index) => {
    return (
      <tr key={index}>
        <td className="text-center">{tbl.table_name}</td>
        <td className="text-center">{tbl.capacity}</td>
        <td className="text-center">{tbl.status}</td>
        <td className="text-center">
          <button>Placeholder</button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="text-center">Table</th>
          <th className="text-center">Capacity</th>
          <th className="text-center">Status</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>{mapTables}</tbody>
    </table>
  );
}

export default Tables;
