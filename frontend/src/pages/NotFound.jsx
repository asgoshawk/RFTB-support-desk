import { Link, } from "react-router-dom"
import { FaTimesCircle, FaHome } from "react-icons/fa"

const NotFound = () => {
    return (
        <>
            <section className="heading">
                <h1> <FaTimesCircle /> OOPS!</h1>
                <p>Page not found.</p>
            </section>

            <Link to='/' className="btn btn-block">
                <FaHome /> Back to Homepage
            </Link>
        </>
    )
}

export default NotFound