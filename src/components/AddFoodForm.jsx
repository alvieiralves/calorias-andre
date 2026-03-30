import { calcularMacros } from "../utils/nutrition"

export default function AddFoodForm({
  todosAlimentos,
  alimentoSelecionado,
  selecionarAlimento,
  refeicao,
  setRefeicao,
  refeicoes,
  nomeAlimento,
  setNomeAlimento,
  gramas,
  setGramas,
  kcal100g,
  setKcal100g,
  proteina100g,
  setProteina100g,
  carbo100g,
  setCarbo100g,
  gordura100g,
  setGordura100g,
  adicionarItem,
}) {
  const preview = calcularMacros({ gramas, kcal100g, proteina100g, carbo100g, gordura100g })

  return (
    <div className="card">
      <h2>Adicionar alimento ao dia</h2>

      <div className="form-grid">
        <div>
          <label htmlFor="alimentoSalvo">Alimento salvo</label>
          <select id="alimentoSalvo" value={alimentoSelecionado} onChange={(e) => selecionarAlimento(e.target.value)}>
            <option value="">Selecione um alimento</option>
            {todosAlimentos.map((item, i) => (
              <option key={`${item.nome}-${i}`} value={item.nome}>
                {item.nome} ({item.kcal100g} kcal/100g)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="refeicao">Refeição</label>
          <select id="refeicao" value={refeicao} onChange={(e) => setRefeicao(e.target.value)}>
            {refeicoes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="full">
          <label htmlFor="nomeAlimento">Nome do alimento</label>
          <input id="nomeAlimento" type="text" value={nomeAlimento} onChange={(e) => setNomeAlimento(e.target.value)} />
        </div>

        <div>
          <label htmlFor="gramas">Quantidade em gramas</label>
          <input id="gramas" type="number" min="1" value={gramas} onChange={(e) => setGramas(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="kcal100g">Calorias por 100g</label>
          <input id="kcal100g" type="number" min="0" value={kcal100g} onChange={(e) => setKcal100g(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="proteina100g">Proteína por 100g</label>
          <input id="proteina100g" type="number" min="0" value={proteina100g} onChange={(e) => setProteina100g(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="carbo100g">Carbo por 100g</label>
          <input id="carbo100g" type="number" min="0" value={carbo100g} onChange={(e) => setCarbo100g(Number(e.target.value))} />
        </div>

        <div>
          <label htmlFor="gordura100g">Gordura por 100g</label>
          <input id="gordura100g" type="number" min="0" value={gordura100g} onChange={(e) => setGordura100g(Number(e.target.value))} />
        </div>
      </div>

      <div className="preview-box">
        <p><strong>Calorias:</strong> {preview.calorias.toFixed(1)} kcal</p>
        <p><strong>Proteína:</strong> {preview.proteina.toFixed(1)} g</p>
        <p><strong>Carboidrato:</strong> {preview.carbo.toFixed(1)} g</p>
        <p><strong>Gordura:</strong> {preview.gordura.toFixed(1)} g</p>
      </div>

      <button className="primary-btn" onClick={adicionarItem}>Adicionar ao dia</button>
    </div>
  )
}
