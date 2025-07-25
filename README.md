ACME Corp - Cadastro e Gerenciamento de Clientes
Este projeto é uma pequena aplicação web para cadastro e gerenciamento de clientes para a empresa fictícia "ACME Corp". Ele permite o registro de novos clientes, armazena os dados localmente no navegador e exibe uma lista completa dos clientes cadastrados em uma tabela.

Tecnologias Utilizadas
HTML5: Estrutura da página.

CSS3: Estilização da aplicação.

Bootstrap 5: Framework para layout responsivo e componentes de UI.

JavaScript Puro: Lógica de manipulação de dados e DOM.

jQuery: Para validações de formulário e manipulação do DOM.

JSON: Formato para estruturar e armazenar os dados no localStorage.

Requisitos Funcionais
Formulário de Cadastro de Cliente:

Nome completo (obrigatório)

Email (obrigatório e formato válido)

CPF (obrigatório, apenas números, 11 dígitos, com máscara de formatação)

Data de nascimento (obrigatório)

Gênero (masculino, feminino, outro)

Validação de Formulário (com jQuery):

Campos obrigatórios não podem estar vazios.

Email precisa ter formato válido.

CPF deve ter exatamente 11 números e ser único.

Armazenamento dos Dados:

Os dados dos clientes são armazenados no localStorage do navegador em formato JSON.

Os dados persistem ao atualizar ou recarregar a página.

Tabela de Listagem de Clientes:

Após o envio válido do formulário, os dados aparecem em uma tabela abaixo do formulário.

A tabela exibe: Nome, Email, CPF (com máscara), Data de nascimento e Gênero.

Há um botão para remover um cliente da tabela e do localStorage.

Requisitos Visuais
Uso de Bootstrap 5 para uma aparência limpa e responsiva.

Feedback visual de sucesso ou erro ao validar o formulário.

Uso de modal para confirmar a exclusão de clientes.

Como Rodar o Projeto
Clone ou baixe este repositório para o seu computador.

Certifique-se de que os arquivos index.html, style.css e script.js estejam na mesma pasta.

Abra o arquivo index.html em seu navegador de internet (Chrome, Firefox, Edge, etc.).

A aplicação será carregada diretamente no seu navegador, e você poderá começar a cadastrar e gerenciar clientes.

Desenvolvido para o caso de Front-End - Cadastro e Listagem de Clientes da EBAC Tutoria
