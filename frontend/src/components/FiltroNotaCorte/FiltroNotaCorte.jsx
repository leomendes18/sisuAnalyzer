import { useEffect, useState } from "react"
import { api } from "../../utils/api";
import PropTypes from "prop-types";
import './FiltroNotaCorte.css'

export function FiltroNotaCorte({handleSubmit}) {
    const[ano, setAno] = useState('2023')
    const[arrayCurso, setArrayCurso] = useState([])
    const[curso, setCurso] = useState('')
    const[arrayModConcorrencia, setArrayModConcorrencia] = useState([])
    const[modConcorrencia, setModConcorrencia] = useState('')
    
    async function findCursos() {
        const response = await api.get(`/cursoNotaCorte/sisu${ano}/`)
        if(response.data){
            setArrayCurso(response.data)
        }
    }
    async function findModConcorrencia(){
        const response = await api.get(`/modConcorrencia/sisu${ano}/${curso}`)
        if(response.data){
            setArrayModConcorrencia(response.data)
        }
    }
    const handleChangeAno = (event) => {
        setAno(event.target.value)
        setCurso('')
        setModConcorrencia('')
    }
    const handleChangeCurso = (event) => {
        setCurso(event.target.value)
        setModConcorrencia('')
    }
    const handleChangeModConcorrencia = (event) => {
        setModConcorrencia(event.target.value)
    }
    const handleSubmit2 = (event) => {
        event.preventDefault()
        handleSubmit({ano, curso, modConcorrencia})
    }

    useEffect(() => {
        if(curso){
            findModConcorrencia()
        } else if(ano){
            findCursos()
        } 
    }, [ano, curso])
    return (
        <div className="box-filtroNotaCorte">
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
                <select name="curso" id="curso" value={curso} onChange={handleChangeCurso}>
                    <option value="">Selecione o curso</option>
                    {arrayCurso.map((newcurso) => {
                        return <option key={newcurso.nome_curso} value={newcurso.nome_curso}>{newcurso.nome_curso}</option>
                    })}
                </select>
                
                {
                    <select name="modConcorrencia" id="modConcorrencia" value={modConcorrencia} onChange={handleChangeModConcorrencia}>
                        <option value="">Selecione o Modo de Concorrência</option>
                        {arrayModConcorrencia.map((concorrencia) => {
                            console.log(concorrencia.mod_concorrencia.length)
                            if(concorrencia.mod_concorrencia.length >= 100){
                                let abrevConcorrencia = concorrencia.mod_concorrencia.slice(0, 100) + '...'
                                return <option title={concorrencia.mod_concorrencia} key={concorrencia.mod_concorrencia} value={concorrencia.mod_concorrencia}>{abrevConcorrencia}</option>
                            } else{
                                return <option title={concorrencia.mod_concorrencia} key={concorrencia.mod_concorrencia} value={concorrencia.mod_concorrencia}>{concorrencia.mod_concorrencia}</option>
                            }
                        })}
                    </select>
                }
       
                <button className="ButtonNotaCorte">Gerar Análise</button>
            </form>

        </div>
    )
}

FiltroNotaCorte.propTypes = {
    handleSubmit: PropTypes.any.isRequired
}