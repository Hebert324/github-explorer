import React from 'react';
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Title, Form, Repositories } from './styles'

const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImg} alt="Github Explorer logo" />
            <Title>Explore repositórios no Github</Title>

           <Form>
               <input placeholder="Digite o nome do repositório" />
               <button type="submit">Pesquisar</button>
           </Form>

           <Repositories>
               <a href="teste">
                    <img src="https://github.com/hebert324.png" alt="Hebert Rocha" />
                    <div>
                        <strong>Hebert324/portfolio</strong>
                        <p>Portifólio do Hebert Rocha</p>
                    </div>

                    <FiChevronRight size={20} />
               </a>
               
           </Repositories>
        </>
    )
}

export default Dashboard
