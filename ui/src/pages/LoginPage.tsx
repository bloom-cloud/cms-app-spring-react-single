import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

type LoginDTO = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>();

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const res = await API.post("/auth/signin", data);

      login(res.data.token);   
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const handleOAuthGoogle = () => {
    window.location.href = "/oauth2/authorization/google";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-1">Login</h1>
      <p className="text-gray-600 mb-6">Sign in to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          placeholder="Username"
          {...register("username", { required: true })}
          className="border rounded-md p-2"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">Username is required</span>
        )}

        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
          className="border rounded-md p-2"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">Password is required</span>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>

      <div className="mt-6 border-t pt-4 text-center">
        <button
          onClick={handleOAuthGoogle}
          className="bg-red-600 text-white w-full py-2 px-4 rounded-md"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
