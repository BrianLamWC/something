import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import config from "@/config";

const ServiceCard= ({ service }) => {

    return(
      <Link to={`/services/${service.name}`}>
        <Card className='w-[300px]'>
          <img
            className='h-[200px] w-full rounded-md object-cover'
            src={`${config.apiUrl}/images/placeholder.jpg`}
            alt={service.name}
          />
          <CardContent className='p-4 flex flex-col items-center'>
            <h2 className='mb-0 text-xl font-semibold'>{service.name}</h2>
          </CardContent>
        </Card>   
      </Link>
  
    );
}

export default ServiceCard;