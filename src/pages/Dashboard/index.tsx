import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import { Title, Form, Repositories, Error } from './styles'

interface Repository {
    full_name: string
    description: string
    owner: {
        login: string
        avatar_url: string
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('')
    const [inputError, setInputError] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories')

        if(storagedRepositories) {
            return JSON.parse(storagedRepositories)
        } else {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer:repositories',
            JSON.stringify(repositories),
        )
    }, [repositories])

    async function handleAddRepository(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        if(!newRepo) {
            setInputError('Digite o autor/nome do repositório')
            return
        }

        try{
            // Consumir API do Github
            const response = await api.get<Repository>(`repos/${newRepo}`)

            const repository = response.data

            // Salvar o novo repositório no estado
            setRepositories([...repositories, repository])
            setNewRepo('')
            setInputError('')
        }   catch(err) {
            setInputError('Erro na busca por um repositório')
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer logo" />
            <Title>Explore repositórios no Github</Title>

           <Form hasError={!!inputError} onSubmit={handleAddRepository}>
               <input
               value={newRepo}
               onChange={(e) => setNewRepo(e.target.value)}
               placeholder="Digite o seu usuário/nome do repositório"
               />
               <button type="submit">Pesquisar</button>
           </Form>

           { inputError && <Error>{inputError}</Error> }

           <Repositories>
               {repositories.map(repository => (
                   <Link
                   key={repository.full_name}
                   to={`/repositories/${repository.full_name}`}>

                   <img
                   src={repository.owner.avatar_url}
                   alt={repository.owner.login} />

                   <div>
                       <strong>{repository.full_name}</strong>
                       <p>{repository.description}</p>
                   </div>

                   <FiChevronRight size={20} />
              </Link>
               ))}
           </Repositories>
        </>
    )
}

export default Dashboard
