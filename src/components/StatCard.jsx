function StatCard({label,value,sub}){
  return (
    <div className="stat-card">
      <p>{label}</p>
      <h3>{value}</h3>
      {sub&&<span>{sub}</span>}
    </div>
  )
}
export default StatCard
