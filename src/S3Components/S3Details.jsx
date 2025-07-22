import { useEffect, useState } from "react"
import Input from "../Components/Input";
import { fetchObjects } from "../Service/S3Service"; // Assuming you have a service to fetch objects from S3
import Notify from "../Notification/Notifications";
import { useNavigate } from "react-router";
function S3Details() {
    const [credentials, setCredentials] = useState({
        accessId: '',
        accessKey: '',
        region: '',
        bucketName: ''
    })

    const navigate = useNavigate();
useEffect(() => {
    // Check if credentials are already stored in localStorage  
    const checkCredentials = async () => {
        if(localStorage.getItem('s3Credentials')) {
            const storedCredentials = JSON.parse(localStorage.getItem('s3Credentials'));
            const response = await fetchObjects(storedCredentials);
            if (response.status === 200) {
                navigate('/lists'); 
            }
        }
    };
    checkCredentials();
}, [navigate]);

  return (
    <div className="s3-details flex justify-center items-center overflow-hidden" style={{backgroundColor: '#0a0a0a'}}>

    <div  style={{backgroundColor: '#111111'}} className=" flex flex-col justify-center items-center p-2 w-1/3 min-w-sm  m-4 rounded-lg shadow-lg bg-black">
        <div>
            <h1 className="text-3xl font-bold text-center mb-1 text-white">AWS S3 Configuration</h1>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); connectS3(credentials); }} className="text-white p-4 m-4 rounded-lg shadow-md w-full max-w-md flex-col gap-4 flex">
           <label htmlFor="accessId" className="text-sm font-medium text-gray-300">Access ID:</label>
           <Input type="text" name="accessId" id="accessId" value={credentials.accessId} onChange={handleChange} />
           <label htmlFor="accessKey" className="text-sm font-medium text-gray-300">Access Key:</label>
           <Input type="text" name="accessKey" id="accessKey" value={credentials.accessKey} onChange={handleChange} />
           <label htmlFor="region" className="text-sm font-medium text-gray-300">Region:</label>
           <Input name="region" type="text" id="region" value={credentials.region} onChange={handleChange} />
           <label htmlFor="bucketName" className="text-sm font-medium text-gray-300">Bucket Name:</label>
           <Input name="bucketName" type="text" id="bucketName" value={credentials.bucketName} onChange={handleChange} />
           <div className="flex justify-center items-center mt-4">
            <button type="submit" style={{backgroundColor: '#F97316'}} className="text-white w-full py-2 rounded-md" >Connect to S3</button>
           </div>
        </form>

    </div>
    </div>
  )

  function handleChange(e) {
        const {name,value} = e.target;
        setCredentials({...credentials, [name]: value});
    }

    async function connectS3(credentials) {
        if (!credentials.accessId || !credentials.accessKey || !credentials.region || !credentials.bucketName) {
            Notify(400,"Please fill in all fields");
            return;
        }
        console.log("Connecting to S3 with credentials:", credentials);
         var objects=await fetchObjects(credentials);
         if (objects.status === 200) {
            localStorage.setItem('s3Credentials', JSON.stringify(credentials));
           Notify(objects.status,objects.message || "Objects fetched successfully");
           
         }else{
            Notify(objects.status,objects.message || "Failed to fetch objects from S3");
         }
         console.log("Fetched objects:", objects);
    }


}

export default S3Details