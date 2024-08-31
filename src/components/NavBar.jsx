import axios from "axios";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Link } from 'react-router-dom';
import { SquareMenu } from "lucide-react";
import { useAuth } from "./AuthProvider";
import config from "@/config";


const NavBar = () => {

    const { token, setToken } = useAuth();

    const handleSignOut = async () => {
            try {
                await axios.get(`${config.apiUrl}/signout`);;
                setToken(null);
            } catch {
                setToken(null);
            }
      };

    return(
        <>
        <div className='grid grid-cols-3'>
            <div>           
            </div>
            <div className="flex flex-col items-center p-4">
                <Link to={'/'}>
                    <p className="text-white text-4xl">something.</p>
                </Link>
                {
                    token && 
                    <DropdownMenu>
                    <DropdownMenuTrigger className="text-white mt-4" ><SquareMenu /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleSignOut}>
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                }

            </div>
            <div>
            </div>
        </div>
        </>
    );
};

export default NavBar