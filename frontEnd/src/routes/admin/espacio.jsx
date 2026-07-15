import Lista from "../../pages/Admin/modules/Espacio/Lista";

export default {
  path: "espacio",
  element: <Lista />,   // 👈 ahora la ruta base renderiza la lista
  children: [
    {
      path: "ver/:id",
      element: <Lista />, // o un componente VerEspacio si lo definís aparte
    }
  ],
};