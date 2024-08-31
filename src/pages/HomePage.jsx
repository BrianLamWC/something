import { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import ServiceList from "@/components/ServiceList";
import SearchBar from "@/components/SearchBar";
import useFetch from '@/hooks/useFetch';
import DataRenderer from '@/components/DataRenderer';
import config from '@/config';

const HomePage = () => {

    const [search, setSearch] = useState('');

    const fetchOptions = useMemo(() => ({ search: search }), [search]);

    const { data: services = [], error, isLoading } = useFetch(`${config.apiUrl}/services`, fetchOptions);

    const debouncedSearch = useMemo(() => debounce((value) => {
        setSearch(value);
    }, 300), []);

    const handleSearch = useCallback((value) => {
        debouncedSearch(value);
    }, [debouncedSearch]);

    return(
        <>
            <div className='w-full flex flex-col items-center p-4'>
                <SearchBar onChange={handleSearch}/>
            </div>  
            <DataRenderer error={error} isLoading={isLoading}>
                <ServiceList services={services}/>
            </DataRenderer>
        </>
    );
};
  
export default HomePage;