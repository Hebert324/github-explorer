import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import { Header, RepositoryInfo, Issues } from './styles'
import logoImg from '../../assets/logo.svg'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>()

    return (
    <>
        <Header>
            <img src={logoImg} alt="Github Explorer" />

            <Link to="/">
            <FiChevronLeft size={16} />
            Voltar
            </Link>
        </Header>

        <RepositoryInfo>
            <header>
                <img src="https://avatars.githubusercontent.com/u/70274409?v=4" alt="Hebert Rocha" />
                <div>
                    <strong>Hebert324/portifolio</strong>
                    <p>descrição do repositório</p>
                </div>
            </header>

            <ul>
                <li>
                    <strong>1808</strong>
                    <span>Starts</span>
                </li>
                <li>
                    <strong>48</strong>
                    <span>Forks</span>
                </li>
                <li>
                    <strong>67</strong>
                    <span>Issues abertas</span>
                </li>
            </ul>
        </RepositoryInfo>

        <Issues>
        <Link to='adada'>

            <div>
                <strong>aaaa</strong>
                <p>aaa</p>
            </div>

            <FiChevronRight size={20} />
        </Link>
        </Issues>
    </>
    )
}

export default Repository
