import {useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
function Header() {
    const [validRequest, setValidRequest] = useState(false);
   const location = useLocation(); // 👈 get current path

    useEffect(() => {
        const credentials = JSON.parse(localStorage.getItem('s3Credentials')) || null;
        if (credentials && location.pathname === '/lists') {
            setValidRequest(true);
        } else {
            setValidRequest(false);
        }
    }, [location.pathname]); // 👈 update on route change
    const credentials = JSON.parse(localStorage.getItem('s3Credentials'))? JSON.parse(localStorage.getItem('s3Credentials')) : null;
    return (
       <header className="bg-black border-b  px-8 py-2 flex justify-between items-center shadow-sm backdrop-blur-md sticky top-0 w-full" style={{backgroundColor: '#111111'}}>
            <div className="flex items-center gap-2   ">

                <img src="/logo.png" alt="S3Vault Logo" className="logo w-12 h-12" />
                <h1 className="sm:text-2xl text-xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
                    S3Vault
                </h1>
            </div>
            {validRequest && <div style={{backgroundColor: '#111111'}} className="flex gap-4 login-settings text-gray-300 border-1 p-2 px-4 rounded-xl">
                <div className="flex items-center gap-4 justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse "></div>
                    <div className="text-sm">{credentials.bucketName}</div>
                </div>
                <button className="text-sm bg-red-500 b-1 rounded-lg py-1 px-4">Disconnect</button>
            </div>}
        </header>
    )
}

export default Header