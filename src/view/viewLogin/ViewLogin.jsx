import { useState } from "react";
import TextField from "../../components/Form/TextField/TextField";
import Button from "../../components/Buttons/Button";
import Logo from "../../../public/bitmap.png";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../schema/SchemaUser";
import { zodResolver } from "@hookform/resolvers/zod";

const ViewLogin = () => {
  const methods = useForm({
    resolver: zodResolver(UserLogin),
    mode: "onChange",
  });

  const [isError, setIsError] = useState("");
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isLoadinView, setIsLoadingView] = useState(false);

  const onSubmit = (data) => {
    setIsError("");
    setIsLoadingView(true);

    if (data.usuario !== "" && data.contrasena !== "") {
      const params = new URLSearchParams();
      params.append("usuario", data.usuario);
      params.append("contrasena", data.contrasena);

      axios
        .post(`${import.meta.env.VITE_URL}/validar`, params, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Respuesta del servidor:", res.data);
          if (res.data === "Usuario o contraseña incorrectos") {
            setIsError(res.data);
          } else if (res.data === "Usuario autenticado") {
            console.log("Navegando a la página principal...");
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
          setIsError("Ocurrió un error durante la autenticación.");
        })
        .finally(() => {
          setIsLoadingView(false);
        });
    }
  };

  return (
    <div className="w-screen h-screen bg-F58A27 flex justify-center items-center">
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white w-[320px] lg:w-[500px] lg:h-[600px] p-5 rounded-md flex flex-col gap-5 justify-center items-center"
      >
        <FormProvider {...methods}>
          <picture className="w-[120px] h-[120px]">
            <img
              src={Logo}
              alt="Logo de empresa"
              className="w-[120px] h-[120px]"
            />
          </picture>

          <h2 className="font-bold text-[28px]">Iniciar Sesión</h2>

          <TextField
            label="Ingresa tu usuario o correo"
            name="usuario"
            type="text"
            isIcon={false}
            Icon={null}
            placeholder={"Usuario o correo"}
            register={methods.register}
            isError={!!methods?.formState.errors?.usuario?.message}
            Error={methods?.formState.errors?.usuario?.message}
          />

          <TextField
            label="Ingresa tu contraseña"
            name="contrasena"
            type="password"
            isIcon={true}
            Icon={<IoIosEyeOff />}
            placeholder={"Contraseña"}
            register={methods.register}
            isError={!!methods?.formState.errors?.contrasena?.message}
            Error={methods?.formState.errors?.contrasena?.message}
          />

          {isError && <p className="text-error text-s pl-2">{isError}</p>}

          <div className="lg:w-[300px] h-[40px]">
            <Button
              type="submit"
              texto="Iniciar Sesión"
              isIcon={false}
              Icon={null}
              background="bg-blue"
              onClick={() => {}}
              isLoading={isLoadinView}
            />
          </div>
        </FormProvider>

        <a href="/forget-password" className="underline">
          Olvide Contraseña
        </a>
      </form>
    </div>
  );
};

export default ViewLogin;
