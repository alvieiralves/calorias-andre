import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const alimentosPadrao = [
  {
    nome: "Arroz cozido",
    kcal100g: 130,
    proteina100g: 2.5,
    carbo100g: 28,
    gordura100g: 0.3,
    refeicao: "Almoço",
  },
  {
    nome: "Feijão cozido",
    kcal100g: 76,
    proteina100g: 4.8,
    carbo100g: 13.6,
    gordura100g: 0.5,
    refeicao: "Almoço",
  },
  {
    nome: "Peito de frango grelhado",
    kcal100g: 165,
    proteina100g: 31,
    carbo100g: 0,
    gordura100g: 3.6,
    refeicao: "Almoço",
  },
  {
    nome: "Ovo cozido",
    kcal100g: 155,
    proteina100g: 13,
    carbo100g: 1.1,
    gordura100g: 11,
    refeicao: "Café da manhã",
  },
  {
    nome: "Pão francês",
    kcal100g: 300,
    proteina100g: 8,
    carbo100g: 58,
    gordura100g: 3,
    refeicao: "Café da manhã",
  },
  {
    nome: "Banana",
    kcal100g: 89,
    proteina100g: 1.1,
    carbo100g: 23,
    gordura100g: 0.3,
    refeicao: "Lanche",
  },
  {
    nome: "Maçã",
    kcal100g: 52,
    proteina100g: 0.3,
    carbo100g: 14,
    gordura100g: 0.2,
    refeicao: "Lanche",
  },
  {
    nome: "Aveia",
    kcal100g: 389,
    proteina100g: 16.9,
    carbo100g: 66.3,
    gordura100g: 6.9,
    refeicao: "Café da manhã",
  },
];

const refeicoes = ["Café da manhã", "Almoço", "Jantar", "Lanche"];

function formatarData(dataString) {
  if (!dataString) return "";
  const [ano, mes, dia] = dataString.split("-");
  return `${dia}/${mes}/${ano}`;
}

function calcularTMB({ peso, altura, idade, sexo }) {
  if (!peso || !altura || !idade || !sexo) return 0;

  if (sexo === "masculino") {
    return 10 * peso + 6.25 * altura - 5 * idade + 5;
  }

  return 10 * peso + 6.25 * altura - 5 * idade - 161;
}

function calcularGastoTotal(tmb, fatorAtividade) {
  return tmb * fatorAtividade;
}

export default function App() {
  const hoje = new Date().toISOString().slice(0, 10);

  const [pesoAtual, setPesoAtual] = useState(0);
  const [metaPeso, setMetaPeso] = useState(0);
  const [altura, setAltura] = useState(0);
  const [idade, setIdade] = useState(0);
  const [sexo, setSexo] = useState();
  const [atividade, setAtividade] = useState(1.375);
  const [alvoDeficit, setAlvoDeficit] = useState(500);
  const [dataSelecionada, setDataSelecionada] = useState(hoje);

  const [historico, setHistorico] = useState(() => {
    const salvo = localStorage.getItem("controle-calorico-historico");
    return salvo ? JSON.parse(salvo) : {};
  });

  const [historicoPeso, setHistoricoPeso] = useState(() => {
    const salvo = localStorage.getItem("controle-calorico-peso");
    return salvo ? JSON.parse(salvo) : {};
  });

  const [alimentosPersonalizados, setAlimentosPersonalizados] = useState(() => {
    const salvo = localStorage.getItem("controle-calorico-alimentos");
    return salvo ? JSON.parse(salvo) : [];
  });

  const [refeicao, setRefeicao] = useState("Café da manhã");
  const [nomeAlimento, setNomeAlimento] = useState("");
  const [gramas, setGramas] = useState(100);
  const [kcal100g, setKcal100g] = useState(0);
  const [proteina100g, setProteina100g] = useState(0);
  const [carbo100g, setCarbo100g] = useState(0);
  const [gordura100g, setGordura100g] = useState(0);
  const [alimentoSelecionado, setAlimentoSelecionado] = useState("");

  const [novoNome, setNovoNome] = useState("");
  const [novoKcal, setNovoKcal] = useState(0);
  const [novoProt, setNovoProt] = useState(0);
  const [novoCarb, setNovoCarb] = useState(0);
  const [novoGord, setNovoGord] = useState(0);
  const [novaRefeicao, setNovaRefeicao] = useState("Café da manhã");

  useEffect(() => {
    localStorage.setItem("controle-calorico-historico", JSON.stringify(historico));
  }, [historico]);

  useEffect(() => {
    localStorage.setItem("controle-calorico-peso", JSON.stringify(historicoPeso));
  }, [historicoPeso]);

  useEffect(() => {
    localStorage.setItem(
      "controle-calorico-alimentos",
      JSON.stringify(alimentosPersonalizados)
    );
  }, [alimentosPersonalizados]);

  const todosAlimentos = [...alimentosPadrao, ...alimentosPersonalizados];

  const tmb = useMemo(
    () =>
      calcularTMB({
        peso: Number(pesoAtual),
        altura: Number(altura),
        idade: Number(idade),
        sexo,
      }),
    [pesoAtual, altura, idade, sexo]
  );

  const gastoCaloricoDia = useMemo(
    () => calcularGastoTotal(tmb, Number(atividade)),
    [tmb, atividade]
  );

  const itensDoDia = historico[dataSelecionada]?.itens || [];

  const caloriasConsumidas = useMemo(
    () => itensDoDia.reduce((soma, item) => soma + item.calorias, 0),
    [itensDoDia]
  );

  const proteinasDia = useMemo(
    () => itensDoDia.reduce((soma, item) => soma + (item.proteina || 0), 0),
    [itensDoDia]
  );

  const carbosDia = useMemo(
    () => itensDoDia.reduce((soma, item) => soma + (item.carbo || 0), 0),
    [itensDoDia]
  );

  const gordurasDia = useMemo(
    () => itensDoDia.reduce((soma, item) => soma + (item.gordura || 0), 0),
    [itensDoDia]
  );

  const metaDoDia = Math.max(gastoCaloricoDia - alvoDeficit, 0);
  const saldo = metaDoDia - caloriasConsumidas;
  const faltamKg = Math.max(pesoAtual - metaPeso, 0);

  const previsaoSemanas =
    alvoDeficit > 0 ? ((faltamKg * 7700) / alvoDeficit / 7).toFixed(1) : "-";

  const percentual =
    metaDoDia > 0 ? Math.min((caloriasConsumidas / metaDoDia) * 100, 100) : 0;

  const totaisPorRefeicao = useMemo(() => {
    return refeicoes.reduce((acc, nomeRef) => {
      acc[nomeRef] = itensDoDia
        .filter((item) => item.refeicao === nomeRef)
        .reduce((soma, item) => soma + item.calorias, 0);
      return acc;
    }, {});
  }, [itensDoDia]);

  const diasRegistrados = Object.keys(historico)
    .sort((a, b) => a.localeCompare(b))
    .map((data) => ({
      data,
      calorias: (historico[data]?.itens || []).reduce(
        (soma, item) => soma + item.calorias,
        0
      ),
    }));

  const dadosGraficoCalorias = diasRegistrados.map((dia) => ({
    data: formatarData(dia.data),
    calorias: Number(dia.calorias.toFixed(0)),
    meta: Number(metaDoDia.toFixed(0)),
  }));

  const dadosGraficoPeso = Object.keys(historicoPeso)
    .sort((a, b) => a.localeCompare(b))
    .map((data) => ({
      data: formatarData(data),
      peso: historicoPeso[data],
      meta: metaPeso,
    }));

  function atualizarDia(novosItens) {
    setHistorico((prev) => ({
      ...prev,
      [dataSelecionada]: {
        itens: novosItens,
      },
    }));
  }

  function selecionarAlimento(valor) {
    setAlimentoSelecionado(valor);
    const encontrado = todosAlimentos.find((item) => item.nome === valor);

    if (encontrado) {
      setNomeAlimento(encontrado.nome);
      setKcal100g(encontrado.kcal100g);
      setProteina100g(encontrado.proteina100g || 0);
      setCarbo100g(encontrado.carbo100g || 0);
      setGordura100g(encontrado.gordura100g || 0);
      setRefeicao(encontrado.refeicao || "Almoço");
    }
  }

  function adicionarItem() {
    if (!nomeAlimento.trim() || Number(gramas) <= 0 || Number(kcal100g) < 0) {
      return;
    }

    const calorias = (Number(gramas) * Number(kcal100g)) / 100;
    const proteina = (Number(gramas) * Number(proteina100g)) / 100;
    const carbo = (Number(gramas) * Number(carbo100g)) / 100;
    const gordura = (Number(gramas) * Number(gordura100g)) / 100;

    const novoItem = {
      id: Date.now(),
      refeicao,
      nome: nomeAlimento.trim(),
      gramas: Number(gramas),
      kcal100g: Number(kcal100g),
      proteina100g: Number(proteina100g),
      carbo100g: Number(carbo100g),
      gordura100g: Number(gordura100g),
      calorias,
      proteina,
      carbo,
      gordura,
    };

    atualizarDia([...itensDoDia, novoItem]);

    setNomeAlimento("");
    setGramas(100);
    setKcal100g(0);
    setProteina100g(0);
    setCarbo100g(0);
    setGordura100g(0);
    setAlimentoSelecionado("");
  }

  function removerItem(id) {
    atualizarDia(itensDoDia.filter((item) => item.id !== id));
  }

  function limparDia() {
    atualizarDia([]);
  }

  function salvarPesoDoDia() {
    if (!pesoAtual) return;

    setHistoricoPeso((prev) => ({
      ...prev,
      [dataSelecionada]: Number(pesoAtual),
    }));
  }

  function salvarAlimentoPersonalizado() {
    if (!novoNome.trim()) return;

    const alimento = {
      id: Date.now(),
      nome: novoNome.trim(),
      kcal100g: Number(novoKcal),
      proteina100g: Number(novoProt),
      carbo100g: Number(novoCarb),
      gordura100g: Number(novoGord),
      refeicao: novaRefeicao,
    };

    setAlimentosPersonalizados((prev) => [...prev, alimento]);

    setNovoNome("");
    setNovoKcal(0);
    setNovoProt(0);
    setNovoCarb(0);
    setNovoGord(0);
    setNovaRefeicao("Café da manhã");
  }

  function removerAlimentoPersonalizado(id) {
    setAlimentosPersonalizados((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <div className="container">
        <header className="card">
          <h1>Controle de Déficit Calórico</h1>
          <p>
            Agora com alimentos personalizados e macros.
          </p>
        </header>

        <section className="grid two">
          <div className="card">
            <h2>Seus dados</h2>

            <div className="form-grid">
              <div>
                <label>Peso atual (kg)</label>
                <input
                  type="number"
                  value={pesoAtual}
                  onChange={(e) => setPesoAtual(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Meta de peso (kg)</label>
                <input
                  type="number"
                  value={metaPeso}
                  onChange={(e) => setMetaPeso(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Altura (cm)</label>
                <input
                  type="number"
                  value={altura}
                  onChange={(e) => setAltura(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Idade</label>
                <input
                  type="number"
                  value={idade}
                  onChange={(e) => setIdade(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Sexo</label>
                <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>

              <div>
                <label>Nível de atividade</label>
                <select
                  value={atividade}
                  onChange={(e) => setAtividade(Number(e.target.value))}
                >
                  <option value={1.2}>Sedentário</option>
                  <option value={1.375}>Levemente ativo</option>
                  <option value={1.55}>Moderadamente ativo</option>
                  <option value={1.725}>Muito ativo</option>
                  <option value={1.9}>Extremamente ativo</option>
                </select>
              </div>

              <div>
                <label>Déficit desejado (kcal)</label>
                <input
                  type="number"
                  value={alvoDeficit}
                  onChange={(e) => setAlvoDeficit(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Data</label>
                <input
                  type="date"
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                />
              </div>
            </div>

            <div className="actions-row">
              <button className="primary-btn" onClick={salvarPesoDoDia}>
                Salvar peso do dia
              </button>
            </div>
          </div>

          <div className="card">
            <h2>Resumo automático</h2>

            <div className="stats-grid">
              <div className="stat-box">
                <span>TMB</span>
                <strong>{tmb.toFixed(0)} kcal</strong>
              </div>

              <div className="stat-box">
                <span>Gasto diário</span>
                <strong>{gastoCaloricoDia.toFixed(0)} kcal</strong>
              </div>

              <div className="stat-box">
                <span>Meta do dia</span>
                <strong>{metaDoDia.toFixed(0)} kcal</strong>
              </div>

              <div className="stat-box">
                <span>Consumidas</span>
                <strong>{caloriasConsumidas.toFixed(0)} kcal</strong>
              </div>

              <div className="stat-box">
                <span>Proteína</span>
                <strong>{proteinasDia.toFixed(1)} g</strong>
              </div>

              <div className="stat-box">
                <span>Carboidrato</span>
                <strong>{carbosDia.toFixed(1)} g</strong>
              </div>

              <div className="stat-box">
                <span>Gordura</span>
                <strong>{gordurasDia.toFixed(1)} g</strong>
              </div>

              <div className="stat-box">
                <span>Saldo</span>
                <strong className={saldo >= 0 ? "ok" : "danger"}>
                  {saldo.toFixed(0)} kcal
                </strong>
              </div>

              <div className="stat-box">
                <span>Faltam</span>
                <strong>{faltamKg.toFixed(1)} kg</strong>
              </div>

              <div className="stat-box">
                <span>Estimativa</span>
                <strong>{previsaoSemanas} sem</strong>
              </div>
            </div>

            <div className="progress-area">
              <div className="progress-label">
                <span>Progresso do dia</span>
                <span>{percentual.toFixed(0)}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentual}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid two">
          <div className="card">
            <h2>Adicionar alimento ao dia</h2>

            <div className="form-grid">
              <div>
                <label>Alimento salvo</label>
                <select
                  value={alimentoSelecionado}
                  onChange={(e) => selecionarAlimento(e.target.value)}
                >
                  <option value="">Selecione um alimento</option>
                  {todosAlimentos.map((item, i) => (
                    <option key={`${item.nome}-${i}`} value={item.nome}>
                      {item.nome} ({item.kcal100g} kcal/100g)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Refeição</label>
                <select
                  value={refeicao}
                  onChange={(e) => setRefeicao(e.target.value)}
                >
                  {refeicoes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="full">
                <label>Nome do alimento</label>
                <input
                  type="text"
                  value={nomeAlimento}
                  onChange={(e) => setNomeAlimento(e.target.value)}
                />
              </div>

              <div>
                <label>Quantidade em gramas</label>
                <input
                  type="number"
                  value={gramas}
                  onChange={(e) => setGramas(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Calorias por 100g</label>
                <input
                  type="number"
                  value={kcal100g}
                  onChange={(e) => setKcal100g(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Proteína por 100g</label>
                <input
                  type="number"
                  value={proteina100g}
                  onChange={(e) => setProteina100g(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Carbo por 100g</label>
                <input
                  type="number"
                  value={carbo100g}
                  onChange={(e) => setCarbo100g(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Gordura por 100g</label>
                <input
                  type="number"
                  value={gordura100g}
                  onChange={(e) => setGordura100g(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="preview-box">
              <p>
                <strong>Calorias:</strong> {((Number(gramas) * Number(kcal100g)) / 100).toFixed(1)} kcal
              </p>
              <p>
                <strong>Proteína:</strong> {((Number(gramas) * Number(proteina100g)) / 100).toFixed(1)} g
              </p>
              <p>
                <strong>Carboidrato:</strong> {((Number(gramas) * Number(carbo100g)) / 100).toFixed(1)} g
              </p>
              <p>
                <strong>Gordura:</strong> {((Number(gramas) * Number(gordura100g)) / 100).toFixed(1)} g
              </p>
            </div>

            <button className="primary-btn" onClick={adicionarItem}>
              Adicionar ao dia
            </button>
          </div>

          <div className="card">
            <h2>Cadastrar alimento personalizado</h2>

            <div className="form-grid">
              <div className="full">
                <label>Nome</label>
                <input
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                />
              </div>

              <div>
                <label>Kcal por 100g</label>
                <input
                  type="number"
                  value={novoKcal}
                  onChange={(e) => setNovoKcal(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Proteína por 100g</label>
                <input
                  type="number"
                  value={novoProt}
                  onChange={(e) => setNovoProt(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Carbo por 100g</label>
                <input
                  type="number"
                  value={novoCarb}
                  onChange={(e) => setNovoCarb(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Gordura por 100g</label>
                <input
                  type="number"
                  value={novoGord}
                  onChange={(e) => setNovoGord(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Refeição padrão</label>
                <select
                  value={novaRefeicao}
                  onChange={(e) => setNovaRefeicao(e.target.value)}
                >
                  {refeicoes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="primary-btn" onClick={salvarAlimentoPersonalizado}>
              Salvar alimento personalizado
            </button>

            <div className="history-list">
              {alimentosPersonalizados.length === 0 ? (
                <div className="empty-box">Nenhum alimento personalizado salvo ainda.</div>
              ) : (
                alimentosPersonalizados.map((item) => (
                  <div key={item.id} className="saved-food-item">
                    <div>
                      <strong>{item.nome}</strong>
                      <small>
                        {item.kcal100g} kcal | P {item.proteina100g} | C {item.carbo100g} | G {item.gordura100g}
                      </small>
                    </div>
                    <button
                      className="danger-btn"
                      onClick={() => removerAlimentoPersonalizado(item.id)}
                    >
                      Excluir
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="grid two">
          <div className="card">
            <div className="title-row">
              <h2>Alimentos do dia</h2>
              <button className="secondary-btn" onClick={limparDia}>
                Limpar dia
              </button>
            </div>

            {itensDoDia.length === 0 ? (
              <div className="empty-box">
                Nenhum alimento adicionado em {formatarData(dataSelecionada)}.
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Refeição</th>
                      <th>Alimento</th>
                      <th>Qtd</th>
                      <th>Kcal</th>
                      <th>P</th>
                      <th>C</th>
                      <th>G</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itensDoDia.map((item) => (
                      <tr key={item.id}>
                        <td>{item.refeicao}</td>
                        <td>{item.nome}</td>
                        <td>{item.gramas} g</td>
                        <td>{item.calorias.toFixed(0)}</td>
                        <td>{(item.proteina || 0).toFixed(1)}</td>
                        <td>{(item.carbo || 0).toFixed(1)}</td>
                        <td>{(item.gordura || 0).toFixed(1)}</td>
                        <td>
                          <button
                            className="danger-btn"
                            onClick={() => removerItem(item.id)}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="card">
            <h2>Total por refeição</h2>

            <div className="meal-list">
              {refeicoes.map((item) => (
                <div key={item} className="meal-item">
                  <span>{item}</span>
                  <strong>{(totaisPorRefeicao[item] || 0).toFixed(0)} kcal</strong>
                </div>
              ))}
            </div>

            <h2 className="mt">Gráfico de calorias por dia</h2>
            <div className="chart-box">
              {dadosGraficoCalorias.length === 0 ? (
                <div className="empty-box">Ainda não há dados para o gráfico.</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosGraficoCalorias}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calorias" strokeWidth={2} />
                    <Line type="monotone" dataKey="meta" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Gráfico de peso</h2>
          <div className="chart-box">
            {dadosGraficoPeso.length === 0 ? (
              <div className="empty-box">Salve seu peso em alguns dias para ver o gráfico.</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosGraficoPeso}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="peso" strokeWidth={2} />
                  <Line type="monotone" dataKey="meta" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}