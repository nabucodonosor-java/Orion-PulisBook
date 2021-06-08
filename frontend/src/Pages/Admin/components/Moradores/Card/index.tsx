import React from 'react';
import { Morador } from 'core/types/Morador';
import { Link } from 'react-router-dom';

import './styles.scss';


type Props = {
    morador: Morador;
    onRemove: (moradorId: number) => void;
}

const Card = ({ morador, onRemove }: Props) => {

    return (
        <div className="card-base morador-card-admin">
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    <img src={morador.imgUrl}
                    alt={morador.nome} className="morador-card-img-admin" />
                </div>
                <div className="col-7 py-3">
                    {morador.status}
                    <h3 className="morador-card-name-admin mt-2 mb-2">
                        {morador.apelidoPrincipal}
                    </h3>
                    Ano Ingresso no Pulis: {morador.anoEntradaPulis}           
                </div>
                <div className="col-3 pt-3 pr-5">
                    <Link
                    to={`/admin/moradores/${morador.id}`}
                    type="button"
                    className="btn btn-outline-secondary btn-block border-radius-10 mb-3"
                    >
                    EDITAR
                    </Link>

                    <button
                    type="button"
                    className="btn btn-outline-danger btn-block border-radius-10"
                    onClick={() => onRemove(morador.id)}
                    >
                    EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;