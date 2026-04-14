import VerDireccion from "../../pages/Admin/modules/Direccion/Ver";

export default {
  path: "direccion",
  children: [
    {
      path: "ver/:id",
      element: <VerDireccion />,
    }
  ],
};