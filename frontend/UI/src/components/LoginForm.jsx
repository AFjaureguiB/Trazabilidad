import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/auth.service";

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-9/10">
        <img src="/logoFHD.png" className="w-1/2 h-auto object-contain mr-1" />
        <div className="p-14 rounded-xl flex flex-col items-center justify-center w-full md:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-4"
          >
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="username"
                required
                type="text"
                placeholder="John123"
                {...register("username", { required: true })}
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
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
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
