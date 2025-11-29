import React, { useEffect, useState } from "react";
import API from "../api";

type Authority = {
  authority: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  authProvider: string;
  providerId: string;
  imageUrl: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  authorities: Authority[];
};

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await API.get("/me"); // ← your backend endpoint
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!user) return <p className="p-6 text-red-600">Failed to load user.</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg p-4 border">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full shadow"
          />
          <div>
            <p className="font-semibold text-lg">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">{user.authProvider}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Provider ID:</strong> {user.providerId}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created At:</strong> {user.createdAt}</p>
          <p><strong>Updated At:</strong> {user.updatedAt}</p>
          <p><strong>Last Login:</strong> {user.lastLogin}</p>

          <p><strong>Enabled:</strong> {String(user.enabled)}</p>
          <p><strong>Account Non Expired:</strong> {String(user.accountNonExpired)}</p>
          <p><strong>Account Non Locked:</strong> {String(user.accountNonLocked)}</p>
          <p><strong>Credentials Non Expired:</strong> {String(user.credentialsNonExpired)}</p>

          <p>
            <strong>Authorities:</strong>{" "}
            {user.authorities.map((a) => a.authority).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
