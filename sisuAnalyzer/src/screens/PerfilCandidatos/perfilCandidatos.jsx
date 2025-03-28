import { useEffect, useState} from "react"
import { Form } from "../../components/Form/Form"
import { PieSexo } from "../../components/PieSexo/PieSexo"
import { BarFaixaEtaria } from "../../components/BarFaixaEtaria/BarFaixaEtaria"
import { TopBar } from "../../components/TopBar/TopBar"
import { api } from "../../utils/api"
import { Footer } from "../../components/Footer/Footer"
import './perfilCandidatos.css'

export function PerfilCandidatos(){
    const[ano2, setAno2] = useState('')
    const[estado2, setEstado2] = useState('')
    const[municipio2, setMunicipio2] = useState('')
    const[campus2, setCampus2] = useState('')
    const[curso2, setCurso2] = useState('')
    const[siglaIes2, setSiglaIes2] = useState('')
    const[arraySexo, setArraySexo] = useState([])
    const[arrayFaixaEtaria, setArrayFaixaEtaria] = useState([])

    async function findConcorrenciaSexo() {
        const response = await api.get(`/sexo/sisu${ano2}/${estado2}/${municipio2}/${campus2}/${curso2}`)
        if(response.data){
            setArraySexo(response.data)
        } else{
            setArraySexo([])
        }   
    }
    async function findFaixaEtaria() {
        const response = await api.get(`/faixaEtaria/sisu${ano2}/${estado2}/${municipio2}/${campus2}/${curso2}`)
        if(response.data){
            setArrayFaixaEtaria(response.data)
        } else{
            setArrayFaixaEtaria([])
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
        if(curso2){
            findConcorrenciaSexo()
            findFaixaEtaria()
        }
    }, [ano2, estado2, municipio2, campus2, curso2])
    return(
        <div>
            <TopBar />
            
            <Form 
                handleSubmit={handleSubmit}
            />

            <h2 className="titulo-perfilCandidatos">Perfil dos candidatos</h2>
            <div className="divPerfil">
                {arrayFaixaEtaria.length > 0 && curso2 &&(
                    <BarFaixaEtaria faixaEtaria={arrayFaixaEtaria} ano={ano2} curso={curso2} campus={campus2} siglaIes={siglaIes2}/>
                )}
                {arraySexo.length > 0 && curso2 &&(
                    <PieSexo sexo={arraySexo} ano={ano2} curso={curso2}/>
                )}
            </div>
        </div>
    )
}