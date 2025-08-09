import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const imgbbApiKey = import.meta.env.VITE_IMG_UPLOAD_KEY; // <-- Replace with your imgbb API key

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [],
      images: [], // <-- images as array with max 1 object
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  // Images field array with only one image max
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const images = watch("images") || [];

  useEffect(() => {
    axiosSecure.get(`/products/${id}`).then((res) => {
      const data = res.data;
      const formatted = {
        ...data,
        prices: data.prices.map((p) => ({
          date: new Date(p.date),
          price: p.price.toString(),
        })),
        images:
          data.images && data.images.length > 0
            ? [{ url: data.images[0] }]
            : [], // only first image as object
      };
      reset(formatted);
      setLoading(false);
    });
  }, [id, axiosSecure, reset]);



  // Upload image file to imgbb and replace existing image
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        if (imageFields.length === 0) {
          appendImage({ url: data.data.url });
        } else {
          removeImage(0);
          appendImage({ url: data.data.url });
        }
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Image upload error");
     
    } finally {
      setUploading(false);
      event.target.value = null;
    }
  };

  const onSubmit = async (data) => {
    const updatedProduct = {
      marketName: data.marketName,
      marketDescription: data.marketDescription,
      itemName: data.itemName,
      itemDescription: data.itemDescription,
      prices: data.prices.map((p) => ({
        date: p.date.toISOString().split("T")[0],
        price: parseFloat(p.price),
      })),
      images: data.images.map((img) => img.url), // single image url in array
    };

    try {
      const res = await axiosSecure.patch(`/products/${id}`, updatedProduct);
      if (res.data.modifiedCount > 0) {
        toast.success("Product updated successfully!");
        // navigate("/dashboard/myProducts");
      } else {
        toast.info("No changes made to the product.");
      }
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-xl bg-transparent backdrop-blur-md border border-blue-500 text-white">
      <h2 className="text-2xl font-bold text-center mb-6">✏️ Update Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Vendor Email and Name (read-only) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-white">
              Vendor Email
            </label>
            <input
              type="email"
              readOnly
              {...register("vendorEmail")}
              className="input input-bordered w-full bg-transparent text-white placeholder-white/70"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-white">
              Vendor Name
            </label>
            <input
              type="text"
              readOnly
              {...register("vendorName")}
              className="input input-bordered w-full bg-transparent text-white placeholder-white/70"
            />
          </div>
        </div>

        {/* Market and Item Name */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">🏪 Market Name</label>
            <input
              {...register("marketName", {
                required: "Market name is required",
              })}
              className="input input-bordered w-full bg-transparent text-white placeholder-white/70"
            />
            {errors.marketName && (
              <p className="text-red-400 text-sm">
                {errors.marketName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">🥦 Item Name</label>
            <input
              {...register("itemName", { required: "Item name is required" })}
              className="input input-bordered w-full bg-transparent text-white placeholder-white/70"
            />
            {errors.itemName && (
              <p className="text-red-400 text-sm">{errors.itemName.message}</p>
            )}
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">
              📝 Market Description
            </label>
            <textarea
              {...register("marketDescription")}
              className="textarea textarea-bordered w-full bg-transparent text-white placeholder-white/70"
              rows={4}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              📝 Item Description
            </label>
            <textarea
              {...register("itemDescription")}
              className="textarea textarea-bordered w-full bg-transparent text-white placeholder-white/70"
              rows={4}
            />
          </div>
        </div>

        {/* Prices */}
        <div>
          <label className="block mb-1 font-semibold">
            📅 Dates and Prices
          </label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"
            >
              <Controller
                control={control}
                name={`prices.${index}.date`}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    className="input input-bordered w-full bg-transparent text-white"
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  step="0.01"
                  placeholder="৳ Price"
                  {...register(`prices.${index}.price`, {
                    required: "Price required",
                    min: 0.01,
                  })}
                  className="input input-bordered w-full bg-transparent text-white"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn btn-sm btn-error"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ date: new Date(), price: "" })}
            className="btn btn-sm btn-outline"
          >
            + Add More
          </button>
        </div>

        {/* Images */}
        <div>
          <label className="block mb-2 font-semibold">🖼️ Product Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="mb-3 input bg-transparent border border-white"
          />
          {uploading && <p className="text-yellow-400">Uploading image...</p>}

          <div className="flex flex-wrap gap-4">
            {images.map((imgObj, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 rounded overflow-hidden border border-gray-500"
              >
                <img
                  src={imgObj.url}
                  alt={`Uploaded ${idx}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-bl px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          ✅ Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
