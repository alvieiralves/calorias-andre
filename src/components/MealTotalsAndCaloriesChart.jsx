import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function MealTotalsAndCaloriesChart({ refeicoes, totaisPorRefeicao, dadosGraficoCalorias }) {
  return (
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
  )
}
