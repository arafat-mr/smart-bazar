import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../Hooks/useAuth";
import useUserInfo from "../../Hooks/useUserInfo";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const AddProduct = () => {
  const { user } = useAuth();
  const { userInfo } = useUserInfo();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [{ date: new Date(), price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

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
      setUploading(false);
      Swal.fire({
        icon: "success",
        title: "Image uploaded successfully!",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (err) {
      setUploading(false);
      Swal.fire({
        icon: "error",
        title: "Image upload failed",
        text: err.message || "Try again later",
      });
    }
  };

  const onSubmit = (data) => {
    if (!imageUrl) {
      Swal.fire({
        icon: "error",
        title: "Image Required",
        text: "Please upload an image before submitting.",
      });
      return;
    }

    const prices = data.prices.map(({ date, price }) => ({
      date: date.toISOString().split("T")[0],
      price: parseFloat(price),
    }));

    const productData = {
      vendorEmail: user?.email || userInfo?.email || "",
      vendorName: user?.displayName || userInfo?.name || "Unknown",
      marketName: data.marketName,
      marketDescription: data.marketDescription,
      itemName: data.itemName,
      status: "pending",
      image: imageUrl,
      prices,
      itemDescription: data.itemDescription,
    };

    

    // Post to backend
    axiosSecure
      .post("/products", productData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Product added successfully!", "success");
          reset();
          setImageUrl("");
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to add product", "error");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-xl bg-transparent backdrop-blur-md border border-blue-500 text-black">
      <h2 className="text-2xl font-bold text-center mb-6">🛒 Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Vendor Email and Name (read-only) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-black" htmlFor="vendorEmail">
              Vendor Email
            </label>
            <input
              id="vendorEmail"
              type="email"
              readOnly
              value={user?.email || userInfo?.email || ""}
              {...register("vendorEmail")}
              className="input input-bordered w-full bg-transparent placeholder-black/70"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-black" htmlFor="vendorName">
              Vendor Name
            </label>
            <input
              id="vendorName"
              type="text"
              readOnly
              value={user?.displayName || userInfo?.name || "Unknown"}
              {...register("vendorName")}
              className="input input-bordered w-full bg-transparent text-black placeholder-black/70"
            />
          </div>
        </div>

        {/* Market Name and Item Name */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-black" htmlFor="marketName">
              🏪 Market Name <span className="text-red-500">*</span>
            </label>
            <input
              id="marketName"
              placeholder="e.g. Dhaka New Market"
              {...register("marketName", { required: "Market name is required" })}
              className={`input input-bordered w-full bg-transparent text-black placeholder-black/70 ${
                errors.marketName ? "border-red-500" : ""
              }`}
            />
            {errors.marketName && <p className="text-red-400 mt-1 text-sm">{errors.marketName.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black" htmlFor="itemName">
              🥦 Item Name <span className="text-red-500">*</span>
            </label>
            <input
              id="itemName"
              placeholder="e.g. Onion"
              {...register("itemName", { required: "Item name is required" })}
              className={`input input-bordered w-full bg-transparent text-black placeholder-black/70 ${
                errors.itemName ? "border-red-500" : ""
              }`}
            />
            {errors.itemName && <p className="text-red-400 mt-1 text-sm">{errors.itemName.message}</p>}
          </div>
        </div>

        {/* Market Description and Item Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-black" htmlFor="marketDescription">
              📝 Market Description
            </label>
            <textarea
              id="marketDescription"
              placeholder="Where is the market located, establishment year, etc."
              {...register("marketDescription")}
              className="textarea textarea-bordered w-full bg-transparent text-black placeholder-black/70"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black" htmlFor="itemDescription">
              📝 Item Description
            </label>
            <textarea
              id="itemDescription"
              placeholder="Notes about freshness, quality, etc."
              {...register("itemDescription")}
              className="textarea textarea-bordered w-full bg-transparent text-black placeholder-black/70"
              rows={4}
            />
          </div>
        </div>

        {/* Prices dynamic array */}
        <div>
          <label className=" w-full mb-1 font-semibold text-black">
            📅 Dates and Prices <span className="text-red-500">*</span>
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className=" gap-3 mb-3 grid grid-cols-1 lg:grid-cols-2">
              <Controller
                control={control}
                name={`prices.${index}.date`}
                defaultValue={field.date}
                rules={{ required: "Date required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    className="input input-bordered bg-transparent text-black w-full"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                  />
                )}
              />
              <div className="flex gap-2 items-center justify-center">
<input
                type="number"
                step="0.01"
                placeholder="Price"
                {...register(`prices.${index}.price`, {
                  required: "Price required",
                  min: 0.01,
                })}
                className="input input-bordered bg-transparent text-black "
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-sm btn-error "
                title="Remove this date"
              >
                Remove
              </button>
              </div>
              
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ date: new Date(), price: "" })}
            className="btn btn-sm btn-outline"
          >
            + Add Date & Price
          </button>
          {errors.prices && <p className="text-red-400 mt-1 text-sm">{errors.prices.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold text-black" htmlFor="imageUpload">
            🖼️ Upload Product Image <span className="text-red-500">*</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImgUpload}
            className="file-input file-input-bordered w-full bg-transparent text-black"
          />
          {uploading && <p className="mt-1 text-black"> <span className="loading loading-spinner text-primary"></span>Uploading image...</p>}
          {!uploading && imageUrl && <p className="mt-1 text-green-400">Image uploaded successfully!</p>}
        </div>

        <button type="submit" className=" px-6 w-full py-3 text-center font-semibold bg-pink-500 text-white  rounded-md shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm "
              
               style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }} disabled={uploading}>
           Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
