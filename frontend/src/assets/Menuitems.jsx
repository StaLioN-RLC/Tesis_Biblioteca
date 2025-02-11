import { FiBook, FiList } from "react-icons/fi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdNoteAdd, MdOutlinePeople } from "react-icons/md";
import { TbCategory, TbCategoryPlus, TbBook2, TbBook, } from "react-icons/tb";

export const Menus = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Biblioteca",
    subMenuHeading: ["Alumno", "Administrador"],
    subMenu: [
      {
        name: "Libros",
        desc: "Lista de libros",
        icon: FiBook,
        path: "/libros",
      },
      {
        name: "Añadir Libro",
        desc: "Añadir un libro",
        icon: MdNoteAdd,
        path: "/agregar-libro",
      },
      {
        name: "Autores",
        desc: "Lista de Autores",
        icon: BsFillPeopleFill,
        path: "/autores",
      },
      {name: "Añadir Autores",
        desc: "Añadir un autor",
        icon: MdOutlinePeople,
        path: "/agregar-autores",
      },
      {
        name: "Categorias",
        desc: "Lista de Categorias Literarias",
        icon: TbCategory,
        path: "/categorias",
      },
      {
        name: "Añadir Categoria",
        desc: "Añadir una Categoria",
        icon: TbCategoryPlus,
        path: "/agregar-categorias",
      },
      {
        name: "Editoriales",
        desc: "Lista de Editoriales",
        icon: TbBook,
        path: "/editoriales",
      },
      {
        name: "Añadir Editorial",
        desc: "Añadir una Editorial",
        icon: TbBook2,
        path: "/agregar-editoriales",
      },
      {
        name: "Registros",
        desc: "Listado de Prestamos",
        icon: FiList,
        path: "/registros",
      },
      {
        name: "Añadir Registro",
        desc: "Añadir un registro",
        icon: FiList,
        path: "/agregar-registro",
      },
    ],
    gridCols: 2,
  },
  {
    name: "Inventario",
    path: "/inventario",
  },
];