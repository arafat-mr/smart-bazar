import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth"; // ✅ import useAuth
import axios from "axios";

const CreateAnAd = () => {
  const { user } = useAuth(); // ✅ get current user
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImgUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD_KEY}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setImageUrl(res.data.data.url);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }

    const adData = {
      title: data.title,
      description: data.description,
      image: imageUrl,
      status: "pending",
      vendorEmail: user?.email || "unknown@user.com",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/advertisements", adData);
      if (res.data.insertedId) {
        toast.success("Advertisement submitted!");
        reset();
        setImageUrl("");
      }
    } catch (error) {
      toast.error("Failed to submit ad");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6   rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">📢 Create Advertisement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email (readonly) */}
        <div>
          <label className="block font-semibold">Your Email</label>
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            className="input input-bordered w-full bg-transparent"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold">Ad Title *</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full bg-transparent"
            placeholder="e.g. Fresh Veg Sale"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Short Description *</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full bg-transparent"
            rows={4}
            placeholder="Write a brief about the ad..."
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold">Upload Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImgUpload}
            className="file-input file-input-bordered w-full bg-transparent"
          />
          {uploading && <p className="text-sm text-black font-semibold mt-1">Uploading image...</p>}
          {imageUrl && !uploading && <p className="text-green-500 font-semibold text-sm mt-1">Image uploaded</p>}
        </div>

        <button type="submit" className=" px-6 w-full  py-3 text-center font-semibold bg-pink-500 text-white  rounded-md shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
              
               style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }} disabled={uploading}>
          📤 Submit Advertisement
        </button>
      </form>
    </div>
  );
};

export default CreateAnAd;
