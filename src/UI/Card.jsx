const Card = ({ children, className }) => {
    return (
        <div className={`rounded-[20px] bg-[#171718CC] overflow-hidden p-10 ${className}`}>
            {children}
        </div>
    )
}
export default Card