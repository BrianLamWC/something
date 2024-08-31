import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { Separator } from "./components/ui/separator";

export default function App() {

  return (
    <div>
      <NavBar />
      <div className='mx-auto w-9/12'>
          <Separator className='w-100 my-4'/>
          <Outlet />
      </div>
    </div>
  );
}

