import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/auth.service";
import { useState } from "react";

function LoginForm() {
  const navigate = useNavigate();

  const [feedBack, setFeedBack] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { message, error, status } = await login(data);

    if (status === 400) setFeedBack(message);
    if (status === 200) navigate("/");
    /*login(data).then((res) => {
      console.log(res);
      setFeedBack(res.message);
      navigate("/");
    }); */
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-9/10 gap-16">
        <img src="/logoFHD.png" className="w-1/2 h-auto object-contain mr-1" />
        <div className="p-14 rounded-xl flex flex-col items-center justify-center w-full md:w-1/2 bg-gray-200/80">
          {feedBack && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full"
              role="alert"
            >
              <span className="font-medium">Opps!</span> {feedBack}
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-4"
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username:
              </label>
              <input
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="username"
                required
                type="text"
                {...register("username", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password:
              </label>
              <input
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="password"
                name="password"
                required
                {...register("password", { required: true })}
              />
            </div>
            {errors.exampleRequired && <span>This field is required</span>}
            <input
              type="submit"
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              value="Ingresar"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
