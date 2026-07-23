function PageTitle({tag,title,text,action}){
  return (
    <div className="page-title">
      <div>
        {tag&&<span className="page-tag">{tag}</span>}
        <h1>{title}</h1>
        {text&&<p>{text}</p>}
      </div>
      {action}
    </div>
  )
}
export default PageTitle
