
function Prayer({name,time}) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background:" rgba(0, 0, 0, 0.548)",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "10px"
            
        }}>

            <p className="name">{name} :</p>
            <p className="time">{ time}</p>
        </div>
    )
}

export default Prayer
