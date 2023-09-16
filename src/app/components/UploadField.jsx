const UploadField = ({ handleFileChange, handleUpload }) => (
  <>
    <input type="file" multiple onChange={handleFileChange} />
    <button onClick={handleUpload}>Subir Archivos</button>
  </>
);

export default UploadField;
