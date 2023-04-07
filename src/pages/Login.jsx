import React, { useState } from "react";
import Layout from "../components/Layout";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/Auth_context";

const Login = () => {
  const { handleLogin } = UserAuth();
  const initialState = {
    email: "",
    password: "",
  };
  const [formstate, setformstate] = useState(initialState);
  const handleFormChange = (e) => {
    setformstate({
      ...formstate,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <Layout>
        <div className="md:w-[50%] md:h-[80%]  h-[60vh] w-[80vw] bg-white rounded-md  flex flex-col items-center gap-2	 justify-center">
          <form action="" className="flex flex-col justify-center  items-center gap-y-5">
            <h1 className="text-black text-3xl font-semibold text-center">
              Login Here
            </h1>
            <Input
              onChange={handleFormChange}
              id="email"
              label={"Mail"}
              type={"email"}
              placeholder={"Enter Your Mail"}
            />
            <Input
              onChange={handleFormChange}
              id="password"
              label={"Password"}
              type={"password"}
              placeholder={"Enter Your password"}
            />
            <div className="flex gap-8">
              <span>Dosen't have a account?</span>
              <Link to="/" className="text-blue-900">
                Create Here
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                handleLogin(formstate);
              }}
              className="bg-purple-500 text-center text-xl text-white rounded-lg py-2 hover:bg-purple-400"
            >
              Login
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
