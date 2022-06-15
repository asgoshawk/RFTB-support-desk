import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

const Tickets = () => {
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

    // const [name] = useState(user.name)
    // const [email] = useState(user.email)
    // const [product, setProduct] = useState('Galaxy Buds')
    // const [description, setDescription] = useState('')

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
        <div>
            <h1>Tickets</h1>
        </div>
    )
}

export default Tickets