const UploadField = ({ handleFileChange, handleUpload }) => (
  <>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Subir Archivos</button>
  </>
);

export default UploadField;
