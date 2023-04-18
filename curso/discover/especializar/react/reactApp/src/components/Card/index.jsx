import './style.css'

export default ({name, time}) => {
    return (
        <div className='card'>
            <strong>{ name }</strong>
            <small>{ time }</small>
        </div>
    )
}