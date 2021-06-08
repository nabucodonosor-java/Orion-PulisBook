import React from 'react';
import { Link } from 'react-router-dom';
import ButtonIcon from 'core/components/ButtonIcon';
import { ReactComponent as MainImage } from 'core/assests/images/pa.svg';
import './styles.scss';

const Home = () => (
    <div className="home-container">
        <div className="row home-content card-base border-radius-20">
            <div className="col-6">
                <h1 className="text-title">
                    Conheça os moradores e ex-moradores da rep
                </h1>
                <p className="text-subtitle"> 
                    Inaugurada em Araraquara no dia 20 de março de 1991, a Puleiro dos Anjos é uma república
                    estudantil que completou 30 anos de muita história e laços eternos de amizade!
                </p>
                <Link to="/moradores"> 
                    <ButtonIcon text="conheça a puleiro dos anjos" />
                </Link>
            </div>
            <div className="col-6">
                <MainImage className="main-image"/>
            </div>
        </div>
    </div>
);

export default Home;