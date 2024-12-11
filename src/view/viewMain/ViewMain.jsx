import Header from "../../components/Header/Header";
import Image from "../../../public/inicio.jpg";

const ViewMain = () => {
  return (
    <div>
      <Header />
      <br></br>
      <p className="text-center text-[32px] font-bold">
        Bienvenido al sistema de gestion de Ferreterias Callejas
      </p>
      <br></br>
      <p className="text-center text-[22px]">
        A continuacion puedes navegar entre las distintas opciones ubicadas en
        la parte superior (barra naranja)
      </p>
      <div className="w-full flex justify-center items-center my-5">
        <img src={Image} className="w-[250px] rounded-md" />
      </div>
    </div>
  );
};

export default ViewMain;
