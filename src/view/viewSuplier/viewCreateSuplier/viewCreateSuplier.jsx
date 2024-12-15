import Header from "../../../components/Header/Header";
import TextField from "../../../components/Form/TextField/TextField";
import Button from "../../../components/Buttons/Button";
import { FormProvider, useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";
import { SchemeSuplier } from "../../../schema/SchemaSuplier";
import { zodResolver } from "@hookform/resolvers/zod";

import ImageSuplier from "../../../../public/proveedor.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const ViewCreateSuplier = () => {
  const methods = useForm({
    resolver: zodResolver(SchemeSuplier),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const cookie = new Cookies();

  const handleSubmit = (data) => {
    const dataToSend = {
      nombre: data.nombre,
      telefono: data.telefono,
      correo: data.correo,
      rfc: data.rfc,
      estado: data.estado || "Disponible",
      direccion: {
        calle: data.calle,
        numero: data.numero,
        colonia: data.colonia,
        ciudad: data.ciudad
      }
    };

    console.log("Datos enviados:", data);
    const config = {
      method: "POST",
      url: `${import.meta.env.VITE_URL}/proveedor/agregar`,
      headers: {
        //Authorization: `Bearer ${cookie.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
      data: dataToSend,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response); // Verifica la respuesta del backend
        if (response.status === 201) {
          // Accede a 'mensaje' en lugar de 'message'
          if (response.data.mensaje === "Proveedor registrado correctamente") {
            navigate("/supliers");
          } else {
            toast.error("Error inesperado: " + response.data.mensaje);
          }
        } else if (response.status === 409 && response.data.mensaje === "El proveedor ya se encuentra en existencia") {
          toast.error("El proveedor ya se encuentra en existencia");
        } else {
          toast.error("Error inesperado al crear el proveedor");
        }
      })
      .catch((error) => {
        console.log(error);  // Detalles del error
        toast.error("Error al crear el proveedor");
      });
  };

  return (
    <div>
      <Header />

      <div className="flex justify-center items-center flex-col gap-5 py-5">
        <div className="flex flex-row justify-start items-center gap-2 w-full p-5">
          <IoArrowBackOutline
            size={32}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          <p className="text-[18px] font-bold">Crear Proveedor</p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start lg:gap-[50px] lg:w-full">
          <picture className="hidden lg:flex">
            <img
              src={ImageSuplier}
              className="w-[150px] rounded-full shadow-md object-fill"
            />
          </picture>

          <form
            className="w-[360px] lg:w-[50%] flex flex-col gap-5 justify-center items-center"
            onSubmit={methods.handleSubmit(handleSubmit)}
          >
            <FormProvider {...methods}>
              <TextField
                label="Nombre"
                name="nombre"
                type="text"
                Icon={false}
                isIcon={false}
                Error={methods?.formState.errors?.nombre?.message}
                isError={!!methods?.formState.errors?.nombre?.message}
                placeholder={"Nombre completo"}
                register={methods.register}
              />

              <TextField
                label="Teléfono"
                name="telefono"
                type="text"
                Icon={false}
                Error={methods?.formState.errors?.telefono?.message}
                isError={!!methods?.formState.errors?.telefono?.message}
                isIcon={false}
                placeholder={"5512345678"}
                register={methods.register}
              />

              <TextField
                label="Correo electrónico"
                name="correo"
                type="text"
                Error={methods?.formState.errors?.correo?.message}
                isError={!!methods?.formState.errors?.correo?.message}
                Icon={false}
                isIcon={false}
                placeholder={"example@gmail.com"}
                register={methods.register}
              />

              <TextField
                label="RFC"
                name="rfc"
                type="text"
                Error={methods?.formState.errors?.rfc?.message}
                isError={!!methods?.formState.errors?.rfc?.message}
                Icon={false}
                isIcon={false}
                placeholder={"AAAA######XXX"}
                register={methods.register}
              />

              <TextField
                label="Calle"
                name="calle"
                type="text"
                Error={methods?.formState.errors?.calle?.message}
                isError={!!methods?.formState.errors?.calle?.message}
                Icon={false}
                isIcon={false}
                placeholder={"Lucio Blanco"}
                register={methods.register}
              />

              <TextField
                label="Número de Domicilio"
                name="numero"
                type="text"
                Error={methods?.formState.errors?.numero?.message}
                isError={!!methods?.formState.errors?.numero?.message}
                Icon={false}
                isIcon={false}
                placeholder={"18, s/n, 3-B"}
                register={methods.register}
              />

              <TextField
                label="Colonia"
                name="colonia"
                type="text"
                Error={methods?.formState.errors?.colonia?.message}
                isError={!!methods?.formState.errors?.colonia?.message}
                Icon={false}
                isIcon={false}
                placeholder={"Colonia"}
                register={methods.register}
              />

              <TextField
                label="Ciudad"
                name="ciudad"
                type="text"
                Error={methods?.formState.errors?.ciudad?.message}
                isError={!!methods?.formState.errors?.ciudad?.message}
                Icon={false}
                isIcon={false}
                placeholder={"Xalapa"}
                register={methods.register}
              />
              <div className="w-full h-[40px] lg:h-[50px] lg:w-[50%] flex justify-center items-center">
                <Button
                  background="bg-blue"
                  isIcon={true}
                  texto="Guardar"
                  type="submit"
                  Icon={<AiOutlineSave size={32} />}
                  onClick={() => {}}
                />
              </div>
            </FormProvider>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewCreateSuplier;
