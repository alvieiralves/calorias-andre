export default function ResumoCard({
  tmb,
  gastoCaloricoDia,
  metaDoDia,
  caloriasConsumidas,
  proteinasDia,
  carbosDia,
  gordurasDia,
  saldo,
  faltamKg,
  previsaoSemanas,
  percentual,
}) {
  return (
    <div className="card">
      <h2>Resumo automático</h2>

      <div className="stats-grid">
        <div className="stat-box"><span>TMB</span><strong>{tmb.toFixed(0)} kcal</strong></div>
        <div className="stat-box"><span>Gasto diário</span><strong>{gastoCaloricoDia.toFixed(0)} kcal</strong></div>
        <div className="stat-box"><span>Meta do dia</span><strong>{metaDoDia.toFixed(0)} kcal</strong></div>
        <div className="stat-box"><span>Consumidas</span><strong>{caloriasConsumidas.toFixed(0)} kcal</strong></div>
        <div className="stat-box"><span>Proteína</span><strong>{proteinasDia.toFixed(1)} g</strong></div>
        <div className="stat-box"><span>Carboidrato</span><strong>{carbosDia.toFixed(1)} g</strong></div>
        <div className="stat-box"><span>Gordura</span><strong>{gordurasDia.toFixed(1)} g</strong></div>
        <div className="stat-box"><span>Saldo</span><strong className={saldo >= 0 ? "ok" : "danger"}>{saldo.toFixed(0)} kcal</strong></div>
        <div className="stat-box"><span>Faltam</span><strong>{faltamKg.toFixed(1)} kg</strong></div>
        <div className="stat-box"><span>Estimativa</span><strong>{previsaoSemanas} sem</strong></div>
      </div>

      <div className="progress-area">
        <div className="progress-label">
          <span>Progresso do dia</span>
          <span>{percentual.toFixed(0)}%</span>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentual}%` }} />
        </div>
      </div>
    </div>
  )
}
