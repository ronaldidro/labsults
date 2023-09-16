import request from "./index";

const deleteFile = (fileId) =>
  request({ url: `/files/${fileId}`, method: "DELETE" });

const downloadFile = (fileId) =>
  request({
    url: `/files/download/${fileId}`,
    responseType: "blob",
  });

const listFiles = () => request({ url: "/files" }).then((res) => res.data);

const uploadFile = (data) =>
  request({
    url: "/files/upload",
    method: "POST",
    data,
  });

export { deleteFile, downloadFile, listFiles, uploadFile };
