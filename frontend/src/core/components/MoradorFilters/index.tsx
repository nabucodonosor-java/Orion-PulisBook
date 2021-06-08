import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assests/images/lupa.svg';
import Select from 'react-select';
import { makePrivateRequest } from 'core/utils/request';
import { Casa } from 'core/types/Morador';
import './styles.scss';

type Props = {
    apelidoPrincipal?: string;
    handleChangeName: (apelidoPrincipal: string) => void;
    handleChangeCasa: (casa: Casa) => void;
    clearFilters: () => void;
    casa?: Casa; 
}

const MoradorFilters = ({ apelidoPrincipal, handleChangeName, casa, handleChangeCasa, clearFilters }: Props) => {

    const [isLoadingCasas, setIsLoadingCasas] = useState(false);
    const [casas, setCasas] = useState<Casa[]>([]);

    useEffect(() => { 
        setIsLoadingCasas(true);
        makePrivateRequest({ url: '/casas' })
            .then(response => setCasas(response.data.content))
            .finally(() => setIsLoadingCasas(false));
    }, []);

    

    return (
        <div className="card-base morador-filters-container">
            <div className="morador-input-search">
                <input
                    type="text"
                    value={apelidoPrincipal}  
                    className="form-control"
                    placeholder="Pesquisar puleiriano"
                    onChange={event => handleChangeName(event.target.value)}                  
                />
                <SearchIcon />
            </div>
            <Select
                name="casas"
                key={`select-${casa?.id}`}
                value={casa}
                isLoading={isLoadingCasas}
                options={casas}
                getOptionLabel={(option: Casa) => option.nome}
                getOptionValue={(option: Casa) => String(option.id)}
                className="morador-filter-select-container"
                classNamePrefix="morador-casas-select"
                placeholder="Casas"
                inputId="casas"
                onChange={value => handleChangeCasa(value as Casa)}
                isClearable
            />
            <button 
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default MoradorFilters;