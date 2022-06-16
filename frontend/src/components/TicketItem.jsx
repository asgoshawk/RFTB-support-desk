import { Link } from "react-router-dom"

const TicketItem = ({ ticket }) => {
    return (
        <div className="ticket">
            <div className="">{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
            <div className="">{ticket.product}</div>
            <div className={`status status-${ticket.status}`}>
                {ticket.status}
            </div>
            <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
                View
            </Link>
        </div>
    )
}

export default TicketItem