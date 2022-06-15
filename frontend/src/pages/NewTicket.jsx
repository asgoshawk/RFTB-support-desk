import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

const NewTicket = () => {
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('Galaxy Buds')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    }, [dispatch, navigate, isError, isSuccess, message])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({ product, description }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={'/'} />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        disabled
                    />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value="Galaxy S22">Galaxy S22</option>
                            <option value="Galaxy Tab S8">Galaxy Tab S8</option>
                            <option value="Galaxy A53">Galaxy A53</option>
                            <option value="Galaxy Z Flip3">Galaxy Z Flip3</option>
                            <option value="Galaxy S21">Galaxy S21</option>
                            <option value="Galaxy Watch">Galaxy Watch</option>
                            <option value="Galaxy Buds">Galaxy Buds</option>
                            <option value="Others">Others (Please mentioned in description)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea
                            name="description"
                            className="form-control"
                            id="description"
                            value={description}
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket