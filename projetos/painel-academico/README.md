# Painel Acadêmico — Controle de Estudos e Projetos

## Objetivo

Criar um protótipo funcional local para organização acadêmica. A página permite cadastrar disciplinas, tarefas e projetos diretamente no navegador, com dados salvos localmente por meio do `localStorage`.

O projeto faz parte do Portfólio Acadêmico e Profissional de Kauan Souza de Aquino, estudante de Engenharia de Software no UniCEUB.

## Funcionalidades

- Cadastro de disciplinas com nome, foco atual e status.
- Cadastro de tarefas com nome, prazo e status.
- Cadastro de projetos com nome, descrição, foco ou tecnologia e status.
- Listagem dos registros cadastrados.
- Alteração de status entre Pendente, Em andamento e Concluído.
- Exclusão de disciplinas, tarefas e projetos.
- Resumo automático com totais do painel.
- Botão para carregar dados de exemplo.
- Botão para limpar o painel.
- Mensagem de estado vazio quando não houver registros.
- Persistência local dos dados no navegador.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript

Não há login, backend, banco de dados externo, frameworks ou bibliotecas externas.

## Como funciona o armazenamento

Os dados são salvos no navegador do usuário usando `localStorage`. Isso significa que os registros continuam disponíveis ao recarregar a página no mesmo navegador, mas não são enviados para servidor e não ficam disponíveis em outros dispositivos.

## Status do projeto

Em andamento.

