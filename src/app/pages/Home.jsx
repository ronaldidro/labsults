import { useEffect, useState } from "react";
import ResultsTable from "../components/ResultsTable.jsx";
import UploadField from "../components/UploadField.jsx";
import { request } from "../services/index.js";

const Home = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const onFileChange = (event) => setSelectedFiles(event.target.files);

  const onUpload = async () => {
    try {
      if (selectedFiles) {
        const formData = new FormData();

        for (const file of selectedFiles) {
          formData.append("files", file);
        }

        await request({
          url: "/files/upload",
          method: "POST",
          data: formData,
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: Home.jsx:112 ~ handleUpload ~ error:", error);
    }
  };

  const onDownload = async (fileId) => {
    try {
      const response = await request({
        url: `/files/download/${fileId}`,
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      const fileName = fileNameMatch[1];

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("🚀 ~ file: Home.jsx:25 ~ handleDownload ~ error:", error);
    }
  };

  const onDelete = async (fileId) => {
    try {
      const response = await request({
        url: `/files/remove/${fileId}`,
        method: "DELETE",
      });

      if (response.status === 204) {
        console.log("Archivo eliminado con éxito.");
      } else {
        console.log("Error al eliminar el archivo.");
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: Home.jsx:120 ~ handleEliminarClick ~ error:",
        error
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request({ url: "/files/list" });
        if (response.status === 200) setFiles(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <UploadField handleFileChange={onFileChange} handleUpload={onUpload} />
      <ResultsTable
        files={files}
        handleDownload={onDownload}
        handleDelete={onDelete}
      />
    </>
  );
};

export default Home;
