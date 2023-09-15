import { useEffect, useState } from "react";
import { request } from "../services/index.js";

const FileDownloader = ({ fileId }) => {
  const handleDownload = async () => {
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

  return (
    <div>
      <button onClick={handleDownload}>Descargar Archivo</button>
    </div>
  );
};

const FileList = () => {
  const [files, setFiles] = useState([]);

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
    <div>
      <h2>Archivos en la Carpeta</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <p>{file.name}</p>
            <FileDownloader fileId={file.id} />
            <FileRemover fileId={file.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => setSelectedFiles(event.target.files);

  const handleUpload = async () => {
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

  return (
    <div>
      <h2>Carga de Archivos</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Archivos</button>
    </div>
  );
};

const FileRemover = ({ fileId }) => {
  const handleEliminarClick = async () => {
    try {
      const response = await request({
        url: `/files/remove/${fileId}`,
        method: "DELETE",
      });
      console.log(
        "🚀 ~ file: Home.jsx:114 ~ handleEliminarClick ~ response:",
        response
      );
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
    // fetch(`/api/files/remove/${fileId}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => {
    //     if (response.status === 204) {
    //       console.log("Archivo eliminado con éxito.");
    //     } else {
    //       console.log("Error al eliminar el archivo.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error en la solicitud:", error);
    //   });
  };

  return <button onClick={handleEliminarClick}>Eliminar Archivo</button>;
};

function Home() {
  return (
    <div>
      <FileUploader />
      <FileList />
    </div>
  );
}

export default Home;
