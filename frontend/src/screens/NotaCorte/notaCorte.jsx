import { useEffect, useState } from "react"
import { api } from "../../utils/api";
import { BarNotaCorte } from "../../components/BarNotaCorte/BarNotaCorte";
import { TopBar } from "../../components/TopBar/TopBar";
import { Footer } from "../../components/Footer/Footer"
import { FiltroNotaCorte } from "../../components/FiltroNotaCorte/FiltroNotaCorte";
import "./notaCorte.css"

export function NotaCorte(){
    const[ano2, setAno2] = useState('2023')
    const[curso2, setCurso2] = useState('')
    const[modConcorrencia2, setModConcorrencia2] = useState('')
    const[arrayNotaCorte, setArrayNotaCorte] = useState([])

    async function notaCorteCurso(){
        const dados = {
            sisu: `sisu${ano2}`,
            curso: curso2,
            modConcorrencia: modConcorrencia2
        }
        const response = await api.post(`/notaCorte`, dados, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.data){
            setArrayNotaCorte(response.data)
        } else{
            setArrayNotaCorte([])
        }   
    }
    const handleSubmit = ({ano, curso, modConcorrencia}) => {
        setAno2(ano)
        setCurso2(curso)
        setModConcorrencia2(modConcorrencia)
    }

    useEffect(() => {
        if(modConcorrencia2){
            notaCorteCurso()
        }
    }, [modConcorrencia2])
    return(
        <div>
            <TopBar />

            <FiltroNotaCorte  handleSubmit={handleSubmit}/>

            <h2 className="titulo-notaCorte">Nota de corte</h2>

            {arrayNotaCorte.length > 0 &&(
                <div>
                    <BarNotaCorte notaCorte={arrayNotaCorte} curso={curso2} type={'Maiores Notas de corte'} modConcorrencia={modConcorrencia2}/>
                    <BarNotaCorte notaCorte={arrayNotaCorte.slice().reverse()} curso={curso2} type={'Menores Notas de corte'} modConcorrencia={modConcorrencia2}/>
                    <Footer />
                </div>
            )}
        </div>
    )
}