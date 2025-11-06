import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, role });
      toast.success("Registered! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg font-semibold mb-4">Register</h2>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="border p-2 w-full mb-2" required/>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full mb-2" required/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="border p-2 w-full mb-2" required/>
        <select value={role} onChange={(e)=>setRole(e.target.value)} className="border p-2 w-full mb-4">
          <option value="member">Member</option>
          <option value="manager">Manager</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
