import { useTable } from 'react-table';
import React from 'react';
 
 export default function Reports() {
   const data = React.useMemo(
     () => [
       {
        col1: '2463',
        col2:"100 Mornelle Court",
        col3: '511',
        col4:'1609459390',
        col5: '8'
       },
       {
        col1: '2463',
        col2:"116  Morningside",
        col3: '511',
        col4:'1609459390',
        col5: '8'
       },
       {
        col1: '2463',
        col2:"300 Alton Towers Circle",
        col3: '511',
        col4:'1609459390',
        col5: '8'
       },
     ],
     []
   )
 
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
   } = useTable({ columns, data })
 
   return (
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
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
   )
 }