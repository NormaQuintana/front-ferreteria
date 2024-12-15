import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CardPresentationProject = ({ proyecto, showModal, changeStateID }) => {
  console.log(proyecto);
  const {
    idProyecto,
    persona,
    direccionProyecto,
  } = proyecto;

  // Desestructurar datos de la persona y la dirección del proyecto
  const { nombre, telefono, correo } = persona || {};
  const { calle: callePersona, numero: numeroPersona, colonia: coloniaPersona, ciudad: ciudadPersona } = persona?.direccionPersona || {};
  const { calle: calleProyecto, numero: numeroProyecto, colonia: coloniaProyecto, ciudad: ciudadProyecto } = direccionProyecto || {};

  const handleClic = () => {
    changeStateID(idProyecto);
    showModal();
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-project/${idProyecto}`);
  }

  return (
    <div className="bg-white rounded-md shadow-md w-[90%] p-5 flex flex-row justify-between items-center">
      <div className="w-[50%]">
        <p className="text-[18px] lg:text-[24px] font-bold">Proyecto #1</p>
        <article className="">
          <h3 className="font-bold mb-5">Encargado</h3>
          <p>Nombre: {nombre || "N/A"}</p>
          <p>Teléfono: {telefono || "N/A"} </p>
          <p>Correo: {correo || "N/A"}</p>
        </article>
      </div>

      <div className="w-[50%]">
        <div>
          <article>
            <h3 className="font-bold text-[15px]">Dirección del encargado</h3>
            <p className="text-[12px]">
              {callePersona || "N/A"} {numeroPersona || "N/A"}{" "}
              {coloniaPersona || "N/A"} {ciudadPersona || "N/A"}
            </p>
          </article>

          <article>
            <h3 className="font-bold text-[15px]">Dirección del Proyecto</h3>
            <p className="text-[12px]">
              {calleProyecto || "N/A"} {numeroProyecto || "N/A"}{" "}
              {coloniaProyecto || "N/A"} {ciudadProyecto || "N/A"}
            </p>
          </article>
        </div>

        <div className="flex flex-row justify-end items-center gap-4 my-5">
          <MdDelete
            onClick={handleClic}
            size={32}
            color="black"
            className="cursor-pointer"
          />
          <MdEdit onClick={handleEdit} size={32} color="black" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CardPresentationProject;
