import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getTickets, reset } from '../features/tickets/ticketSlice'
import TicketItem from "../components/TicketItem"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

const Tickets = () => {
    const { user } = useSelector((state) => state.auth)
    const { tickets, isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    )
}

export default Tickets