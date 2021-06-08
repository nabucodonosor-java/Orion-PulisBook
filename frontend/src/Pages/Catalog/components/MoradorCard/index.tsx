import React from 'react';
import { Morador } from 'core/types/Morador';
import './styles.scss';

type Props = {
    morador: Morador;
}

const MoradorCard = ({ morador }: Props) => (
    <div className="card-base border-radius-10 morador-card"> 
        <img src={morador.imgUrl} alt={morador.nome} className="morador-card-image"/>
        <div className="morador-card-info">
            <h6 className="morador-card-name">
                {morador.apelidoPrincipal}
            </h6>
            <div className="morador-card-curso">
            {morador.curso}
            </div>
            <div className="morador-card-ano">
            {morador.anoEntradaPulis}
            </div>
        </div>
    </div>
);

export default MoradorCard;