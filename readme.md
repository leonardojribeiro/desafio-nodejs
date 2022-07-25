# Desafio Node.js

## O que foi desenvolvido

- [x] Cadastro de usuários;
- [x] Listagem de usuários;
- [x] Consulta de usuários por nome ou email, permitindo paginação;
- [x] Listagem de usuário por id;
- [X] Alteração de usuário;
- [x] Deleção de usuário; 
- [x] Suporte ao MongoDB
- [x] Documentação da API com Swagger


## Como executar?

1. Clone este repositório;
```ps
git clone https://github.com/leonardojribeiro/desafio-nodejs
```
2. Navegue até a pasta onde o repositório foi clonado;
3. Execute o comando ```npm install``` no seu terminal para instalar as dependências;
4. Crie um arquivo .env seguindo o exemplo do arquivo .envExample neste repositório;
5. O projeto estará pronto para a execução.

### Executar em modo de desenvolvimento
Execute o comando ```npm run dev``` no seu terminal.
Você poderá acessar os seguintes endpoints:
- [localhost:3000/](http:localhost:3000/) - documentação;
- [localhost:3000/users](http:localhost:3000/users) - usuários; 

### Transpilar para produção
Execute o comando ```npm run build``` no seu terminal.

### Executar em modo de produção
Execute o comando ```npm run start``` no seu terminal.

### Executar com docker-compose

1. Transpile o código fonte para produção através do comando ```npm run build``` no seu terminal.
2. Execute o comando ```docker compose up``` no seu terminal.

## Como acessar? 

Acesse a versão de produção [GCP](https://desafionode-dot-global-leo.rj.r.appspot.com/) [AWS](http://ec2-18-231-8-203.sa-east-1.compute.amazonaws.com/).
