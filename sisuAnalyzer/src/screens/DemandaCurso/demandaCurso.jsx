import { BarChart } from "../../components/Barchart/Barchart"
import { Form } from "../../components/Form/Form";
import { LineChart } from "../../components/LineChart/LineChart";
import { TopBar } from "../../components/TopBar/TopBar";
import { api } from "../../utils/api"
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import './demandaCurso.css'
import { BarDemandaCurso } from "../../components/BarDemandaCurso/BarDemandaCurso";

export function DemandaCurso() {
    const[sisu, setSisu] = useState([])
    const[ano2, setAno2] = useState('')
    const[estado2, setEstado2] = useState('')
    const[municipio2, setMunicipio2] = useState('')
    const[campus2, setCampus2] = useState('')
    const[curso2, setCurso2] = useState('')
    const[siglaIes2, setSiglaIes2] = useState('')
    const[demandaCurso, setDemandaCurso] = useState([])
    const[aprovadoCurso, setAprovadoCurso] = useState([])

    async function findConcorrenciaAno() {
        const response = await api.get(`/concorrencia/sisu${ano2}`)
        if(response.data){
            setSisu(response.data)
        } else{
            setSisu([])
        }
    }
    async function findConcorrenciaEstado() {
        const response = await api.get(`/concorrencia/sisu${ano2}/${estado2}`)
        if(response.data){
            setSisu(response.data)
        } else{
            setSisu([])
        }
    }
    async function findConcorrenciaMunicipio() {
        const response = await api.get(`/concorrencia/sisu${ano2}/${estado2}/${municipio2}`)
        if(response.data){
            setSisu(response.data)
        } else{
            setSisu([])
        }
    }
    async function findConcorrenciaCampus() {
        const response = await api.get(`/concorrencia/sisu${ano2}/${estado2}/${municipio2}/${campus2}`)
        if(response.data){
            setSisu(response.data)
        } else{
            setSisu([])
        }
    }
    async function findConcorrenciaCurso() {
        const response = await api.get(`/concorrencia/sisu${ano2}/${estado2}/${municipio2}/${campus2}/${curso2}`)
        if(response.data){
            setSisu(response.data)
        } else{
            setSisu([])
        }
    }
    async function findDemandaCurso() {
        const response = await api.get(`/aprovadoCurso/sisu${ano2}/${estado2}/${municipio2}/${campus2}/${curso2}`)
        const response2 = await api.get(`/demandaCurso/sisu${ano2}/${estado2}/${municipio2}/${campus2}/${curso2}`)
        if(response.data && response2.data){
            setAprovadoCurso(response.data)
            setDemandaCurso(response2.data)
        } else{
            setDemandaCurso([])
        }
    }
    const handleSubmit = ({ano, estado, municipio, campus, curso, siglaIes}) => {
        setAno2(ano)
        setEstado2(estado)
        setMunicipio2(municipio)
        setCampus2(campus)
        setCurso2(curso)
        setSiglaIes2(siglaIes)
    }

    useEffect(() => {
        if(ano2 && estado2){
            if(curso2){
                findConcorrenciaCurso()
                findDemandaCurso()
            }
            else if (campus2){
                findConcorrenciaCampus()
            }  else if (municipio2){
                findConcorrenciaMunicipio()
            } else if(estado2 === 'BRASIL'){
                findConcorrenciaAno()
            } else{
                findConcorrenciaEstado()
            }
        }
    }, [ano2, estado2, municipio2, campus2, curso2])

    return(
        <div>
            <TopBar />
            <Form 
                handleSubmit={handleSubmit}
            />
            <h2 className="titulo-demanda">Demanda por curso</h2>

            {sisu.length > 0 && (
                curso2 ? (
                    <div className="divDemandaCurso">
                        {demandaCurso.length > 0 && (
                            <BarDemandaCurso demandaCurso={demandaCurso} aprovadoCurso = {aprovadoCurso} ano={ano2} curso={curso2} campus={campus2} siglaIes={siglaIes2}/>
                        )}
                        <LineChart sisu={sisu} curso={curso2} campus={campus2} siglaIes={siglaIes2}/>
                    </div>
                ) : (
                    <div>
                        <BarChart sisu={sisu} ano={ano2} estado={estado2} municipio={municipio2} campus={campus2} siglaIes={siglaIes2} tipoAnalise={'maisConcorrido'}/>
                        <BarChart sisu={sisu.slice().reverse()} ano={ano2} estado={estado2} municipio={municipio2} campus={campus2} siglaIes={siglaIes2} tipoAnalise={'menosConcorrido'}/>
                        <Footer />
                    </div>
    
                )
            )}
        </div>
    )
}