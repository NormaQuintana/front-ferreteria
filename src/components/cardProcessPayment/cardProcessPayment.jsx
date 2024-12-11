import Button from "../Buttons/Button";
import ButtonSwitch from "../buttonSwitch/ButtonSwitch";
import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CardItemProductPayment from "./cardItemProductPayment/CardItemProductPayment";
import ContainerCard from "./cardItemProductPayment/containerCard/ContainerCard";
import ContainerCash from "./cardItemProductPayment/containerCash/ContainerCash";
import { IoIosCloseCircle } from "react-icons/io";

const CardProcessPayment = ({ pago, changeViewProcess }) => {
  const [tipoPago, setTipoPago] = useState("efectivo");
  const { productos: listaProductos, total: totalVenta } = pago;

  const [filtrado, setFiltrado] = useState(listaProductos);
  const [total, setTotal] = useState(totalVenta);

  const deleteProduct = (id) => {
    const newProducts = filtrado.filter((producto) => {
      if (producto.idProducto === id) {
        const totalK = producto.cantidadCompra * producto.precioMenudeo;
        setTotal(totalVenta - totalK);
      } else {
        return producto.idProducto !== id;
      }
    });
    if (newProducts.length === 0) {
      window.location.reload();
    }
    setFiltrado(newProducts);
  };

  return (
    <div className="w-screen h-screen bg-white/60 px-5 z-50 shadow-md">
      <div className="flex flex-col justify-center items-center max-w-[800px] max-h-[500px] m-auto py-10 relative">
        <div className="absolute right-10 top-10 bg-white rounded-md">
          <IoIosCloseCircle
            size={32}
            color="red"
            onClick={() => {
              changeViewProcess(false);
            }}
          />
        </div>
        <div className="bg-white  rounded-md p-5 flex flex-col lg:flex-row gap-5 m-auto">
          <div>
            <p className="text-center font-bold text-[20px] my-3">
              Carrito de Productos
            </p>

            <div>
              {filtrado?.map((producto) => (
                <CardItemProductPayment
                  key={producto.id}
                  id={producto.idProducto}
                  urlImage={producto.urlImage}
                  cantidad={producto.cantidadCompra}
                  precioUnitario={
                    producto.cantidadCompra > producto.cantidad
                      ? producto.precioMayoreo
                      : producto.precioMenudeo
                  }
                  deleteProduct={deleteProduct}
                />
              ))}
            </div>

            <div className="flex justify-end items-center gap-5 my-5">
              <ul className="flex flex-col justify-end items-end gap-2">
                <li className="font-bold">Total: ${total}</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary rounded-md p-5">
            <p className="font-bold text-white text-[32px]">Infórme de Pago</p>

            <div className="">
              <p className="text-white text-[20px] font-bold my-2">
                Formato de Pago
              </p>
              <div className="flex flex-row justify-evenly items-center">
                <div className="border-white border-[1px] rounded-md w-[100px]">
                  <Button
                    background="transparent"
                    isIcon={false}
                    texto="Efectivo"
                    type=""
                    Icon={false}
                    isLoading={false}
                    onClick={() => setTipoPago("efectivo")}
                  />
                </div>

                
              </div>
            </div>

            

            {tipoPago === "efectivo" ? (
              <ContainerCash totalPagar={total} />
            ) : (
              <ContainerCard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CardProcessPayment.propTypes = {
  productosState: PropTypes.object,
  setDataProducts: PropTypes.func,
  setStatus: PropTypes.func,
};

const mapsStateToProps = (state) => {
  return {
    pago: state.pagos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(CardProcessPayment);
