import './styles/Notification.css'

const Notification = ({ message, type }) => (
  <div>{message && <p className={type}>{message}</p>}</div>
)

export default Notification
