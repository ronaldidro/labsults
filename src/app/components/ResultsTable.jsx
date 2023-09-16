const ResultsTable = ({ files, handleDownload, handleDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {files.map((file) => (
        <tr key={file.id}>
          <td>{file.name}</td>
          <td>
            <button onClick={() => handleDownload(file.id)}>Descargar</button>
            <button onClick={() => handleDelete(file.id)}>Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ResultsTable;
