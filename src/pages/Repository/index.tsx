import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import { Header, RepositoryInfo, Commits } from './styles'
import logoImg from '../../assets/logo.svg'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

interface RepositoryParams {
    repository: string;
}

interface RepositoryInterface {
    full_name: string
    description: string
    stargazers_count: number
    forks_count: number
    open_issues_count: number
    owner: {
        login: string
        avatar_url: string
    }
}

interface Commit {
    html_url: string
    node_id: number
    commit: {
        message: string
    }
    author: {
        login: string
    }
}

const Repository: React.FC = () => {
    const [repository, setRepository] = useState<RepositoryInterface | null>(null)
    const [commits, setCommits] = useState<Commit[]>([])

    const { params } = useRouteMatch<RepositoryParams>()

    useEffect(() => {
        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data)
        })

        api.get(`repos/${params.repository}/commits`).then(response => {
            setCommits(response.data)
        })
    }, [params.repository])

    return (
    <>
        <Header>
            <img src={logoImg} alt="Github Explorer" />

            <Link to="/">
            <FiChevronLeft size={16} />
            Voltar
            </Link>
        </Header>

        {repository && (
        <RepositoryInfo>
            <header>
                <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                </div>
            </header>

            <ul>
                <li>
                    <strong>{repository.stargazers_count}</strong>
                    <span>Starts</span>
                </li>
                <li>
                    <strong>{repository.forks_count}</strong>
                    <span>Forks</span>
                </li>
                <li>
                    <strong>{repository.open_issues_count}</strong>
                    <span>Issues abertas</span>
                </li>
            </ul>
        </RepositoryInfo>
        )}

        <Commits>
            <header>Commits:</header>
            {commits.map(commit => (
                <a target='_blank' rel='noreferrer' key={commit.node_id} href={commit.html_url}>

                <div>
                    <strong>{commit.author.login}</strong>
                    <p>{commit.commit.message}</p>
                </div>

                <FiChevronRight size={20} />
            </a>
            ))}
        </Commits>
    </>
    )
}

export default Repository
