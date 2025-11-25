import API from "./api";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const res = await API.post("/auth/signup", data);
  return res.data; // maybe some success message
};

export const login = async (data: LoginData) => {
  const res = await API.post("/auth/signin", data);
  const token = res.data.token; // assuming your backend returns { token: "..." }
  localStorage.setItem("token", token);
  return token;
};
