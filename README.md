<div align="center">

# Locadora de Filmes 🍿

### Uma aplicação de locação de filmes

## Projeto online

<a href="https://locadora-filmes.vercel.app">Disponível aqui. <a/>

## Como rodar o projeto

```bash
npm run install
```

```bash
npm run dev
```

## Como configurar o env do projeto

<h3>Primeiramente deve ser criado o arquivo env na raiz do projeto, após fazer isso, é preciso colocar as seguintes chaves:</h3>

```bash
VITE_API_KEY="SUA_CHAVE"
```

```bash
VITE_API_BASE_URL="URL_API"
```

<h3>É preciso gerar uma key no <a href="https://www.omdbapi.com/apikey.aspx">OMDb API<a/>. Após gerar a key, coloque ela no env:</h3>

```bash
VITE_API_KEY="SUA_CHAVE"
```

## Como rodar os testes unitários

```bash
npm run test:unit
```

## Como rodar o container Docker

```bash
docker build -t locadora-filmes/vuejs-app .
```

```bash
docker run -it -p 8080:80 --rm --name locadora-filmes locadora-filmes/vuejs-app
```

## Features

<div align="left">

- Utilização do Tailwind na estilização de todo o projeto
- Implementação de um sistema de autenticação (login/logout)
- Implementação de rota privada
- Utilização do vitest para a implementação dos testes unitários da aplicação
- Utilização do Pinia para o gerenciamento de estado
- Utilização do VeeValidate + yup na validação de formulário
- Utilização do padrão do Atomic Design
- Utilização do Docker
- Implementação de componentização e responsividade nas versões web e mobile
- Utilização de Typescript
- Implementação de todo fluxo de usuários, clientes e locação
- Implementação de listagem e filtro/pesquisas de filmes

</div>
