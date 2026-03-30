import { useEffect, useMemo, useState } from "react"
import AddFoodForm from "./components/AddFoodForm"
import CustomFoodManager from "./components/CustomFoodManager"
import DayItemsTable from "./components/DayItemsTable"
import MealTotalsAndCaloriesChart from "./components/MealTotalsAndCaloriesChart"
import ResumoCard from "./components/ResumoCard"
import UserDataForm from "./components/UserDataForm"
import WeightChart from "./components/WeightChart"
import {
  ALIMENTOS_PADRAO,
  REFEICOES,
  calcularGastoTotal,
  calcularMacros,
  calcularTMB,
  formatarData,
} from "./utils/nutrition"
import { safeParseJSON } from "./utils/storage"

export default function App() {
  const hoje = new Date().toISOString().slice(0, 10)

  const [pesoAtual, setPesoAtual] = useState(0)
  const [metaPeso, setMetaPeso] = useState(0)
  const [altura, setAltura] = useState(0)
  const [idade, setIdade] = useState(0)
  const [sexo, setSexo] = useState("")
  const [atividade, setAtividade] = useState(1.375)
  const [alvoDeficit, setAlvoDeficit] = useState(500)
  const [dataSelecionada, setDataSelecionada] = useState(hoje)

  const [historico, setHistorico] = useState(() => {
    const salvo = localStorage.getItem("controle-calorico-historico")
    return safeParseJSON(salvo, {})
  })

  const [historicoPeso, setHistoricoPeso] = useState(() => {
    const salvo = localStorage.getItem("controle-calorico-peso")
    return safeParseJSON(salvo, {})
  })

  const [alimentosPersonalizados, setAlimentosPersonalizados] = useState(() => {
    const salvo = localStorage.getItem("controle-calorico-alimentos")
    return safeParseJSON(salvo, [])
  })

  const [refeicao, setRefeicao] = useState("Café da manhã")
  const [nomeAlimento, setNomeAlimento] = useState("")
  const [gramas, setGramas] = useState(100)
  const [kcal100g, setKcal100g] = useState(0)
  const [proteina100g, setProteina100g] = useState(0)
  const [carbo100g, setCarbo100g] = useState(0)
  const [gordura100g, setGordura100g] = useState(0)
  const [alimentoSelecionado, setAlimentoSelecionado] = useState("")

  const [novoNome, setNovoNome] = useState("")
  const [novoKcal, setNovoKcal] = useState(0)
  const [novoProt, setNovoProt] = useState(0)
  const [novoCarb, setNovoCarb] = useState(0)
  const [novoGord, setNovoGord] = useState(0)
  const [novaRefeicao, setNovaRefeicao] = useState("Café da manhã")

  useEffect(() => {
    localStorage.setItem("controle-calorico-historico", JSON.stringify(historico))
  }, [historico])

  useEffect(() => {
    localStorage.setItem("controle-calorico-peso", JSON.stringify(historicoPeso))
  }, [historicoPeso])

  useEffect(() => {
    localStorage.setItem("controle-calorico-alimentos", JSON.stringify(alimentosPersonalizados))
  }, [alimentosPersonalizados])

  const todosAlimentos = useMemo(() => [...ALIMENTOS_PADRAO, ...alimentosPersonalizados], [alimentosPersonalizados])

  const tmb = useMemo(
    () => calcularTMB({ peso: Number(pesoAtual), altura: Number(altura), idade: Number(idade), sexo }),
    [pesoAtual, altura, idade, sexo]
  )

  const gastoCaloricoDia = useMemo(() => calcularGastoTotal(tmb, Number(atividade)), [tmb, atividade])

  const itensDoDia = useMemo(() => historico[dataSelecionada]?.itens ?? [], [historico, dataSelecionada])

  const caloriasConsumidas = useMemo(() => itensDoDia.reduce((soma, item) => soma + item.calorias, 0), [itensDoDia])
  const proteinasDia = useMemo(() => itensDoDia.reduce((soma, item) => soma + (item.proteina || 0), 0), [itensDoDia])
  const carbosDia = useMemo(() => itensDoDia.reduce((soma, item) => soma + (item.carbo || 0), 0), [itensDoDia])
  const gordurasDia = useMemo(() => itensDoDia.reduce((soma, item) => soma + (item.gordura || 0), 0), [itensDoDia])

  const metaDoDia = Math.max(gastoCaloricoDia - alvoDeficit, 0)
  const saldo = metaDoDia - caloriasConsumidas
  const faltamKg = Math.max(pesoAtual - metaPeso, 0)
  const previsaoSemanas = alvoDeficit > 0 ? ((faltamKg * 7700) / alvoDeficit / 7).toFixed(1) : "-"
  const percentual = metaDoDia > 0 ? Math.min((caloriasConsumidas / metaDoDia) * 100, 100) : 0

  const totaisPorRefeicao = useMemo(() => {
    return REFEICOES.reduce((acc, nomeRef) => {
      acc[nomeRef] = itensDoDia.filter((item) => item.refeicao === nomeRef).reduce((soma, item) => soma + item.calorias, 0)
      return acc
    }, {})
  }, [itensDoDia])

  const diasRegistrados = Object.keys(historico)
    .sort((a, b) => a.localeCompare(b))
    .map((data) => ({
      data,
      calorias: (historico[data]?.itens || []).reduce((soma, item) => soma + item.calorias, 0),
    }))

  const dadosGraficoCalorias = diasRegistrados.map((dia) => ({
    data: formatarData(dia.data),
    calorias: Number(dia.calorias.toFixed(0)),
    meta: Number(metaDoDia.toFixed(0)),
  }))

  const dadosGraficoPeso = Object.keys(historicoPeso)
    .sort((a, b) => a.localeCompare(b))
    .map((data) => ({
      data: formatarData(data),
      peso: historicoPeso[data],
      meta: metaPeso,
    }))

  function atualizarDia(novosItens) {
    setHistorico((prev) => ({ ...prev, [dataSelecionada]: { itens: novosItens } }))
  }

  function selecionarAlimento(valor) {
    setAlimentoSelecionado(valor)
    const encontrado = todosAlimentos.find((item) => item.nome === valor)

    if (encontrado) {
      setNomeAlimento(encontrado.nome)
      setKcal100g(encontrado.kcal100g)
      setProteina100g(encontrado.proteina100g || 0)
      setCarbo100g(encontrado.carbo100g || 0)
      setGordura100g(encontrado.gordura100g || 0)
      setRefeicao(encontrado.refeicao || "Almoço")
    }
  }

  function adicionarItem() {
    if (!nomeAlimento.trim() || Number(gramas) <= 0 || Number(kcal100g) < 0 || Number(proteina100g) < 0 || Number(carbo100g) < 0 || Number(gordura100g) < 0) {
      return
    }

    const macros = calcularMacros({ gramas, kcal100g, proteina100g, carbo100g, gordura100g })
    const novoItem = {
      id: crypto.randomUUID(),
      refeicao,
      nome: nomeAlimento.trim(),
      gramas: Number(gramas),
      kcal100g: Number(kcal100g),
      proteina100g: Number(proteina100g),
      carbo100g: Number(carbo100g),
      gordura100g: Number(gordura100g),
      ...macros,
    }

    atualizarDia([...itensDoDia, novoItem])

    setNomeAlimento("")
    setGramas(100)
    setKcal100g(0)
    setProteina100g(0)
    setCarbo100g(0)
    setGordura100g(0)
    setAlimentoSelecionado("")
  }

  function removerItem(id) {
    atualizarDia(itensDoDia.filter((item) => item.id !== id))
  }

  function limparDia() {
    atualizarDia([])
  }

  function salvarPesoDoDia() {
    if (pesoAtual <= 0) return

    setHistoricoPeso((prev) => ({ ...prev, [dataSelecionada]: Number(pesoAtual) }))
  }

  function salvarAlimentoPersonalizado() {
    if (!novoNome.trim() || Number(novoKcal) < 0 || Number(novoProt) < 0 || Number(novoCarb) < 0 || Number(novoGord) < 0) {
      return
    }

    const alimento = {
      id: crypto.randomUUID(),
      nome: novoNome.trim(),
      kcal100g: Number(novoKcal),
      proteina100g: Number(novoProt),
      carbo100g: Number(novoCarb),
      gordura100g: Number(novoGord),
      refeicao: novaRefeicao,
    }

    setAlimentosPersonalizados((prev) => [...prev, alimento])

    setNovoNome("")
    setNovoKcal(0)
    setNovoProt(0)
    setNovoCarb(0)
    setNovoGord(0)
    setNovaRefeicao("Café da manhã")
  }

  function removerAlimentoPersonalizado(id) {
    setAlimentosPersonalizados((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="app">
      <div className="container">
        <header className="card">
          <h1>Controle de Déficit Calórico</h1>
          <p>Agora com alimentos personalizados e macros.</p>
        </header>

        <section className="grid two">
          <UserDataForm
            pesoAtual={pesoAtual}
            setPesoAtual={setPesoAtual}
            metaPeso={metaPeso}
            setMetaPeso={setMetaPeso}
            altura={altura}
            setAltura={setAltura}
            idade={idade}
            setIdade={setIdade}
            sexo={sexo}
            setSexo={setSexo}
            atividade={atividade}
            setAtividade={setAtividade}
            alvoDeficit={alvoDeficit}
            setAlvoDeficit={setAlvoDeficit}
            dataSelecionada={dataSelecionada}
            setDataSelecionada={setDataSelecionada}
            salvarPesoDoDia={salvarPesoDoDia}
          />

          <ResumoCard
            tmb={tmb}
            gastoCaloricoDia={gastoCaloricoDia}
            metaDoDia={metaDoDia}
            caloriasConsumidas={caloriasConsumidas}
            proteinasDia={proteinasDia}
            carbosDia={carbosDia}
            gordurasDia={gordurasDia}
            saldo={saldo}
            faltamKg={faltamKg}
            previsaoSemanas={previsaoSemanas}
            percentual={percentual}
          />
        </section>

        <section className="grid two">
          <AddFoodForm
            todosAlimentos={todosAlimentos}
            alimentoSelecionado={alimentoSelecionado}
            selecionarAlimento={selecionarAlimento}
            refeicao={refeicao}
            setRefeicao={setRefeicao}
            refeicoes={REFEICOES}
            nomeAlimento={nomeAlimento}
            setNomeAlimento={setNomeAlimento}
            gramas={gramas}
            setGramas={setGramas}
            kcal100g={kcal100g}
            setKcal100g={setKcal100g}
            proteina100g={proteina100g}
            setProteina100g={setProteina100g}
            carbo100g={carbo100g}
            setCarbo100g={setCarbo100g}
            gordura100g={gordura100g}
            setGordura100g={setGordura100g}
            adicionarItem={adicionarItem}
          />

          <CustomFoodManager
            novoNome={novoNome}
            setNovoNome={setNovoNome}
            novoKcal={novoKcal}
            setNovoKcal={setNovoKcal}
            novoProt={novoProt}
            setNovoProt={setNovoProt}
            novoCarb={novoCarb}
            setNovoCarb={setNovoCarb}
            novoGord={novoGord}
            setNovoGord={setNovoGord}
            novaRefeicao={novaRefeicao}
            setNovaRefeicao={setNovaRefeicao}
            refeicoes={REFEICOES}
            salvarAlimentoPersonalizado={salvarAlimentoPersonalizado}
            alimentosPersonalizados={alimentosPersonalizados}
            removerAlimentoPersonalizado={removerAlimentoPersonalizado}
          />
        </section>

        <section className="grid two">
          <DayItemsTable itensDoDia={itensDoDia} dataSelecionada={dataSelecionada} limparDia={limparDia} removerItem={removerItem} />

          <MealTotalsAndCaloriesChart refeicoes={REFEICOES} totaisPorRefeicao={totaisPorRefeicao} dadosGraficoCalorias={dadosGraficoCalorias} />
        </section>

        <WeightChart dadosGraficoPeso={dadosGraficoPeso} />
      </div>
    </div>
  )
}
