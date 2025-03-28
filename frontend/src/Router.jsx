import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/home";
import { DemandaCurso } from "./screens/DemandaCurso/demandaCurso"
import { NotaCorte } from "./screens/NotaCorte/notaCorte"
import { PerfilCandidatos } from "./screens/PerfilCandidatos/perfilCandidatos"
import { BrowserRouter } from "react-router-dom"

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/demandaCurso" element={<DemandaCurso/>}/>
                <Route path="/notaCorte" element={<NotaCorte/>}/>
                <Route path="/perfilCandidatos" element={<PerfilCandidatos/>}/>
            </Routes>
        </BrowserRouter>
    )
}