# Alymente: Teste de Desenvolvimento Back-end

## API de Gerenciamento de Pessoas

Este é um projeto de API desenvolvido para o Teste de Desenvolvimento Back-end da vaga de Desenvolvedor Full Stack Pleno na empresa Alymente.

## Como Executar o Projeto

1. Clonar o repositório:
   ```bash
   git clone https://github.com/hatus/alymente-teste-dev.git
2. Instalar as dependências:
	```bash
	npm install
3. Gerar o Prisma Client
	```bash
	npm run prisma:generate
4. Executar as migrations
	```bash
	npm run prisma:migrate:dev
4. Executar em modo desenvolvedor:
	```bash
	npm run start:dev
## Rotas

### Importar lista de Pessoas

- **Rota:** `POST /persons/import/`
- **Descrição:** Importa uma lista de pessoas a partir de um arquivo JSON.
- **Parâmetros:**
  - `file` (form-data): Arquivo contendo a lista de pessoas a ser importada.

### Inserir uma nova pessoa

- **Rota:** `POST /persons/`
- **Descrição:** Insere uma nova pessoa.
- **Parâmetros:**
  - `body` (JSON):
    - `nome` (string): Nome da pessoa.
    - `idade` (number): Idade da pessoa.
    - `cpf` (string): CPF da pessoa.
    - `rg` (string): RG da pessoa.
    - `data_nasc` (string): Data de nascimento da pessoa.
    - `sexo` (string): Sexo da pessoa.
    - `signo` (string): Signo da pessoa.
    - `mae` (string): Nome da mãe da pessoa.
    - `pai` (string): Nome do pai da pessoa.
    - `email` (string): Email da pessoa.
    - `senha` (string): Senha da pessoa.
    - `cep` (string): CEP do endereço da pessoa.
    - `endereco` (string): Endereço da pessoa.
    - `numero` (number): Número do endereço.
    - `bairro` (string): Bairro da pessoa.
    - `cidade` (string): Cidade da pessoa.
    - `estado` (string): Estado da pessoa.
    - `telefone_fixo` (string): Telefone fixo da pessoa.
    - `celular` (string): Celular da pessoa.
    - `altura` (string): Altura da pessoa.
    - `peso` (number): Peso da pessoa.
    - `tipo_sanguineo` (string): Tipo sanguíneo da pessoa.
    - `cor` (string): Cor da pele da pessoa.


### Visualizar uma pessoa

- **Rota:** `GET /persons/:userId`
- **Descrição:** Retorna os dados de uma pessoa específica.
- **Parâmetros:**
  - `userId` (number): ID da pessoa a ser recuperada.

### Remover uma pessoa

- **Rota:** `DELETE /persons/:userId`
- **Descrição:** Deleta uma pessoa específica.
- **Parâmetros:**
  - `userId` (number): ID da pessoa a ser deletada.

### Listar Todas as Pessoas

- **Rota:** `GET /persons/`
- **Descrição:** Retorna uma lista de todas as pessoas.

### Atualizar os dados de uma pessoa

- **Rota:** `PUT /persons/:userId`
- **Descrição:** Atualiza os dados de uma pessoa específica.
- **Parâmetros:**
  - `userId` (string): ID da pessoa a ser atualizada.
  - `body` (JSON):
    - `email` (string): Email da pessoa.
    - `senha` (string): Senha da pessoa.
    - `perfil` (object):
      - `nome` (string): Nome da pessoa.
      - `idade` (number): Idade da pessoa.
      - `cpf` (string): CPF da pessoa.
      - `rg` (string): RG da pessoa.
      - `data_nasc` (string): Data de nascimento da pessoa.
      - `sexo` (string): Sexo da pessoa.
      - `signo` (string): Signo da pessoa.
      - `mae` (string): Nome da mãe da pessoa.
      - `pai` (string): Nome do pai da pessoa.
      - `telefone_fixo` (string): Telefone fixo da pessoa.
      - `celular` (string): Celular da pessoa.
      - `cor` (string): Cor da pele da pessoa.
      - `tipo_sanguineo` (string): Tipo sanguíneo da pessoa.
      - `peso` (number): Peso da pessoa.
      - `altura` (number): Altura da pessoa.
      - `usuario_id` (number): ID do usuário.
      - `enderecos` (array): Lista de endereços.
        - `logradouro` (string): Logradouro do endereço.
        - `numero` (number): Número do endereço.
        - `cep` (string): CEP do endereço.
        - `bairro` (string): Bairro do endereço.
        - `cidade_id` (number): ID da cidade.
        - `perfil_id` (number): ID do perfil.
        - `cidade` (object):
          - `nome` (string): Nome da cidade.
          - `estado_id` (number): ID do estado.
          - `estado` (object):
            - `sigla` (string): Sigla do estado.


