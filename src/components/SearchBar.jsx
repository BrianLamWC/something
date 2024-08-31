import { memo, useState } from 'react';
import { Input } from "@/components/ui/input"

const SearchBar = ({ onChange }) => {
    
    const [search,setSearch] = useState('')

    const handleSubmit = (e) => { 
        setSearch(e.target.value);
        onChange(e.target.value);  
    };

    return(
        <Input
        className='w-[400px]'
        placeholder='Search services'
        value={search}
        onChange={handleSubmit}
        />
    );

}

export default memo(SearchBar)