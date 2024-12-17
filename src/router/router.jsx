import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewMain from "../view/viewMain/ViewMain.jsx";
import ViewLogin from "../view/viewLogin/ViewLogin.jsx";
import ViewForgetPassword from "../view/viewForgetPassword/ViewForgetPassword.jsx";
import ViewForgetPasswordAction from "../view/viewForgetPassword/viewForgetPasswordAction/ViewForgetPasswordAction.jsx";
import ViewCreateProduct from "../view/viewProduct/viewCreateProduct/ViewCreateProduct.jsx";
import ViewProducts from "../view/viewProduct/ViewProduct.jsx";
import ViewListSuplier from "../view/viewSuplier/ViewListSuplier.jsx";
import ViewCreateSuplier from "../view/viewSuplier/viewCreateSuplier/viewCreateSuplier.jsx";
import ViewSale from "../view/viewSale/ViewSale.jsx";
import ViewAddProject from "../view/viewProject/viewAddProject/ViewAddProject.jsx";
import ViewProject from "../view/viewProject/ViewProject.jsx";
import ViewAddPackage from "../view/viewAddPackage/ViewAddPackage.jsx";
import ViewListPackage from "../view/viewListPackage/viewListPackages.jsx";
import ViewAddUser from "../view/viewAddUser/ViewAddUser.jsx";
import ViewSettings from "../view/viewSettings/ViewSettings.jsx";
import ViewUser from "../view/viewUser/ViewUser.jsx";
import NotFound from "../view/notFound/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewMain />,
  },
  {
    path: "/login",
    element: <ViewLogin />,
  },
  {
    path: "/forget-password",
    element: <ViewForgetPassword />,
  },
  {
    path: "/forget-password-action",
    element: <ViewForgetPasswordAction />,
  },
  {
    path: "/create-product",
    element: <ViewCreateProduct />,
  },
  {
    path: "/products",
    element: <ViewProducts />,
  },
  {
    path: "/supliers",
    element: <ViewListSuplier />,
  },
  {
    path: "/create-suplier",
    element: <ViewCreateSuplier />,
  },
  {
    path: "/sale",
    element: <ViewSale />,
  },
  {
    path: "/proyecto/agregar",
    element: <ViewAddProject />,
  },
  {
    path: "/proyecto",
    element: <ViewProject />,
  },
  {
    path: "/list-package",
    element: <ViewListPackage />,
  },
  {
    path: "/add-package",
    element: <ViewAddPackage />,
  },
  {
    path: "/list-package",
    element: <ViewListPackage />,
  },
  {
    path: "/users",
    element: <ViewUser />,
  },
  {
    path: "/add-user",
    element: <ViewAddUser />,
  },
  {
    path: "/settings",
    element: <ViewSettings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
