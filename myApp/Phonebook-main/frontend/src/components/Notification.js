const Notification = ({ message, style}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="alert" style={style}>
        {message}
      </div>
    )
  }

  export default Notification