import React from 'react';
import './styles.scss';

const DevTeam = () => { 
    return (
        <div className="home-container"> 
            <h3 className="equipe-pb">Equipe PulisBook</h3>
            <div className="card-base border-radius-20 mb-3 pl-2 main-container">
                <div>
                    <h5 className="equipe-title-db">Desenvolvedores & Administradores de DB</h5>         
                </div>
                <div className="equipe-descricao">
                    <div className="equipe-descricao-div">
                        
                        <img className="img-dev" src="https://pulis-book.s3-sa-east-1.amazonaws.com/rococo.png" alt="foca" />
                        <h6 className="mt-4 ml-2 mr-5">Camilo Fortunato</h6>
                    </div>
                    <div className="equipe-descricao-div">
                        
                        <img className="img-dev" src="https://pulis-book.s3-sa-east-1.amazonaws.com/foca.png" alt="foca" />
                        <h6 className="mt-4 ml-2 mr-5">Felipe Reis</h6>
                    </div>
                    <div className="equipe-descricao-div">
                        
                        <img className="img-dev" src="https://pulis-book.s3-sa-east-1.amazonaws.com/manaus.png" alt="foca" />
                        <h6 className="mt-4 ml-2 mr-5">Franco Brasil</h6>
                    </div>
                </div>
            </div>
            <div className="card-base border-radius-20 mb-3 pl-2">
                <div>
                    <h5 className="equipe-title-db">Designers & Levantamento de Requisitos</h5>         
                </div>
                <div className="equipe-descricao">
                    <div className="d-flex mb-2">
                        <img className="img-dev" src="https://pulis-book.s3-sa-east-1.amazonaws.com/JayLo.jpg.jpg" alt="foca" />
                        <h6 className="mt-4 ml-2 mr-5">José Lúcio - JAYLO</h6>
                    </div>
                    <div className="d-flex">
                        <img className="img-dev" src="https://pulis-book.s3-sa-east-1.amazonaws.com/Sub.jpg.jpg" alt="foca" />
                        <h6 className="mt-4 ml-2">Roggerio Figuereido - SUB</h6>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default DevTeam;