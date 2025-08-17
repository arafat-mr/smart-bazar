import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure"; 
import useAxios from "../Hooks/useAxios";

const UpdateProfileModal = ({ isOpen, onClose, userInfo,  refetch }) => {
  const [imageURL, setImageURL] = useState(userInfo.photoURL || "");
  const axiosSecure = useAxiosSecure(); 
  const axios= useAxios()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: userInfo.name || "",
      contactNumber: userInfo.contactNumber || "",
      address: userInfo.address || "",
      bio: userInfo.bio || "",
    }
  });

 const handleImgUpload = async (e) => {
  const image = e.target.files[0];
  if (!image) return;

  const formData = new FormData();
  formData.append("image", image);

  const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD_KEY}`;

  try {
    const res = await axios.post(imageUploadUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setImageURL(res.data?.data?.url);
    console.log(res.data);
    
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Image upload failed", "error");
  }
};


  const onSubmit = async (data) => {
    try {
      const updatedUser = { ...data, photoURL: imageURL };

      await axiosSecure.patch(`/users/${userInfo.email}`, updatedUser); 

      Swal.fire("Success", "Profile updated successfully", "success");
      refetch(); 
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-11/12 md:w-1/2 lg:w-2/5"
      style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
      >
        <h3 className="text-2xl font-bold mb-4">Update Profile</h3>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">Name</label>
            <input {...register("name", { required: true })} className="input input-bordered w-full" />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </div>

          <div>
            <label className="label">Photo</label>
            <input type="file" onChange={handleImgUpload} className="file-input w-full" />
          </div>

          <div>
            <label className="label">Contact Number</label>
            <input
              {...register("contactNumber", {
                pattern: {
                  value: /^\+\d{7,15}$/,
                  message: "Enter valid contact number with country code",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
          </div>

          <div>
            <label className="label">Address</label>
            <input {...register("address")} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Bio</label>
            <textarea {...register("bio")} className="textarea textarea-bordered w-full" rows={3} />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-6 py-2 text-center bg-pink-500 font-semibold text-white rounded-md shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300
             text-sm flex items-center gap-2">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
