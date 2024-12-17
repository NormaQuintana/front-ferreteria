import Header from "../../components/Header/Header";
import TextField from "../../components/Form/TextField/TextField";
import { FormProvider, useForm } from "react-hook-form";
import { IoIosSearch } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Button from "../../components/Buttons/Button";
import PropTypes from "prop-types";
import {
  actualizarStatus,
  dataProduct,
} from "../../store/slices/product/product_reducers";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import CardProcessPayment from "../../components/cardProcessPayment/cardProcessPayment";
import toast from "react-hot-toast";
import ModalEmail from "../../components/Modal/ModalEmail/ModalEmail";
import { setPayment } from "../../store/slices/payment/payment_slice";
import SuplierLoading from "../../components/Loadings/SuplierLoading/SuplierLoading";
import Card from "../../components/cardAddPackage/cardAddPackage";

const ViewSales = ({
  productosState,
  setDataProducts,
  setStatus,
  productsSale,
}) => {
  const methods = useForm();
  const { productos } = productosState;
  const cookie = new Cookies();

  const [sales, setSales] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const [dataProductStock, setDataProductStock] = useState([]);
  const [processPayment, setProcessPayment] = useState(false);
  const [isLoadinView, setIsLoadinView] = useState(true);

  const [productoFiltrador, setProductoFiltrador] = useState(productos);

  useEffect(() => {
    if (productos.length === 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${cookie.get("token")}`,
          "Content-Type": "application/json",
        },
        method: "GET",
        url: `${import.meta.env.VITE_URL}/producto/obtener-todas`,
      };

      setStatus("loading");
      axios
        .request(config)
        .then((response) => {
          setDataProducts(response.data);
          setProductoFiltrador(response.data);
          setStatus("succeeded");
          setIsLoadinView(false);
          toast.success("Productos cargados correctamente");
        })
        .catch(() => {
          toast.error("Error al obtener los productos");
          setStatus("error");
          setIsLoadinView(false);
        });
    }
  }, [productos.length, cookie, setDataProducts, setStatus]);

  const addProductsToList = (p) => {
    const productExists = sales.find(
      (product) => product.idProducto === p.idProducto
    );
    if (productExists) {
      setSales(sales.filter((product) => product.idProducto !== p.idProducto));
    } else {
      setSales([...sales, { ...p, cantidadCompra: 1 }]);
    }
  };

  useEffect(() => {
    const total = sales.reduce((acc, s) => {
      const precioUnitario =
        s.cantidadCompra >= s.stockMinimo ? s.precioMayoreo : s.precioMenudeo;
      return acc + s.cantidadCompra * precioUnitario;
    }, 0);
    setTotalCompra(total);
  }, [sales]);

  const handleFindProduct = (data) => {
    const searchTerm = data.buscador.toLowerCase();
    const filteredProducts = productos.filter((p) => {
      return (
        p.codigo.toLowerCase().includes(searchTerm) ||
        p.nombre.toLowerCase().includes(searchTerm)
      );
    });
    setProductoFiltrador(filteredProducts);
  };

  const closeModalEmail = () => {
    setShowModalEmail(false);
  };

  const onSaveSale = () => {
    if (sales.length === 0) {
      toast.error("No hay productos para vender");
      return;
    }

    const data = { productos: sales, total: totalCompra };

    validateAmountAvailable(data.productos);

    if (dataProductStock.length !== 0) {
      setShowModalEmail(true);
    } else {
      const { productos } = data;
      const listCompra = Array.isArray(productos)
        ? productos.filter((p) => p.cantidadCompra > 0)
        : [];

      if (listCompra.length === 0) {
        toast.error("No hay productos para vender");
      } else {
        setProcessPayment(true);
        data.productos = listCompra;
        productsSale(data);
      }
    }
  };

  const validateAmountAvailable = (products) => {
    products.forEach((p) => {
      if (p.cantidadCompra > p.cantidad) {
        setDataProductStock((prev) => [...prev, p]);
      }
    });
  };

  const changeViewProcess = (valor) => {
    setProcessPayment(valor);
  };

  return (
    <>
      <Header />

      {processPayment && (
        <div className="w-screen h-screen absolute z-50">
          <CardProcessPayment changeViewProcess={changeViewProcess} />
        </div>
      )}

      {showModalEmail && (
        <div className="absolute h-screen w-screen">
          <ModalEmail producto={dataProductStock} close={closeModalEmail} />
        </div>
      )}

      <div className="p-5 w-full h-full">
        <h2 className="font-bold text-[18px] lg:text-[22px] w-full">Ventas</h2>

        {isLoadinView && (
          <div className="h-screen bg-white/60 w-screen absolute">
            <SuplierLoading />
          </div>
        )}

        <div className="flex justify-center items-center flex-col gap-5 max-w-[1200px] mx-auto">
          <form
            onChange={methods.handleSubmit(handleFindProduct)}
            className="w-[320px] lg:w-[600px]"
          >
            <FormProvider {...methods}>
              <TextField
                placeholder="Buscar producto"
                isError={!!methods.formState.errors.search}
                Error={methods.formState.errors.search?.message}
                register={methods.register}
                name="buscador"
                type="text"
                isIcon={true}
                Icon={<IoIosSearch size={32} color="black" />}
              />
            </FormProvider>
          </form>

          <div className="w-full">
            <p className="font-bold lg:text-[22px]">Productos</p>

            <div className="flex overflow-y-auto gap-5 p-4 whitespace-nowrap">
              {productoFiltrador.map((producto, index) => (
                <Card
                  onClick={() => addProductsToList(producto)}
                  key={index}
                  urlImage={producto.urlImage}
                  name={producto.nombre}
                  id={producto.idProducto}
                />
              ))}
            </div>
          </div>

          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start">
              <MdDelete className="cursor-pointer" size={32} color="gray" />
            </div>
          </div>

          <div className="w-full flex flex-row justify-center items-start gap-5">
            <table className="w-full">
              <thead>
                <tr className="table-row">
                  <th className="border-solid border-[#d2d2d2] border-[1px]">
                    Nombre
                  </th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">
                    Cantidad
                  </th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">
                    Precio Unidad
                  </th>
                  <th className="border-solid border-[#d2d2d2] border-[1px]">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {sales?.map((s, index) => {
                  const handleChangeCantidadCompra = (e) => {
                    const newCantidadCompra = e.target.value;
                    if (newCantidadCompra === "" || !isNaN(newCantidadCompra)) {
                      setSales((prevSales) =>
                        prevSales.map((product) =>
                          product.idProducto === s.idProducto
                            ? {
                                ...product,
                                cantidadCompra:
                                  newCantidadCompra === ""
                                    ? ""
                                    : parseInt(newCantidadCompra),
                              }
                            : product
                        )
                      );
                    }
                  };

                  const precioVenta =
                    s.cantidadCompra <= 10 ? s.precioMenudeo : s.precioMayoreo;

                  const precioUnitario =
                    s.cantidadCompra >= s.stockMinimo
                      ? s.precioMayoreo
                      : s.precioMenudeo;

                  const total = s.cantidadCompra * precioVenta;

                  return (
                    <tr key={s.codigo + "-" + index}>
                      <td className="text-center">{s.nombre}</td>
                      <td className="text-center">
                        <input
                          type="text"
                          onChange={handleChangeCantidadCompra}
                          value={
                            s.cantidadCompra === "" ? "" : s.cantidadCompra
                          }
                          className="w-full text-center outline-none p-1 bg-[#f2f2f2]"
                        />
                      </td>
                      <td className="text-center">{precioVenta}</td>
                      <td className="text-center">{total}</td>
                    </tr>
                  );
                })}
              </tbody>

              <tbody>
                <tr>
                  <td
                    className="border-solid border-[#d2d2d2] border-[1px] text-right"
                    colSpan="3"
                  >
                    Total a pagar
                  </td>
                  <td className="border-solid border-[#d2d2d2] border-[1px] text-center">
                    {totalCompra}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-end items-center">
            <div className="w-[200px] h-[40px] lg:w-[300px] lg:h-[50px]">
              <Button
                background="bg-blue"
                isIcon={false}
                texto="Pagar"
                type=""
                Icon={false}
                onClick={onSaveSale}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ViewSales.propTypes = {
  productosState: PropTypes.object,
  setDataProducts: PropTypes.func,
  setStatus: PropTypes.func,
  productsSale: PropTypes.func,
};

const mapsStateToProps = (state) => {
  return {
    productosState: state.productos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataProducts: (data) => dispatch(dataProduct(data)),
    setStatus: (status) => dispatch(actualizarStatus(status)),
    productsSale: (data) => dispatch(setPayment(data)),
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(ViewSales);
