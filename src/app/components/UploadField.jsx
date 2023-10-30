import PropTypes from 'prop-types'

const UploadField = ({ handleFileChange, handleUpload }) => (
  <>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Subir Archivos</button>
  </>
)

UploadField.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired
}

export default UploadField
