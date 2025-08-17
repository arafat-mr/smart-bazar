import React, { useState } from "react";
import registerlottie from "../../assets/signup.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "../GoogleLogIn/GoogleLogin";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const Register = () => {
  const [imageURL, setImageURL] = useState("");
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data.email, data.password);
      const user = res.user;

      const savedUser = {
        name: data.name,
        email: data.email,
        role: "user",
        photoURL: imageURL,
        contactNumber: data.contactNumber,
        address: data.address,
        bio: data.bio || "N/A",
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", savedUser);

      const tokenRes = await axiosSecure.post("/jwt", { email: user.email });
      const token = tokenRes.data.token;

      localStorage.setItem("access-token", token);

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "You have registered successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate(location?.state || "/");
        Swal.fire({
          icon: "success",
          title: `Welcome ${data.name}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong!",
      });
    }
  };

  const handleImgUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_UPLOAD_KEY
    }`;
    try {
      const res = await axios.post(imageUploadUrl, formData);
      const imgLink = res.data?.data?.url;
      setImageURL(imgLink);
    } catch (err) {
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-10 p-5 md:px-5 py-10 max-w-6xl mx-auto text-black">
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie
          animationData={registerlottie}
          loop={true}
          className="w-[80%] max-w-md"
        />
      </div>

      {/* Form Section */}
      <div
        className="w-full md:w-1/2 shadow-2xl p-6 rounded-lg"
        style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
      >
        <h3 className="text-3xl font-semibold mb-6 text-center">Register Now</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-md mx-auto"
        >
          {/* Name */}
          <div>
            <label className="label text-black">Your Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full bg-transparent"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="label text-black">Photo</label>
            <input
              type="file"
              onChange={handleImgUpload}
              className="file-input file-input-bordered w-full bg-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label text-black">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-transparent"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label text-black">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full bg-transparent"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">At least 6 characters</p>
            )}
          </div>

          {/* Contact Number */}
<div>
  <label className="label text-black">Contact Number</label>
  <input
    type="tel"
    {...register("contactNumber", {
      required: "Contact number is required",
      pattern: {
        value: /^\+\d{7,15}$/,
        message: "Enter a valid contact number starting with + and country code",
      },
    })}
    className="input input-bordered w-full bg-transparent"
    placeholder="e.g. +14155552671"
  />
  {errors.contactNumber && (
    <p className="text-red-500 text-sm mt-1">
      {errors.contactNumber.message}
    </p>
  )}
</div>

          {/* Address */}
          <div>
            <label className="label text-black">Address</label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className="input input-bordered w-full bg-transparent"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Bio (optional) */}
          <div>
            <label className="label text-black">Bio</label>
            <textarea
              {...register("bio")}
              className="textarea textarea-bordered w-full bg-transparent"
              placeholder="Tell us about yourself (optional)"
              rows={3}
            />
          </div>

          {/* Account Link */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2 text-sm">
              <p>Already have an account?</p>
              <Link to="/login" className="text-green-500 hover:underline">
                Login
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 text-center font-semibold bg-pink-500 text-white rounded-md shadow-lg 
             hover:shadow-pink-400/80 hover:scale-105 transition duration-300 hover:animate-pulse 
             text-sm w-full"
            style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
          >
            Register
          </button>

          <GoogleLogin />
        </form>
      </div>
    </div>
  );
};

export default Register;
