import { formatarData } from "../utils/nutrition"

export default function DayItemsTable({ itensDoDia, dataSelecionada, limparDia, removerItem }) {
  return (
    <div className="card">
      <div className="title-row">
        <h2>Alimentos do dia</h2>
        <button className="secondary-btn" onClick={limparDia}>Limpar dia</button>
      </div>

      {itensDoDia.length === 0 ? (
        <div className="empty-box">Nenhum alimento adicionado em {formatarData(dataSelecionada)}.</div>
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
                    <button className="danger-btn" onClick={() => removerItem(item.id)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
