import React, {useState, useEffect} from 'react';
import api from '../../services/api'
import {Link, useHistory} from 'react-router-dom'
import {FaRegEdit, FaRegTrashAlt} from 'react-icons/fa'
import './style.css'
export interface User {
  id?: number,
  nome: string
  email: string
  cpf: string
  estadoCivil: string
  nomeConjugue: string
}

const Home: React.FC = () => {
const [user, setUser] = useState<User[]>([])
const [nome, setNome] = useState("")
const [cpf, setCpf] = useState("")
const [filteredUser, setFilteredUser] = useState<User[]>([])
const [isDeleted, setIsDeleted] = useState(0)

  // const [text, setText] = useState('') 
  // const inputRef = useRef<HTMLInputElement>(null)
  // const handleSubmit = (e: any) => {
  //   e.preventDefault()
  //   console.log(inputRef.current?.value)
  // }
  const history = useHistory()
  useEffect(() => {
    api.get('leads').then(res => {
      setUser(res.data)
      setFilteredUser(res.data)
    })
  }, [isDeleted])
  const handleFilter= () => {
    const usersFiltered = user.filter((u) => {
      return u.nome.toLowerCase().includes(nome.toLowerCase()) && u.cpf.includes(cpf)
    })
    setFilteredUser(usersFiltered)
  }
  const handleDelete = async (id: number | undefined) => {
    if(id) {
      await api.delete(`/leads/${id}`)
      setIsDeleted(Math.round(Math.random() * 100))
    }
  }
  const handleEdit = async (id: number | undefined) => {
    if(id) {
      history.push(`/form/${id}`)
    }
  } 
  return (
    <>
    <div className="container">
      <h1>Consulta de Leads</h1>
      <div className="filter">
        <span>Filtros</span>
        <div className="form">
        <div className="input">
          <label htmlFor="nome">Nome:</label>
          <input id="nome" value= {nome} onChange= {e => setNome(e.target.value)}   type="text"/>
        </div>

        <div className="input">
          <label htmlFor="cpf">CPF:</label>
          <input id="cpf" value = {cpf} onChange= {e => setCpf(e.target.value)} type="text"/>
        </div>
        </div>
        <button className="btn" onClick= {handleFilter}>
          filtrar
        </button>
      </div>
    <Link className="btn" to="/form">Novo Lead</Link>
    <table>
      <thead>
      <tr>
        <th></th>
        <th></th>
        <th> Email</th>
        <th> Nome </th> 
        <th> CPF</th>
      </tr>
      </thead>
      <tbody>
      {filteredUser.map (user => (
        <tr key= {user.id}>
          <td>
            <FaRegEdit color="#020202" onClick={() => handleEdit(user.id)} />
          </td>
          <td>
            <FaRegTrashAlt color="#020202" onClick={() => handleDelete(user.id)}/>
          </td>
          <td>{user.email}</td>
          <td>{user.nome }</td>
          <td>{user.cpf }</td>
        </tr>
      ) 
      )}
      </tbody>
    </table>
    </div>
    {/* // <form onSubmit={handleSubmit}> */}
    {/* //   <input ref={inputRef}  /> */}
    {/* //   <input type="submit" value="Botao"/> */}
    {/* // </form> */}
    </>
  );
}

export default Home;
