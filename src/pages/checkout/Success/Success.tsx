import css from "./Success.module.css"

export default function Success() {

    localStorage.removeItem("cart");
    
    return (
        <div className="text-center">
            <h2 className="mb-3 display-5">Thank you for purchasing from Retrowares!</h2>
            <div className="mb-5 mw-100">
                <img src="/images/thanks.png" className={css.SuccessImage}/>
            </div>
            <p>Your order is scheduled for delivery in 3-5 business days.
                Order status can be viewed any time by using the order code through our tracking services.</p>
        </div>
    )
}