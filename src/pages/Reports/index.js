import { useTable , useSortBy} from 'react-table';
import React from 'react';
import {data } from './tableDataSet.js';
//import {BarGraph} from './stackedBarGraph';
import DashboardView from './dashboardView.js';

import SingleStackedBar from './singleStackedBar.js';
 
 export default function Reports() {

  // @ts-ignore
  const graphData = ({value, columnProps}) => {
    return <div className='w-96 block'>
        <SingleStackedBar data={value}/>
      </div>;
  }

   const columns = React.useMemo(
     () => [
       {
         Header: 'Building ID',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
        Header: 'Address',
        accessor: 'col2', // accessor is the "key" in the data
      },
       {
         Header: 'Apartment',
         accessor: 'col3',
       },
       {
        Header: 'TimeStamp',
        accessor: 'col4',
      },
      
      {
        Header: 'Event ID',
        accessor: 'col5',
      },
      {
        Header: 'Graph',
        accessor: 'col6',
        Cell: graphData
      },
     ],
     []
   )



   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
     //Added TS ignore Outdated ts support in for this library
     // @ts-ignore
   } = useTable({ columns, data }, useSortBy)
 
   return (
     <>
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
               // @ts-ignore
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
                 <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     <DashboardView/>
     </>
   )
 }