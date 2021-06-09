import React, { useCallback, useEffect, useState } from 'react';
import { Casa, MoradorResponse } from 'core/types/Morador';
import { makePrivateRequest } from 'core/utils/request';
import MoradorCardLoader from './components/Loaders/MoradorCardLoader';
import { Link } from 'react-router-dom';
import MoradorCard from './components/MoradorCard';
import Pagination from 'core/components/Pagination';
import MoradorFilters from 'core/components/MoradorFilters';
import './styles.scss';

const Catalog = () => {  

    const [moradorResponse, setMoradorResponse] = useState<MoradorResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [apelidoPrincipal, setApelidoPrincipal] = useState('');
    const [casa, setCasa] = useState<Casa>();

    const getMoradores = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            apelidoPrincipal,
            casaId: casa?.id
        }

        setIsLoading(true);
        makePrivateRequest({ url: '/moradores', params })
       .then(response => setMoradorResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, apelidoPrincipal, casa]);

    useEffect(() => {
        getMoradores();
        window.scrollTo(0, 0)
    }, [getMoradores]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setApelidoPrincipal(name);
    }

    const handleChangeCasa = (casa: Casa) => {
        setActivePage(0);
        setCasa(casa);
    }

    const clearFilters = () => {
        setActivePage(0);
        setCasa(undefined);
        setApelidoPrincipal('');
    }
 
    return (
        <div className="catalog-container">
            <div className="filter-container">
                <MoradorFilters
                    apelidoPrincipal={apelidoPrincipal}
                    casa={casa}
                    handleChangeCasa={handleChangeCasa}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    />
            </div>
            
            <div className="catalog-moradores">
                {isLoading ? <MoradorCardLoader /> : (
                    moradorResponse?.content.map(morador => (
                        <Link to={`/moradores/${morador.id}`} key={morador.id}>
                            <MoradorCard morador={morador}/>
                        </Link> 
                     ))
                )}           
            </div>
            {moradorResponse && (
                <Pagination 
                totalPages={moradorResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}
        </div>
    )
}

export default Catalog;