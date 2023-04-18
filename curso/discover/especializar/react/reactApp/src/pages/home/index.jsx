import { useEffect, useState } from 'react'

import './style.css'

import Card from '../../components/Card'

export default () => {
  const [users, setUsers] = useState([])
  const [admin, setAdmin] = useState({ name: '', avatar: '' })

  const handleAddUser = (e) => {
    e.preventDefault()
    const form = e.target
    const user = {
      name: form.name.value,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
      })
    }
    
    setUsers([...users, user])
    form.reset()
  }

  useEffect(() => {
    fetch('https://api.github.com/users/lkt226')
    .then(response => response.json())
    .then(data => {
      setAdmin({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [])

  return (
    <main id='home-page'>
      <div className="container">
        <header>
          <h1>Lista de presença</h1>
          <div className='admin'>
            <strong>{ admin.name }</strong>
            <img src={ admin.avatar } alt="Foto de perfil" />
          </div>
        </header>

        <form onSubmit={e=>handleAddUser(e)}>
          <input name='name' type="text" placeholder='Digite um texto...'/>
          <button type='submit'> Enviar </button>
        </form>

        <div className="cards">
          {
            users.map(({name, time}, index) => (
              <Card name={name} time={time} key={`${name}_${time}_${index}`} />
            ))
          }
        </div>
      </div>
    </main>
  )
}
