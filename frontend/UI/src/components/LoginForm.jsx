import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/auth.service";
import { useState } from "react";

function LoginForm() {
  const navigate = useNavigate();

  const [feedBack, setFeedBack] = useState("");
  const [showRecoveryPassMessage, setShowRecoveryPassMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { message, error, status } = await login(data);

    if (status === 400) setFeedBack(message);
    if (status === 200) navigate("/");
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[4px] z-0"
        style={{ backgroundImage: `url('/background.jpg')` }}
      ></div>

      <div className="absolute inset-0 bg-black/55 z-0"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-9/10 gap-12 bg-slate-100/60 p-8 rounded-xl shadow-2xl">
        <img
          src="/logoFHD.png"
          className="w-1/2 h-auto object-contain mr-1 max-w-xl"
        />
        <div className="rounded-xl flex flex-col items-center justify-center w-full md:w-1/2 bg-trasnparent">
          {feedBack && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 w-full"
              role="alert"
            >
              <span className="font-medium">Oops!</span> {feedBack}
            </div>
          )}
          {!showRecoveryPassMessage ? (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col space-y-4"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-black"
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
                    className="block mb-2 text-sm font-medium text-black"
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
                  className="text-white w-full bg-[#183254] hover:bg-[#2785c7] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  value="Ingresar"
                />
              </form>
              <button
                className="font-medium text-blue-600 hover:underline mt-4"
                onClick={() => setShowRecoveryPassMessage(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </>
          ) : (
            <div className="max-w-md">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                Contacta a{" "}
                <span className="text-blue-600">mail@example.com</span> para
                recuperar tu contraseña
              </h1>
              <button
                className="font-medium text-xl text-blue-600 hover:underline"
                onClick={() => setShowRecoveryPassMessage(false)}
              >
                Inicia Sesion
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 z-10 bg-transparent">
        <p className="text-left">
          <a
            href="https://www.fundonemos.org"
            className="text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; 2024 Fundonemos. Todos los derechos reservados.
          </a>
        </p>
      </footer>
    </div>
  );
}

export default LoginForm;
