import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import bg from "../assets/bg.png";
import logo from "../assets/logo.png";
import { loginUser, setAuthToken } from "../api/auth"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
  
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
  
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await loginUser({
        email,
        password,
      });
      const { token } = response.data;
  

      localStorage.setItem("token", token);
      setAuthToken(token);
  
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "82%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#E9D7FE",
          mixBlendMode: "multiply",
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 min-h-screen w-full flex items-center justify-center lg:justify-start">
        <div
          className="
        w-[90%] sm:w-[420px] md:w-[480px]
        h-auto
        bg-white rounded-[7px]
        shadow-[0_25px_60px_rgba(0,0,0,0.15)]
        px-6 sm:px-8 py-8

        lg:absolute
        lg:ml-[270px]
        lg:top-[140px]
        lg:w-[500px]
        lg:h-[630px]
        lg:px-10
        lg:py-10
      "
        >
          <div className="flex flex-col items-center mb-8 lg:mb-10">
            <img src={logo} alt="digitalflake" className="h-[56px] mb-" />
            <div className="flex items-center">
              <span className="text-[#1F2A44] text-[32px] font-extrabold tracking-tight">
                digital
              </span>
              <span className="text-[#1F2A44] text-[32px] font-semibold tracking-tight">
                flake
              </span>
            </div>

            <p className="text-[#8A8A8A] text-[18px] leading-[26px] text-center">
              Welcome to Digitalflake admin
            </p>
          </div>


          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

    
          <div className="mb-6">
            <label className="block text-[#4B5563] text-[14px] mb-2">
              Email-id
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[48px] px-4 border border-gray-300 rounded-lg
            text-[14px] focus:outline-none focus:ring-2
            focus:ring-[#662671]"
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="block text-[#4B5563] text-[14px] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[48px] px-4 pr-12 border border-gray-300
              rounded-lg text-[14px] focus:outline-none
              focus:ring-2 focus:ring-[#662671]"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
              text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

         
          <div className="text-right mb-8">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[#662671] text-[13px] hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-[48px] bg-[#662671] text-white
          rounded-lg text-[15px] font-medium
          hover:bg-[#541f5a] transition
          disabled:opacity-50 mt-10"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}
