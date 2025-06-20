import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import DummyAccount from "../Component/DummyAccount";

const Register = () => {
  const {
    validateEmail,
    validateName,
    validatePassword,
    validateUsername,
    registerUser,
    authDispatch,
  } = useContext(AppContext);

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "public",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      username: validateUsername(form.username),
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => !err.valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
          authDispatch({ type: "START"});

    if (validateForm()) {
      registerUser(form)
        .then((res) => {
          authDispatch({ type: "REGISTER_SUCCESS", payload: res.user });
        })
        .catch((err) => {
          authDispatch({ type: "REGISTER_FAILED", payload: err.response });
        });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. user_123!"
            />
            {errors.username?.message && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. John Doe"
            />
            {errors.name?.message && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. example@gmail.com"
            />
            {errors.email?.message && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a secure password"
            />
            {errors.password?.message && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">Public</option>
              <option value="celebrity">Celebrity</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>

         <DummyAccount/>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
