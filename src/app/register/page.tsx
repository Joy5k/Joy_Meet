// import styles from "../styles/register.module.css"
import React from "react";

const RegisterPage = () => {
  // don't touch this section

  return (
    <><div>
      {/* start your code below */}
      <div>
        <form className="w-full max-w-lg mx-auto h-auto">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <div className="mb-4 lg:flex lg:space-x-4">
            <div className="lg:w-1/2"></div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              placeholder="First Name" />
          </div>
          <div className="lg:w-1/2"></div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder="Last Name" />
    </div><div className="mb-4"></div><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label><input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Username" />
            </div>
            <div className="mb-4"></div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
              </label>
              <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              />
            </div>
            <><div className="mb-6"></div><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label><input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************" /></>
            </div>
            <div className="flex items-center justify-between">
              <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              type="button"
              >
              Register
              </button>
              <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/login"
              >
              Already have an account? Login
              </a>
            </div>
            </form>
      </div>
      {/* end your code above */}
    </div>
  );
};

export default RegisterPage;
