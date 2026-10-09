import axiosInstance from "./axios";

// axiosInstance attaches the JWT while the backend signs the Cloudinary upload.
export async function uploadCloudinaryImage(file) {
  const { data } = await axiosInstance.get("/cloudinary/signature");
  const signature = data.data;
  const form = new FormData();
  
  form.append("file", file);
  form.append("api_key", signature.apiKey);
  form.append("timestamp", signature.timestamp);
  form.append("signature", signature.signature);
  if (signature.folder) form.append("folder", signature.folder);

  console.log(data);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
    { method: "POST", body: form },
  );
  // if (!response.ok) throw new Error("Cloudinary could not upload this image.");
  const uploaded = await response.json();
  if (!response.ok) {
    console.error("Cloudinary error:", uploaded);
    throw new Error(uploaded.error?.message || "Cloudinary upload failed.");
  }

  return { url: uploaded.secure_url, publicId: uploaded.public_id };
}
