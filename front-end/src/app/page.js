import Image from "next/image";
import { Roboto } from "next/font/google";
import Formulario from "./lista/page";
import Cadastro from "./cadastro/cadastro";
import NAV from "./nav/nav";

const roboto = Roboto({
  weight: ["400","700"],
  subsets: ["latin"],
});
export default function Home() {
  return (
   <div className={roboto.className}>
    <div className="flex pl-10 gap-10">
    <Formulario/>
    </div>
   </div>
  );
}
