import React, { useEffect, useState } from 'react';
import { makePrivateRequest } from 'core/utils/request';
import Select from 'react-select';
import BaseForm from '../../BaseForm';
import { Casa } from 'core/types/Morador';
import { useHistory, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ImageUpload from '../ImageUpload';
import './styles.scss';

export type FormState = {
    id: number;
    status: string;
    imgUrl: string;
    nome: string;
    apelidoPrincipal: string;
    anoEntradaPulis: string;
    anoSaidaPulis: string;
    dataNascimento: Date;
    cidadeNatal: string;
    anoEntradaFaculdade: string;
    universidade: string;
    curso: string;
    descricao: string;
    casas: Casa[];
}

type ParamsType = {
    moradorId: string;
}

const Form = () => {

    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { moradorId } = useParams<ParamsType>();
    const [isLoadingCasas, setIsLoadingCasas] = useState(false);
    const [casas, setCasas] = useState<Casa[]>([]);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [moradorImgUrl, setMoradorImgUrl] = useState('');
    const isEditing = moradorId !== 'create';
    const formTitle = isEditing ? 'Editar Puleiriano' : 'Cadastrar Puleiriano'

    useEffect(() => {
       if (isEditing) {
        makePrivateRequest({ url: `/moradores/${moradorId}`})
        .then(response => {
            setValue('apelidoPrincipal', response.data.apelidoPrincipal);
            setValue('universidade', response.data.universidade);
            setValue('status', response.data.status);
            setValue('nome', response.data.nome);
            setValue('curso', response.data.curso);
            setValue('anoEntradaPulis', response.data.anoEntradaPulis);
            setValue('anoSaidaPulis', response.data.anoSaidaPulis);
            setValue('cidadeNatal', response.data.cidadeNatal);
            setValue('anoEntradaFaculdade', response.data.anoEntradaFaculdade);
            setValue('descricao', response.data.descricao);
            setValue('casas', response.data.casas);

            setMoradorImgUrl(response.data.imgUrl);
        })
       }
    }, [moradorId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCasas(true);
        makePrivateRequest({ url: '/casas' })
            .then(response => setCasas(response.data.content))
            .finally(() => setIsLoadingCasas(false));
            window.scrollTo(0, 0)
    }, []);

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data,
            imgUrl: uploadedImgUrl || moradorImgUrl
        }
        makePrivateRequest({
            url: isEditing ? `/moradores/${moradorId}` : '/moradores',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
            })
        .then(() => {
            toast.info('Puleiriano salvo com sucesso!'); 
            history.push('/admin/moradores');
        })
        .catch(() => {
            toast.error('Erro ao salvar puleiriano!');
        })
    }

    const onUploadSuccess = (imgUrl: string) => {
        setUploadedImgUrl(imgUrl);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">

                        <div className="margin-bottom-30">
                        <input 
                            ref={register({
                                required: "Campo obrigatório"
                            })}
                            name="status"
                            type="text" 
                            className="form-control input-base"
                            placeholder="morador? ex-morador? agregado? fala aê!"
                            />
                            {errors.status && (
                                <div className="invalid-feedback d-block">
                                    {errors.status.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                        <input 
                            ref={register({
                                required: "Campo obrigatório",
                                minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres'},
                                maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres'}
                            })}
                            name="nome"
                            type="text" 
                            className="form-control input-base"
                            placeholder="Nome do Puleiriano"
                            />
                            {errors.nome && (
                                <div className="invalid-feedback d-block">
                                    {errors.nome.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input 
                                ref={register({
                                required: "Campo obrigatório"
                            })}
                            name="apelidoPrincipal"
                            type="text" 
                            className="form-control input-base"
                            placeholder="Apelido"
                            />
                            {errors.apelidoPrincipal && (
                                <div className="invalid-feedback d-block">
                                    {errors.apelidoPrincipal.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                        <input 
                            ref={register({
                                required: false
                            })}
                            name="anoEntradaPulis"
                            type="text" 
                            className="form-control input-base"
                            placeholder="Ano que entrou da rep"
                            />
                        </div>
                        <div className="margin-bottom-30">
                        <input
                            ref={register({
                                required: false
                            })}
                            name="anoSaidaPulis"
                            type="text" 
                            className="form-control input-base"
                            placeholder="Ano que saiu da rep"
                            />
                        </div>
                        <div className="margin-bottom-30">
                        <Controller
                                as={Select} 
                                name="casas"
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingCasas}
                                options={casas}
                                getOptionLabel={(option: Casa) => option.nome}
                                getOptionValue={(option: Casa) => String(option.id)}
                                classNamePrefix="casas-select"
                                placeholder="Casas"
                                inputId="casas"
                                defaultValue=""
                                isMulti
                                />
                                {errors.casas && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório!
                                </div>
                                )}
                        </div>
                        
                    </div>
                    
                    <div className="col-6">
                    <div className="margin-bottom-30">
                        <input 
                            ref={register({
                                required: false
                            })}
                            name="cidadeNatal"
                            type="text" 
                            className="form-control input-base"
                            placeholder="Cidade natal"
                        />
                    </div>
                    <div className="margin-bottom-30 d-flex">
                        <input 
                            ref={register({
                                required: false
                            })}
                            name="universidade"
                            type="text" 
                            className="form-control input-base mr-2"
                            placeholder="Universidade"
                        />
                        <input 
                            ref={register({
                                required: false
                            })}
                            name="curso"
                            type="text" 
                            className="form-control input-base"
                            placeholder="Curso"
                        />
                    </div>

                    <div className="margin-bottom-30">
                            <ImageUpload onUploadSuccess={onUploadSuccess} moradorImgUrl={moradorImgUrl}/>
                    </div>

                    <textarea
                        ref={register({
                            required: false
                        })}
                        name="descricao"
                        className="form-control input-base"
                        placeholder="Descrição"
                        cols={30} 
                        rows={10}    
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;