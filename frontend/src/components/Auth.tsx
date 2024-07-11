import { signupInput } from "@jagadeeshduppa/medium-commom";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Backend_Url } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [Postinputs, setPostInputs] = useState<signupInput>({
    name: "",
    username: "",
    password: ""
  });

  async function Sendrequest() {
    try {
      const response = await axios.post(
        `${Backend_Url}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        Postinputs 
      );
      console.log("Response data:", response.data);  // Log the response data
      const k = response.data.jwt;
      localStorage.setItem("token",k);
      console.log("JWT stored in localStorage");  // Confirm storing in localStorage
      navigate("/blogs");
    } catch (e) {
      console.log("Got an error");
      console.error(e);
      alert('Error while signing up');
    }
  }

  return (
    <div className="flex justify-center h-screen flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="font-extrabold text-3xl mt-1">
              {type === "signup" ? "Create an account" : "Sign in to your account"}
            </div>
            <div>
              {type === "signin" ? "Don't have an Account?" : "Already have an Account?"}
              <Link className="pl-2 hover:underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div>
            {type === "signup" ? (
              <Labledbox
                label="name"
                placeholder="jagadeeshwar rao"
                onChange={(e) => {
                  setPostInputs({
                    ...Postinputs,
                    name: e.target.value
                  });
                }}
              />
            ) : null}
            <Labledbox
              label="username"
              placeholder="jagadeesh3@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...Postinputs,
                  username: e.target.value
                });
              }}
            />
            <Labledbox
              label="password"
              type="password"
              placeholder="...."
              onChange={(e) => {
                setPostInputs({
                  ...Postinputs,
                  password: e.target.value
                });
              }}
            />
            <button
              onClick={Sendrequest}
              type="button"
              className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === 'signup' ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Labeledinputtype {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function Labledbox({ label, placeholder, onChange, type }: Labeledinputtype) {
  return (
    <div className="px-1 py-1">
      <label className="block mb-2 text-sm font-medium text-dark">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
