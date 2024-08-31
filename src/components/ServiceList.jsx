import ServiceCard from '@/components/ServiceCard';

const ServiceList = ({ services }) => {    
    return(
    <>
        {services.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 gap-4'>
                {services.map((service) => (

                    service.availability ? (
                        <div key={service.id} className='flex flex-col items-center p-4'>
                        <ServiceCard service={service} />
                        </div>
                    ) : null
                    
                ))}
            </div>
            ) : (
                <div className='flex flex-col items-center p-4 w-full'>
                    <h2 className='text-white'>No services found.</h2>
                </div>
            )
        }
    
    </>

    );
}

export default ServiceList;