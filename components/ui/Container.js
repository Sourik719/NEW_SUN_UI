const Container = ({ children, className = "" }) => {
    return (<div className={`px-48 py-20 ${className}`}>
        {children}
    </div>)
}

export default Container