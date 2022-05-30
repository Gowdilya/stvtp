import { useTable, useSortBy, usePagination } from "react-table";
import React from "react";
import SingleStackedBar from "../../components/SingleStackedHorizontalBarGraph";

export default function UnitInsightsTable(props) {
  //console.log("unitInsightsTable");

  // @ts-ignore
  const graphData = ({ value, columnProps }) => {
    return (
      <div className="block">
        <SingleStackedBar data={value} />
      </div>
    );
  };

  const sortGraph = (rowA, rowB) => {
    if (
      rowA.original.intensity +
        rowA.original.distraction +
        rowA.original.forgetfulness >
      rowB.original.intensity +
        rowB.original.distraction +
        rowB.original.forgetfulness
    )
      return 1;
    if (
      rowB.original.intensity +
        rowB.original.distraction +
        rowB.original.forgetfulness >
      rowA.original.intensity +
        rowA.original.distraction +
        rowA.original.forgetfulness
    )
      return -1;
    return 0;
  };

  const handleRowClick = (row) => {
    // props.loadBuildingData(row.buildingId);
  };

  // const displayAverage = ({ value, columnProps }) => {
  //   return <div>{value}</div>;
  // };

  const columns = React.useMemo(
    () => [
      // {
      //   Header: "Building ID",
      //   accessor: "buildingId", // accessor is the "key" in the data
      // },
      // {
      //   Header: "Address",
      //   accessor: "address", // accessor is the "key" in the data
      // },
      {
        Header: "Unit",
        accessor: "UnitNumber", // accessor is the "key" in the data
      },
      {
        Header: "Intensity",
        accessor: "intensity", // accessor is the "key" in the data
        style: {
          borderBottom: "solid 3px black",
          //background: "#9e9e9e",
          //background: "#F3DB6F",
          background: "#957DAD",
          color: "white",
          fontWeight: "bold",
          padding: "10px",
        },
      },
      {
        Header: "Distraction",
        accessor: "distraction", // accessor is the "key" in the data
        style: {
          borderBottom: "solid 3px black",
          //background: "#616161",
          //background: "#FFB668",
          background: "#9DBBE3",

          color: "white",
          fontWeight: "bold",
          padding: "10px",
        },
      },
      {
        Header: "Forgetfulness",
        accessor: "forgetfulness", // accessor is the "key" in the data
        style: {
          borderBottom: "solid 3px black",
          //background: "#212121",
          background: "#C3E2E6",
          color: "white",
          fontWeight: "bold",
          padding: "10px",
        },
      },
      // {
      //   Header: "Weighted Average",
      //   accessor: (row) => ((row.intensity + row.distraction + row.forgetfulness) / 3).toFixed(2), // accessor is the "key" in the data
      //   Cell: displayAverage,
      // },
      {
        Header: "Score",
        accessor: (row) => {
          return [row.intensity, row.distraction, row.forgetfulness];
        },
        Cell: graphData,
        sortType: sortGraph,
      },

      // {
      //   Header: "Apartment",
      //   accessor: "intensity",
      // },
      // {
      //   Header: "TimeStamp",
      //   accessor: "distraction",
      // },

      // {
      //   Header: "Event ID",
      //   accessor: "forgetfulness",
      // },
      // {
      //   Header: "Graph",
      //   accessor: "col6",
      //   Cell: graphData,
      // },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize },

    //Added TS ignore Outdated ts support in for this library
    // @ts-ignore
  } = useTable(
    {
      columns,
      data: props.data,
      initialState: { sortBy: [{ id: "UnitNumber" }], pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="container m-auto mt-6">
        <h1 className="text-2xl">{props.data[0].address}</h1>
        <table
          className="drop-shadow-lg"
          {...getTableProps()}
          style={{ border: "solid 1px black" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      // @ts-ignore
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={
                        column.style
                          ? column.style
                          : {
                              borderBottom: "solid 3px black",
                              background: "white",
                              color: "black",
                              fontWeight: "bold",
                              padding: "10px",
                            }
                      }
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  onClick={() => handleRowClick(row.original)}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: i % 2 === 0 ? "#EEEEEE" : "white",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        {/* END OF Pagination */}
      </div>
    </>
  );
}
