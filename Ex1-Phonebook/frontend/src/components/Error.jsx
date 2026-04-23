const Error = ({ errorMesseage }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (errorMesseage === null){
        return null
    }
    return (
        <div style={errorStyle}>
            {errorMesseage}
        </div>
    )
}

export default Error