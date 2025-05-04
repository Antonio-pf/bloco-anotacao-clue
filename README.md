# Bloco de Detetive

Um aplicativo web simples para ajudar jogadores do jogo de tabuleiro Detetive (Clue) a registrar suas deduções durante a partida.

## Sobre o Projeto

O Bloco de Detetive é uma ferramenta digital que substitui o tradicional bloco de anotações usado no jogo Detetive. Ele permite que você marque quais cartas cada jogador possui ou não possui, ajudando a deduzir a solução do mistério.

## Funcionalidades

- **Registro de Marcações**: Marque quais cartas cada jogador tem ou não tem
- **Suporte para até 6 jogadores**: Compatível com o jogo padrão
- **Nomes personalizáveis**: Edite os nomes dos jogadores (até 3 caracteres)
- **Modo "No Cheating"**: Esconda o tabuleiro para evitar que outros jogadores vejam suas anotações
- **Temas**: Alterne entre os temas Verde e Rosa
- **Armazenamento local**: Suas marcações são salvas automaticamente no navegador
- **Design responsivo**: Funciona em dispositivos móveis e desktops

## Como Usar

### Marcações

- Clique em uma célula para alternar entre os estados:
  - Vazio: Desconhecido
  - ✓: O jogador possui esta carta
  - ✗: O jogador não possui esta carta

### Editar Nomes dos Jogadores

1. Clique no nome do jogador (P1, P2, etc.)
2. Digite o novo nome (máximo 3 caracteres)
3. Pressione Enter ou clique fora para salvar

### Modo "No Cheating"

- Clique no ícone do olho no cabeçalho para ativar/desativar o modo "No Cheating"

### Menu de Opções

- Clique no ícone de três pontos para acessar:
  - **Limpar Tudo**: Apaga todas as marcações (com confirmação)
  - **Tema Rosa/Verde**: Alterna entre os temas disponíveis

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage para persistência de dados

## Instalação

Não é necessária instalação. O aplicativo funciona diretamente no navegador.

### Para usar offline:

1. Baixe todos os arquivos (HTML, CSS e JavaScript)
2. Abra o arquivo `index.html` em qualquer navegador moderno

## Armazenamento de Dados

Todos os dados são armazenados localmente no seu navegador usando LocalStorage. Nenhuma informação é enviada para servidores externos.

- **Dados armazenados**:
  - Marcações de cartas
  - Nomes personalizados dos jogadores
  - Preferência de tema

Para limpar todos os dados, use a opção "Limpar Tudo" no menu ou limpe o cache do seu navegador.

## Compatibilidade

O aplicativo é compatível com todos os navegadores modernos:
- Chrome
- Firefox
- Safari
- Edge

## Licença

Este projeto é de uso livre e pode ser modificado conforme necessário.

---

Desenvolvido para facilitar suas partidas de Detetive. Divirta-se!