import { useState } from "react";
import ResultsTable from "../components/ResultsTable.jsx";
import UploadField from "../components/UploadField.jsx";
import { useFiles } from "../hooks/useFiles.js";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { getAll, upload, remove, download } = useFiles();
  const { data: files, isLoading, isError, error } = getAll();
  const { mutate: uploadFile } = upload();
  const { mutate: deleteFile } = remove();

  const onFileChange = (event) => setSelectedFile(event.target.files[0]);

  const onUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      uploadFile(formData);
    } catch (error) {
      console.log("🚀 ~ file: Home.jsx:112 ~ handleUpload ~ error:", error);
    }
  };

  const onDownload = async (fileId) => {
    try {
      download(fileId);
    } catch (error) {
      console.log("🚀 ~ file: Home.jsx:25 ~ handleDownload ~ error:", error);
    }
  };

  const onDelete = (fileId) => {
    try {
      deleteFile(fileId);
    } catch (error) {
      console.log(
        "🚀 ~ file: Home.jsx:120 ~ handleEliminarClick ~ error:",
        error.response.data.error
      );
    }
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      <UploadField handleFileChange={onFileChange} handleUpload={onUpload} />
      {isError ? (
        <p>{`Error: ${error?.response.data.error}`}</p>
      ) : (
        <ResultsTable
          files={files}
          handleDownload={onDownload}
          handleDelete={onDelete}
        />
      )}
    </>
  );
};

export default Home;
