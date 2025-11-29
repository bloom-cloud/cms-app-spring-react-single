import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

type RegisterDTO = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>();

  const handleOAuthGoogle = () => {
    window.location.href = "/oauth2/authorization/google";
  };

  const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
    try {
      const res = await API.post("/auth/signup", data);

      login(res.data.token);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-gray-600">Create a new user account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <input
            {...register("username", { required: true })}
            placeholder="Username"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">Username is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Password"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              Password must be at least 6 chars
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("firstName", { required: true })}
            placeholder="First Name"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              First name is required
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("lastName", { required: true })}
            placeholder="Last Name"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">Last name is required</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      <div className="mt-6 border-t pt-4 text-center">
        <button
          onClick={handleOAuthGoogle}
          className="bg-red-600 text-white w-full py-2 px-4 rounded-md"
        >
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
