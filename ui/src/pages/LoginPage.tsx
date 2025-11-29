import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useForm, type SubmitHandler } from "react-hook-form";

type LoginDTO = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>();

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const res = await API.post("/auth/signin", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed: " + err);
    }
  };

  const handleOAuth0Login = () => {
    // Redirect to OAuth endpoint
    window.location.href = "/oauth2/authorization/google";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-gray-600">Login to your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
</div>

      <div className="flex flex-col">
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
</div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div className="my-4 border-t pt-4 text-center">
        <button
          onClick={handleOAuth0Login}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
