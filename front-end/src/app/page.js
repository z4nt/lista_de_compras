import Image from "next/image";
import { Roboto } from "next/font/google";
import Formulario from "./formulario/page";
import Cadastro from "./cadastro/page";

const roboto = Roboto({
  weight: ["400","700"],
  subsets: ["latin"],
});
export default function Home() {
  return (
   <div className={roboto.className}>
    <Cadastro/>
   </div>
  );
}
