import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteFile,
  downloadFile,
  listFiles,
  uploadFile,
} from "../services/files";

export const useFiles = () => {
  const queryClient = useQueryClient();
  const files = queryClient.getQueryData("files");

  const getAll = () => useQuery("files", listFiles);

  const remove = () => {
    return useMutation(deleteFile, {
      onSuccess: (deletedFile) => {
        queryClient.setQueryData(
          "files",
          files.filter((file) => file.id !== deletedFile.data.id)
        );
      },
    });
  };

  const upload = () => {
    return useMutation(uploadFile, {
      onSuccess: (addedFile) => {
        queryClient.setQueryData("files", files.concat(addedFile.data));
      },
    });
  };

  const download = async (fileId) => {
    const response = await downloadFile(fileId);

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
  };

  return { getAll, remove, upload, download };
};
