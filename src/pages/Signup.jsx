import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Input from "../components/Input";
import { UserAuth } from "../context/Auth_context";

const Signup = () => {
  const { handleSignup } = UserAuth();
  const initialState = {
    email: "",
    password: "",
    confirmpassword: "",
  };

  const [fromstate, setfromstate] = useState(initialState);

  const handleFormChange = (e) => {
    setfromstate({
      ...fromstate,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div>
      <Layout>
        <div className="md:w-[50%] md:h-[80%] h-[60vh] w-[80vw] bg-white m-auto rounded-md flex flex-col justify-center items-center gap-2 gap-y-10	">
          
          <form action="" className="flex flex-col justify-center items-center gap-y-5">
            <h1 className="text-black text-xl font-semibold text-center">
              Create Admin Account
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
            <Input
              onChange={handleFormChange}
              id="confirmpassword"
              label={"Confirm Password"}
              type={"password"}
              placeholder={"Confirm Your password"}
            />
            <div className="flex gap-8">
              <span>Already have a account?</span>
              <Link to="/Login" className="text-blue-900">
                Login Here
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                handleSignup(fromstate);
              }}
              className="bg-purple-500 text-center text-xl text-white rounded-lg p-1 hover:bg-purple-400"
            >
              Create Account
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Signup;
