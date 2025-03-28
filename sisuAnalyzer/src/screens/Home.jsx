import { TopBar } from "../components/TopBar/TopBar";
import iconDemanda from "../assets/demanda.png"
import iconNota from "../assets/notaCorte.png"
import iconCandidato from "../assets/perfilCandidato.png"
import './home.css'
import { Footer } from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    function demandaCursoScreen(){
        navigate('/demandaCurso')
    }

    return (
        <div>
            <TopBar />
            <section className="hero">
                <h1>Descubra Tudo Sobre o SISU de 2016 a 2023</h1>
                <p>Analise a demanda por cursos, notas de corte e o perfil dos candidatos de forma simples e intuitiva.</p>
                <button className="cta-button" onClick={demandaCursoScreen}>Explore as Análises</button>
            </section>
            <section className="funcionalidades">
                <h2>O Que Você Pode Analisar?</h2>
                <div className="cards">
                    <div className="card">
                        <img src={iconDemanda} alt="Demanda por Curso" />
                        <h3>Demanda por Curso</h3>
                        <p>Veja a procura por cursos ao longo dos anos.</p>
                    </div>
                    <div className="card">
                        <img src={iconNota} alt="Nota de Corte" />
                        <h3>Nota de Corte</h3>
                        <p>Analise as notas de corte dos cursos.</p>
                    </div>
                    <div className="card">
                        <img src={iconCandidato} alt="Perfil dos Candidatos" />
                        <h3>Perfil dos Candidatos</h3>
                        <p>Conheça o perfil dos candidatos do SISU.</p>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}