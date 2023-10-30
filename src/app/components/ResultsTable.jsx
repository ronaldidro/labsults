import PropTypes from 'prop-types'

const ResultsTable = ({ files, handleDownload, handleDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {files.map(file => (
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
)

ResultsTable.propTypes = {
  files: PropTypes.array.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default ResultsTable
