import { useParams } from 'react-router-dom';

import ServiceCard from "@/components/ServiceCard"
import DataRenderer from '@/components/DataRenderer';
import useFetch from '@/hooks/useFetch';
import { useMemo } from 'react';
import config from '@/config';

const ServicePage = () => {

    const {serviceName} = useParams();


    const fetchOptions = useMemo(() => ({ name: serviceName }), [serviceName]);

    const {data: service = null, error, isLoading} = useFetch(`${config.apiUrl}/services`, fetchOptions);

    return(
        <DataRenderer error={error} isLoading={isLoading}>
            <ServiceCard service={service} />
        </DataRenderer>
    );
}

export default ServicePage