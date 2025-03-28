import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo_azul.png'
import './TopBar.css'

export function TopBar(){
    const navigate = useNavigate();
    
    function homeScreen(){
        navigate('/')
    }
    function demandaCursoScreen(){
        navigate('/demandaCurso')
    }
    function notaCorteScreen(){
        navigate('/notaCorte')
    }
    function perfilCandidatosScreen(){
        navigate('/perfilCandidatos')
    }

    return(
        <div className="topBar">
            <div className="divLogo" >
                <img src={logo} alt="logo" />
                <span onClick={homeScreen}>SISU ANALYZER</span>
            </div>
            <div className="buttons">
                <button onClick={demandaCursoScreen}>Demanda por Curso</button>
                <button onClick={notaCorteScreen}>Nota de Corte</button>
                <button onClick={perfilCandidatosScreen}>Perfil dos Candidatos</button>

            </div>
        </div>
    )
}