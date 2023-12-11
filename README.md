# Skap API

Esta é a API para o site Skap, uma plataforma de anúncios de veículos. A API é responsável por lidar com todas as rotas relacionadas a usuários e veículos, possibilitando a comunicação eficiente entre o frontend e o banco de dados.

## Frontend

O frontend pode ser encontrado [aqui](https://github.com/Lucas-Benfica/skap-front).

## Acesso Online

A API está disponível online e pode ser acessada através do deploy. [Link para o deploy](https://skap-api.onrender.com).

## Executando Localmente

Se você deseja executar a API localmente, siga as instruções abaixo:

1. Clone ou baixe este repositório.
2. Navegue até a pasta do projeto e execute o comando `npm install` para instalar todas as dependências.
3. Crie um arquivo `.env` com as informações de acesso ao seu banco de dados. Você pode encontrar um exemplo em `.env.example`.
4. Certifique-se de que seu banco de dados local está criado. Utilize os comandos presentes em `db.txt` para criar as tabelas necessárias.
5. Após realizar essas etapas, utilize o comando `npm run dev` para iniciar a API localmente.