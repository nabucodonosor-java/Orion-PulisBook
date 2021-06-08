import React, { useCallback, useEffect, useState } from 'react';
import { Casa, MoradorResponse } from 'core/types/Morador';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import MoradorFilters from 'core/components/MoradorFilters';
import CardLoader from '../Loaders/MoradorCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';


const List = () => {
    const [moradorResponse, setMoradorResponse] = useState<MoradorResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [apelidoPrincipal, setApelidoPrincipal] = useState('');
    const [casa, setCasa] = useState<Casa>();

    const getMoradores = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id',
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

    const handleCreate = () => { 
        history.push('/admin/moradores/create'); 
    }

    const onRemove = (moradorId: number) => {
        const confirm = window.confirm('Ae mermão deseja realmente excluir puleiriano?');

        if (confirm) {
            makePrivateRequest({ url: `/moradores/${moradorId}`, method: 'DELETE' })
            .then(() => {
                toast.info('Puleiriano deletado com sucesso!');
                getMoradores();
            })
            .catch(() => {
                toast.error('Erro ao deletar puleiriano');
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary btn-lg mr-5" onClick={handleCreate}>
                    ADICIONAR
                </button>
                <MoradorFilters
                    apelidoPrincipal={apelidoPrincipal}
                    casa={casa}
                    handleChangeCasa={handleChangeCasa}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    moradorResponse?.content.map(morador => (
                        <Card morador={morador} key={morador.id} onRemove={onRemove} />
                    ))
                )}
                {moradorResponse && (
                <Pagination 
                totalPages={moradorResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default List;