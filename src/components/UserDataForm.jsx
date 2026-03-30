export default function UserDataForm({
  pesoAtual,
  setPesoAtual,
  metaPeso,
  setMetaPeso,
  altura,
  setAltura,
  idade,
  setIdade,
  sexo,
  setSexo,
  atividade,
  setAtividade,
  alvoDeficit,
  setAlvoDeficit,
  dataSelecionada,
  setDataSelecionada,
  salvarPesoDoDia,
}) {
  return (
    <div className="card">
      <h2>Seus dados</h2>

      <div className="form-grid">
        <div>
          <label htmlFor="pesoAtual">Peso atual (kg)</label>
          <input id="pesoAtual" type="number" min="0" value={pesoAtual} onChange={(e) => setPesoAtual(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="metaPeso">Meta de peso (kg)</label>
          <input id="metaPeso" type="number" min="0" value={metaPeso} onChange={(e) => setMetaPeso(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="altura">Altura (cm)</label>
          <input id="altura" type="number" min="0" value={altura} onChange={(e) => setAltura(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="idade">Idade</label>
          <input id="idade" type="number" min="0" value={idade} onChange={(e) => setIdade(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="sexo">Sexo</label>
          <select id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="" disabled>
              Selecione
            </option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>

        <div>
          <label htmlFor="atividade">Nível de atividade</label>
          <select id="atividade" value={atividade} onChange={(e) => setAtividade(Number(e.target.value))}>
            <option value={1.2}>Sedentário</option>
            <option value={1.375}>Levemente ativo</option>
            <option value={1.55}>Moderadamente ativo</option>
            <option value={1.725}>Muito ativo</option>
            <option value={1.9}>Extremamente ativo</option>
          </select>
        </div>

        <div>
          <label htmlFor="alvoDeficit">Déficit desejado (kcal)</label>
          <input id="alvoDeficit" type="number" min="0" max="1200" value={alvoDeficit} onChange={(e) => setAlvoDeficit(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="dataSelecionada">Data</label>
          <input id="dataSelecionada" type="date" value={dataSelecionada} onChange={(e) => setDataSelecionada(e.target.value)} />
        </div>
      </div>

      <div className="actions-row">
        <button className="primary-btn" onClick={salvarPesoDoDia}>
          Salvar peso do dia
        </button>
      </div>
    </div>
  )
}
