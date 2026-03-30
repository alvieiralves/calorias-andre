import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function WeightChart({ dadosGraficoPeso }) {
  return (
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
  )
}
