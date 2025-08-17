
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate, useLocation } from "react-router";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;

        const saveUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
          createdAt: new Date(),
        };

        await axiosSecure.post("/users", saveUser);

        const tokenRes = await axiosSecure.post("/jwt", { email: user.email });
        localStorage.setItem("access-token", tokenRes.data.token);

        Swal.fire({
          icon: "success",
          title: `Welcome ${user.displayName}`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-in Failed",
          text: error.message,
        });
      });
  };

  return (
   <div className="">
      <div className="divider divider-primary">Or</div>
    <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] w-full"
          style={{ boxShadow: "0 0 15px rgba(236, 72, 153, 0.8)" }}
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
