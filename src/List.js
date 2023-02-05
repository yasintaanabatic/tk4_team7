import React from "react";
import Table from 'react-bootstrap/Table';

export default function List({ data, handleEdit, handleDelete }) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>NIM</th>
          <th>Nama</th>
          <th>Alamat</th>
          <th>Jenis Kelamin</th>
          <th>Hobi</th>
          <th>Komentar</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {data.map((mahasiswa, index) => {
        return(
        <tr key={index}>
          <td>{mahasiswa.nim}</td>
          <td>{mahasiswa.nama}</td>
          <td>{mahasiswa.alamat}</td>
          <td>{mahasiswa.jeniskelamin}</td>
          <td>{mahasiswa.hobi}</td>
          <td>{mahasiswa.komentar}</td>
          <td>
            <button
                onClick={() => handleEdit(mahasiswa.id)}
                className="btn btn-sm btn-link">Edit</button>
          </td>
          <td>
            <button
                  onClick={() => handleDelete(mahasiswa.id)}
                  className="btn btn-sm btn-link">Delete</button>
          </td>
        </tr>
        )
        
      })}
      </tbody>
    </Table>
    // <div className="list-group">
    //   {data.map((mahasiswa, index) => {
    //     return (
    //       <div key={index} className="list-group-item list-group-item-action">
    //         <div className="d-flex w-200 justify-content-between">
    //           <h5 className="mb-1">{mahasiswa.nama}</h5>
    //           <div>
    //             <button
    //               onClick={() => handleEdit(mahasiswa.id)}
    //               className="btn btn-sm btn-link"
    //             >
    //               Edit
    //             </button>
    //             <button
    //               onClick={() => handleDelete(mahasiswa.id)}
    //               className="btn btn-sm btn-link"
    //             >
    //               Del
    //             </button>
    //           </div>
    //         </div>
    //         <p className="mb-1">{mahasiswa.nim}</p>
    //       </div>
    //     );
    //   })}
    // </div>
  );
}
