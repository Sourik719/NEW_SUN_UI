const Container = ({ children, className = "" }) => {
    return (<div className={`pt-20 ${className}`}>
        {children}
    </div>)
}

export default Container