import { toast } from "react-toastify";
export default function Notify(status,message){
    if(status === 200){
        toast.success(message || "Operation successful");
    }else if(status === 400){
        toast.error(message || "Bad request");
    }else {
        toast.error(message || "Operation failed");
    }
}