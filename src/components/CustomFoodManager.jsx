export default function CustomFoodManager({
  novoNome,
  setNovoNome,
  novoKcal,
  setNovoKcal,
  novoProt,
  setNovoProt,
  novoCarb,
  setNovoCarb,
  novoGord,
  setNovoGord,
  novaRefeicao,
  setNovaRefeicao,
  refeicoes,
  salvarAlimentoPersonalizado,
  alimentosPersonalizados,
  removerAlimentoPersonalizado,
}) {
  return (
    <div className="card">
      <h2>Cadastrar alimento personalizado</h2>

      <div className="form-grid">
        <div className="full">
          <label htmlFor="novoNome">Nome</label>
          <input id="novoNome" type="text" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
        </div>

        <div>
          <label htmlFor="novoKcal">Kcal por 100g</label>
          <input id="novoKcal" type="number" min="0" value={novoKcal} onChange={(e) => setNovoKcal(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="novoProt">Proteína por 100g</label>
          <input id="novoProt" type="number" min="0" value={novoProt} onChange={(e) => setNovoProt(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="novoCarb">Carbo por 100g</label>
          <input id="novoCarb" type="number" min="0" value={novoCarb} onChange={(e) => setNovoCarb(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="novoGord">Gordura por 100g</label>
          <input id="novoGord" type="number" min="0" value={novoGord} onChange={(e) => setNovoGord(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="novaRefeicao">Refeição padrão</label>
          <select id="novaRefeicao" value={novaRefeicao} onChange={(e) => setNovaRefeicao(e.target.value)}>
            {refeicoes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="primary-btn" onClick={salvarAlimentoPersonalizado}>Salvar alimento personalizado</button>

      <div className="history-list">
        {alimentosPersonalizados.length === 0 ? (
          <div className="empty-box">Nenhum alimento personalizado salvo ainda.</div>
        ) : (
          alimentosPersonalizados.map((item) => (
            <div key={item.id} className="saved-food-item">
              <div>
                <strong>{item.nome}</strong>
                <small>{item.kcal100g} kcal | P {item.proteina100g} | C {item.carbo100g} | G {item.gordura100g}</small>
              </div>
              <button className="danger-btn" onClick={() => removerAlimentoPersonalizado(item.id)}>Excluir</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
