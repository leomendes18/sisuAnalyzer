import { useEffect, useState } from "react"
import PropTypes from "prop-types";
import { api } from "../../utils/api"
import './Form.css'

export function Form({handleSubmit}){
    const[ano, setAno] = useState('2023')
    const[estado, setEstado] = useState('BRASIL')
    const[arrayEstado, setArrayEstado] = useState([])
    const[arrayMunicipio, setArrayMunicipio] = useState([])
    const[municipio, setMunicipio] = useState('')
    const[arrayCampus, setArrayCampus] = useState([])
    const[campus, setCampus] = useState('')
    const[siglaIes, setSiglaIes] = useState('')
    const[arrayCurso, setArrayCurso] = useState([])
    const[curso, setCurso] = useState('')
    
    async function findEstado() {
        const response = await api.get(`/estado/sisu${ano}`)
        if(response.data){
            setArrayEstado(response.data)
        }
    }
    async function findMunicipio() {
        const response = await api.get(`/municipio/sisu${ano}/${estado}`)
        if(response.data){
            setArrayMunicipio(response.data)
        }
    }
    async function findCampus() {
            const response = await api.get(`/campus/sisu${ano}/${estado}/${municipio}`)
            if(response.data){
                setArrayCampus(response.data)
            }
    }
    async function findCurso() {
        const response = await api.get(`/curso/sisu${ano}/${estado}/${municipio}/${campus}`)
        if(response.data){
            setArrayCurso(response.data)
        }
    }
        
    const handleChangeAno = (event) => {
        setAno(event.target.value)
    };
    const handleChangeEstado = (event) => {
        setEstado(event.target.value)
        setMunicipio('')
        setCampus('')
        setCurso('')
    }
    const handleChangeMunicipio = (event) => {
        setMunicipio(event.target.value)
        setCampus('')
        setCurso('')
    }
    const handleChangeCampus = (event) => {
        setCampus(event.target.value)

        arrayCampus.map(value => {
            if(value.nome_campus === event.target.value){
                setSiglaIes(value.sigla_ies)
            }
        })
    }
    const handleChangeCurso = (event) => {
        setCurso(event.target.value)
    }
    const handleSubmit2 = (event) => {
        event.preventDefault()
        handleSubmit({ano, estado, municipio, campus, curso, siglaIes})
    }

    useEffect(() => {
        if(campus){
            findCurso()
        } else if(municipio){
            findCampus()
        } else if(estado && ano){
            findEstado()
            findMunicipio()
        }
    }, [ano, estado, municipio, campus])

    return(
        <div className="box-filtro">
            <form onSubmit={handleSubmit2}>
                        <select name="ano" id="ano" value={ano} onChange={handleChangeAno}>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                        </select>

                        <select name="estado" id="estado" value={estado} onChange={handleChangeEstado}>
                            <option value="BRASIL">BRASIL</option>
                            {arrayEstado.map((estado) => {
                                return <option key={estado.uf_campus} value={estado.uf_campus}>{estado.uf_campus}</option>
                            })}
                        </select>

                        <select name="municipio" id="municipio" value={municipio} onChange={handleChangeMunicipio}>
                            <option value="">Selecione o município</option>
                            {arrayMunicipio.map((cidade) => {
                                return <option key={cidade.municipio_campus} value={cidade.municipio_campus}>{cidade.municipio_campus}</option>
                            })}
                        </select>

                        <select name="campus" id="campus"value={campus} onChange={handleChangeCampus}>
                            <option value="">Selecione o campus</option>
                            {arrayCampus.map((faculdade) => {
                                return <option key={faculdade.nome_campus} value={faculdade.nome_campus}>{faculdade.sigla_ies} - {faculdade.nome_campus}</option>
                            })}
                        </select>

                        <select name="curso" id="curso" value={curso} onChange={handleChangeCurso}>
                            <option value="">Selecione o curso</option>
                            {arrayCurso.map((newcurso) => {
                                return <option key={newcurso.nome_curso} value={newcurso.nome_curso}>{newcurso.nome_curso}</option>
                            })}
                        </select>

                        <button className="buttonSearch">Gerar Análise</button>
            </form>
        </div>

    )
}

Form.propTypes = {
    handleSubmit: PropTypes.any.isRequired
}