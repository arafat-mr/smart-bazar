import React from 'react';
import login from '../../assets/logIn.json';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import GoogleLogin from '../GoogleLogIn/GoogleLogin';

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
const {login:signIn,setLoading}=useAuth()
const navigate=useNavigate()
const location =useLocation()
const axiosSecure=useAxiosSecure()

const onSubmit = data => {
  signIn(data.email, data.password)
    .then(async (res) => {
      setLoading(false);

     
      const tokenRes = await axiosSecure.post('/jwt', { email: data.email });
      localStorage.setItem('access-token', tokenRes.data.token);

    
      const userInfoRes = await axiosSecure.get(`/users/${data.email}`);
      const userInfo = userInfoRes.data;

      
      Swal.fire({
        icon: 'success',
        title: `Welcome ${userInfo.name || 'User'}`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location.state || '/');
    })
    .catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message || 'Login failed!',
      });
    });
};

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-10 p-5 md:px-5 py-10 max-w-7xl mx-auto">
      {/* Lottie Animation */}
      <div className=" md:w-1/2">
        <Lottie animationData={login} loop={true} />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-transparent shadow-2xl p-4 rounded-lg text-black"
      
      style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}>
        <h3 className="text-3xl font-semibold mb-6 text-center">Please Login</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input input-bordered w-full bg-transparent"
              placeholder="Email"
            />
            {errors.email?.type === 'required' && (
              <p className="text-red-500 text-sm mt-1">This field is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input input-bordered w-full bg-transparent"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
           
          </div>

          {/* Forgot */}
          <div>
            <a className="link link-hover text-sm text-white">Forgot password?</a>
          </div>

          {/* Already Register */}
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-400 hover:underline">
              Register Now
            </Link>
          </p>

         
            
          {/* </button> */}
          <button href="#_" className=" px-6  py-3 text-center font-semibold bg-pink-500 text-white  rounded-md shadow-lg 
             hover:shadow-pink-400/80 hover:scale-100 transition duration-300 hover:animate-pulse 
             text-sm w-full "
             
             >
        <span class="relative text-white">Login</span>
    
</button>
<GoogleLogin/>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
