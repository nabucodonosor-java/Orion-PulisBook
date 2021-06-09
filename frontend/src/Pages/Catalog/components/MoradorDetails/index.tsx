import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Morador } from 'core/types/Morador';
import { makePrivateRequest } from 'core/utils/request';
import { ReactComponent as ArrowIcon } from 'core/assests/images/arrow.svg';
import MoradorInfoLoader from '../Loaders/MoradorInfoLoader';
import MoradorDescriptionLoader from '../Loaders/MoradorDescriptionLoader';
import './styles.scss';

type ParamsType = {
    moradorId: string;
}

const MoradorDetails = () => { 

    const { moradorId } = useParams<ParamsType>();
    const [morador, setMorador] = useState<Morador>();
    const[isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        makePrivateRequest({ url: `/moradores/${moradorId}`})
        .then(response => setMorador(response.data))
        .finally(() => setIsLoading(false));
    }, [moradorId]);

    return (
        <div className="morador-details-container">
            <div className="card-base border-radius-20 morador-details">
                <Link to="/moradores" className="morador-details-goback">
                <ArrowIcon className="morador-details-icon-goback"/>
                <h1 className="morador-details-text-goback">voltar</h1>
                </Link>
                <div className="morador-details-div-info">
                    <div className="pr-5">
                        {isLoading ? <MoradorInfoLoader /> : (
                            <div className="morador-details-card">
                                <div className="text-center">
                                    <img src={morador?.imgUrl} alt={morador?.nome} className="morador-details-image" />
                                </div>
                                    <h1 className="morador-details-name">
                                        {morador?.apelidoPrincipal}
                                    </h1>
                                <div className="morador-details-curso">
                                    <h6 className="morador-details-curso-title">{morador?.curso}</h6>
                                </div>
                            </div>
                        )}   
                    </div>
                    <div className="card-base border-radius-20 morador-details-info-card">
                        {isLoading ? <MoradorDescriptionLoader /> : (
                              <div className="morador-details-info-fields">
                                <div>
                                    <h6 className="morador-details-info-title">{morador?.status}</h6>   
                                </div>
                                <div className="mb-2">
                                    <h6 className="morador-details-info-title">NOME</h6>
                                    {morador?.nome}
                                </div>
                                <div className="mb-2">
                                    <h6 className="morador-details-info-title">Ano de Entrada no Pulis</h6>
                                    {morador?.anoEntradaPulis}
                                </div>
                                <div className="mb-2">
                                    <h6 className="morador-details-info-title">Ano de Saída do Pulis</h6>
                                    {morador?.anoSaidaPulis}
                                </div> 
                                <div className="mb-2">
                                    <h6 className="morador-details-info-title">Cidade Natal</h6>
                                    {morador?.cidadeNatal}
                                </div>
                                <div className="mb-2">
                                    <h6 className="morador-details-info-title">Universidade/Instituição</h6>
                                    {morador?.universidade}
                                </div>
                                <h1 className="morador-details-descricao-title">
                                    Sobre o puleiriano
                                </h1>
                                <p className="morador-details-descricao-text">
                                    {morador?.descricao}
                                </p>                              
                              </div>
                        )}   
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoradorDetails;