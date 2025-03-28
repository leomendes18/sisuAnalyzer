const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/concorrencia/:sisu', async (req, res) => {
    const {sisu} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }
    
    const query = `SELECT ano, nome_curso, COUNT(*) AS quantidade FROM "${sisu}" GROUP BY ano, nome_curso ORDER BY quantidade DESC`
    const sisu2 = await prisma.$queryRawUnsafe(query)
    const newsisu = sisu2.map(row => ({
        ano: row.ano,
        nome_curso: row.nome_curso,
        quantidade: Number(row.quantidade)
    }))
    res.json(newsisu)
}) 

app.get('/concorrencia/:sisu/:estado', async (req, res) => {
    const {sisu, estado} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT ano, nome_curso, uf_campus, COUNT(*) AS quantidade FROM "${sisu}" WHERE uf_campus = '${estado}' GROUP BY ano, nome_curso, uf_campus  ORDER BY quantidade DESC`
    const sisu2 = await prisma.$queryRawUnsafe(query)
    const newsisu = sisu2.map(row => ({
        ano: row.ano,
        nome_curso: row.nome_curso,
        uf_campus: row.uf_campus,
        quantidade: Number(row.quantidade)
    }))
    res.json(newsisu)
})

app.get('/concorrencia/:sisu/:estado/:municipio', async (req, res) => {
    const {sisu, estado, municipio} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT ano, nome_curso, uf_campus, municipio_campus, COUNT (*) AS quantidade FROM "${sisu}" WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' GROUP BY ano, nome_curso, uf_campus, municipio_campus ORDER BY quantidade DESC`
    const cidade = await prisma.$queryRawUnsafe(query)
    const newcidade = cidade.map(row => ({
        ano: row.ano,
        nome_curso: row.nome_curso,
        uf_campus: row.uf_campus,
        municipio_campus: row.municipio_campus,
        quantidade: Number(row.quantidade)
    }))
    res.json(newcidade)
})

app.get('/concorrencia/:sisu/:estado/:municipio/:campus', async (req, res) => {
    const {sisu, estado, municipio, campus} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT ano, nome_curso, uf_campus, municipio_campus, nome_campus, COUNT (*) AS quantidade  FROM "${sisu}" WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' AND nome_campus = '${campus}'  GROUP BY ano, nome_curso, uf_campus, municipio_campus, nome_campus ORDER BY quantidade DESC`
    const faculdade = await prisma.$queryRawUnsafe(query)
    const newcampus = faculdade.map(row => ({
        ano: row.ano,
        nome_curso: row.nome_curso,
        uf_campus: row.uf_campus,
        municipio_campus: row.municipio_campus,
        nome_campus: row.nome_campus,
        quantidade: Number(row.quantidade)
    }))
    res.json(newcampus)
})

app.get('/concorrencia/:sisu/:estado/:municipio/:campus/:curso', async (req, res) => {
    const {sisu, estado, municipio, campus, curso} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }
    let query = ''
    tabelasPermitidas.map((tabela, index) => {
        if(index != 0){
            query += ' UNION ALL '
        }
        query += `SELECT ano, nome_curso, uf_campus, municipio_campus, nome_campus, COUNT(*) AS quantidade FROM "${tabela}" WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' AND nome_campus = '${campus}' AND nome_curso = '${curso}' GROUP BY ano, nome_curso, uf_campus, municipio_campus, nome_campus`
    })
    const curso2 = await prisma.$queryRawUnsafe(query)
    const newCurso = curso2.map(row => ({
        ano: row.ano,
        nome_curso: row.nome_curso,
        uf_campus: row.uf_campus,
        municipio_campus: row.municipio_campus,
        nome_campus: row.nome_campus,
        quantidade: Number(row.quantidade)
    }))
    res.json(newCurso)
})
app.get('/aprovadoCurso/:sisu/:estado/:municipio/:campus/:curso', async (req, res) => {
    const {sisu, estado, municipio, campus, curso} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT aprovado, COUNT (*) AS quantidade FROM "${sisu}" WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' AND nome_campus = '${campus}' and nome_curso = '${curso}' and aprovado = 'S' GROUP BY aprovado`
    const aprovado = await prisma.$queryRawUnsafe(query)
    const aprovadoCurso = aprovado.map(row => ({
        aprovado: row.aprovado, 
        quantidade: Number(row.quantidade)
    }))
    res.json(aprovadoCurso)
})
app.get('/demandaCurso/:sisu/:estado/:municipio/:campus/:curso', async (req, res) => {
    const {sisu, estado, municipio, campus, curso} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT nome_curso, COUNT (*) AS quantidade FROM "${sisu}" WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' AND nome_campus = '${campus}' and nome_curso = '${curso}' GROUP BY nome_curso`
    const demanda = await prisma.$queryRawUnsafe(query)
    const demandaCurso = demanda.map(row => ({
        aprovado: row.aprovado, 
        quantidade: Number(row.quantidade)
    }))
    res.json(demandaCurso)
})

app.get('/sexo/:sisu/:estado/:municipio/:campus/:curso', async (req, res) => {
    const {sisu, estado, municipio, campus, curso} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT sexo, COUNT (*) AS quantidade FROM "${sisu}" WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' AND nome_campus = '${campus}' and nome_curso = '${curso}' GROUP BY sexo`
    const sexo2 = await prisma.$queryRawUnsafe(query)
    const newSexo = sexo2.map(row => ({
        sexo: row.sexo,
        quantidade: Number(row.quantidade)
    }))
    res.json(newSexo)
})

app.get('/faixaEtaria/:sisu/:estado/:municipio/:campus/:curso', async (req, res) => {
    const {sisu, estado, municipio, campus, curso} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    let query
    if(sisu === 'sisu2023'){
        query = `SELECT
                            CASE
                                WHEN ano - data_nascimento BETWEEN 18 AND 24 THEN '18-24 anos'
                                WHEN ano - data_nascimento BETWEEN 25 AND 34 THEN '25-34 anos'
                                WHEN ano - data_nascimento BETWEEN 35 AND 44 THEN '35-44 anos'
                                WHEN ano - data_nascimento BETWEEN 45 AND 59 THEN '45-59 anos'
                                ELSE '60 anos ou mais'
                            END AS faixa_etaria, 
                            COUNT(*) AS total_faixaEtaria
                        FROM "${sisu}"
                        WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' AND nome_campus = '${campus}' and nome_curso = '${curso}'
                        GROUP BY faixa_etaria
                        ORDER BY total_faixaetaria DESC`
    } else{
        query = `SELECT 
                            CASE 
                                WHEN ano - EXTRACT(YEAR FROM data_nascimento) BETWEEN 18 AND 24 THEN '18-24 anos'
                                WHEN ano - EXTRACT(YEAR FROM data_nascimento) BETWEEN 25 AND 34 THEN '25-34 anos'
                                WHEN ano - EXTRACT(YEAR FROM data_nascimento) BETWEEN 35 AND 44 THEN '35-44 anos'
                                WHEN ano - EXTRACT(YEAR FROM data_nascimento) BETWEEN 45 AND 59 THEN '45-59 anos'
                                ELSE '60 anos ou mais'
                            END AS faixa_etaria, 
                            COUNT(*) AS total_faixaEtaria
                        FROM "${sisu}"
                        WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' AND nome_campus = '${campus}' and nome_curso = '${curso}'
                        GROUP BY faixa_etaria
                        ORDER BY total_faixaetaria DESC`

    }
    const array = await prisma.$queryRawUnsafe(query)
    const faixaEtaria = array.map((row) => ({
        faixa_etaria: row.faixa_etaria,
        total_faixaetaria: Number(row.total_faixaetaria)
    }))
    res.json(faixaEtaria)        
})

app.post('/notaCorte', async (req, res) => {
    const {sisu, curso, modConcorrencia} = req.body
    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT DISTINCT nome_curso, sigla_ies, nome_campus, nota_corte, mod_concorrencia FROM "${sisu}" where nome_curso = '${curso}' AND mod_concorrencia = '${modConcorrencia}' AND nota_corte IS NOT NULL ORDER BY nota_corte DESC`
    const notaCorte = await prisma.$queryRawUnsafe(query)
    res.json(notaCorte)
})
app.get('/cursoNotaCorte/:sisu', async (req, res) => {
    const {sisu} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT DISTINCT nome_curso FROM "${sisu}"`
    const cursos = await prisma.$queryRawUnsafe(query)
    res.json(cursos)
})
app.get('/modConcorrencia/:sisu/:curso', async (req, res) => {
    const {sisu, curso} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT DISTINCT mod_concorrencia FROM "${sisu}" WHERE nome_curso = '${curso}' AND nota_corte IS NOT NULL`
    const modConcorrencia = await prisma.$queryRawUnsafe(query)
    res.json(modConcorrencia)
})
app.get('/estado/:sisu', async (req, res) => {
    const {sisu} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT DISTINCT uf_campus FROM "${sisu}"`
    const estado = await prisma.$queryRawUnsafe(query)
    res.json(estado)
})

app.get('/municipio/:sisu/:estado', async (req, res) => {
    const {sisu, estado} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT DISTINCT municipio_campus FROM "${sisu}" WHERE uf_campus = '${estado}'`
    const municipio = await prisma.$queryRawUnsafe(query)
    res.json(municipio)
})

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})

app.get('/campus/:sisu/:estado/:municipio', async (req, res) => {
    const {sisu, estado, municipio} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT DISTINCT sigla_ies, nome_campus FROM "${sisu}" WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}'`
    const campus = await prisma.$queryRawUnsafe(query)
    res.json(campus)
})

app.get('/curso/:sisu/:estado/:municipio/:campus', async (req, res) => {
    const {sisu, estado, municipio, campus} = req.params

    const tabelasPermitidas = ['sisu2016', 'sisu2017', 'sisu2018', 'sisu2019', 'sisu2020', 'sisu2021', 'sisu2022', 'sisu2023']
    if (!tabelasPermitidas.includes(sisu)) {
        return res.status(400).json({ error: 'Tabela não existe!' });
    }

    const query = `SELECT DISTINCT nome_curso FROM "${sisu}" WHERE uf_campus = '${estado}' AND municipio_campus = '${municipio}' AND nome_campus = '${campus}'`
    const curso2 = await prisma.$queryRawUnsafe(query)
    res.json(curso2)
})