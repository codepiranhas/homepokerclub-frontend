import httpRequest, { axios } from '../helpers/httpRequest';

export async function uploadFile(file, folder) {
  if (!file) { return; }

  // Get a signedUrl to be able to upload the image to S3
  const uploadData = await httpRequest('POST', '/v1/uploads/getSignedUrl', { type: file.type, folder });

  const { url, key } = uploadData;

  // Actually upload the image to S3
  await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    }
  });
  
  return { url, key };
}

export async function deleteFileByUrl(url) {
  if (!url) { return; }

  httpRequest('DELETE', '/v1/uploads/deleteFile', { url });
}