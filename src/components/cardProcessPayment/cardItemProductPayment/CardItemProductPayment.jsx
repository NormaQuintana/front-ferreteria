import { IoIosCloseCircle } from "react-icons/io";

const CardItemProduct = ({ urlImage, cantidad, precioUnitario, deleteProduct, id }) => {
  const total = cantidad * precioUnitario;
  console.log("id del producto:", id);
  return (
    <div className="flex flex-row justify-evenly items-center gap-5 text-center">
      <img
        src={urlImage}
        className="w-[40px] h-[40px] border-[1px] border-solid border-black rounded-md"
      />
      <div>
        <p className="font-bold">Cantidad</p>
        <p>{cantidad}</p>
      </div>
      <div>
        <p className="font-bold">Precio</p>
        <p>${precioUnitario}</p>
      </div>
      <div>
        <p className="font-bold">Precio Total</p>
        <p>${total}</p>
      </div>
      <IoIosCloseCircle color="red" size={32} className="cursor-pointer" onClick={()=>{deleteProduct(id)}} />
    </div>
  );
};

export default CardItemProduct;
