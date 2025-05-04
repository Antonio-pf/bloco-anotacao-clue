document.addEventListener("DOMContentLoaded", () => {
  // Dados do jogo
  const gameData = {
    suspects: {
      "C. Mostarda": Array(6).fill(null),
      "Prof. Ameixa": Array(6).fill(null),
      "Sr. Green": Array(6).fill(null),
      "Sra. Pavão": Array(6).fill(null),
      "Sra. Scarlet": Array(6).fill(null),
      "Chefe White": Array(6).fill(null),
    },
    weapons: {
      Faca: Array(6).fill(null),
      Castiçal: Array(6).fill(null),
      Revólver: Array(6).fill(null),
      Corda: Array(6).fill(null),
      "Cano de Chumbo": Array(6).fill(null),
      "Chave Inglesa": Array(6).fill(null),
    },
    rooms: {
      Salão: Array(6).fill(null),
      "Sala de Estar": Array(6).fill(null),
      "Sala de Jantar": Array(6).fill(null),
      Cozinha: Array(6).fill(null),
      "Sala de Música": Array(6).fill(null),
      "Hall": Array(6).fill(null),
      "Salão de Jogos": Array(6).fill(null),
      Biblioteca: Array(6).fill(null),
      Escritório: Array(6).fill(null),
    },
  }

  // Nomes dos jogadores (padrão)
  let playerNames = ["P1", "P2", "P3", "P4", "P5", "P6"]

  // Carregar dados salvos do localStorage, se existirem
  const savedData = localStorage.getItem("detectiveNotepadData")
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      Object.assign(gameData, parsedData)
    } catch (e) {
      console.error("Erro ao carregar dados salvos:", e)
    }
  }

  // Carregar nomes dos jogadores salvos
  const savedPlayerNames = localStorage.getItem("detectiveNotepadPlayerNames")
  if (savedPlayerNames) {
    try {
      const parsedNames = JSON.parse(savedPlayerNames)
      playerNames = parsedNames
    } catch (e) {
      console.error("Erro ao carregar nomes dos jogadores:", e)
    }
  }

  // Carregar tema salvo
  const savedTheme = localStorage.getItem("detectiveNotepadTheme")
  if (savedTheme === "pink") {
    document.getElementById("app-container").classList.add("theme-pink")
    document.getElementById("toggle-theme").textContent = "Tema Verde"
  }

  // Função para salvar dados no localStorage
  function saveGameData() {
    localStorage.setItem("detectiveNotepadData", JSON.stringify(gameData))
  }

  // Função para salvar nomes dos jogadores
  function savePlayerNames() {
    localStorage.setItem("detectiveNotepadPlayerNames", JSON.stringify(playerNames))
  }

  // Função para criar uma célula de marcação
  function createMarkCell(category, item, playerIndex) {
    const cell = document.createElement("div")
    cell.className = "mark-cell"

    // Adicionar marcação atual, se houver
    updateCellContent(cell, gameData[category][item][playerIndex])

    // Adicionar evento de clique
    cell.addEventListener("click", () => {
      const currentValue = gameData[category][item][playerIndex]

      // Alternar entre: null -> true -> false -> null
      if (currentValue === null) {
        gameData[category][item][playerIndex] = true
      } else if (currentValue === true) {
        gameData[category][item][playerIndex] = false
      } else {
        gameData[category][item][playerIndex] = null
      }

      // Atualizar visual da célula
      updateCellContent(cell, gameData[category][item][playerIndex])

      // Salvar dados
      saveGameData()
    })

    return cell
  }

  // Função para atualizar o conteúdo de uma célula
  function updateCellContent(cell, value) {
    // Limpar conteúdo atual
    cell.innerHTML = ""

    if (value === true) {
      // Adicionar check mark
      cell.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="check-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `
    } else if (value === false) {
      // Adicionar X mark em vez do ponto vermelho
      cell.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="x-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `
    }
  }

  // Função para criar uma linha da tabela
  function createTableRow(category, item) {
    const row = document.createElement("div")
    row.className = "game-row"

    // Célula do item
    const itemCell = document.createElement("div")
    itemCell.className = "item-cell"
    itemCell.textContent = item
    itemCell.title = item // Adicionar tooltip para nomes longos
    row.appendChild(itemCell)

    // Células de marcação para cada jogador
    for (let i = 0; i < 6; i++) {
      const markCell = createMarkCell(category, item, i)
      row.appendChild(markCell)
    }

    return row
  }

  // Função para preencher uma tabela
  function populateTable(tableId, category) {
    const table = document.getElementById(tableId)
    table.innerHTML = "" // Limpar tabela

    // Adicionar linhas para cada item
    for (const item in gameData[category]) {
      const row = createTableRow(category, item)
      table.appendChild(row)
    }
  }

  // Função para criar os cabeçalhos dos jogadores
  function createPlayerHeaders() {
    const playersGrid = document.getElementById("players-grid")
    playersGrid.innerHTML = "" // Limpar grid

    // Adicionar colunas para cada jogador
    for (let i = 0; i < 6; i++) {
      const playerColumn = document.createElement("div")
      playerColumn.className = "player-column"
      playerColumn.textContent = playerNames[i]
      playerColumn.dataset.index = i
      playerColumn.dataset.defaultName = `P${i + 1}`

      // Adicionar evento de clique para editar
      playerColumn.addEventListener("click", function () {
        const index = Number.parseInt(this.dataset.index)
        const defaultName = this.dataset.defaultName
        const currentName = playerNames[index]

        // Criar input para edição
        const input = document.createElement("input")
        input.type = "text"
        input.className = "player-input"
        input.value = currentName === defaultName ? "" : currentName
        input.placeholder = defaultName
        input.maxLength = 3 // Limitar a 3 caracteres

        // Substituir o texto pelo input
        this.textContent = ""
        this.appendChild(input)
        input.focus()

        // Função para salvar o nome editado
        const saveEdit = () => {
          let newName = input.value.trim()

          // Se estiver vazio, usar o nome padrão
          if (newName === "") {
            newName = defaultName
          }

          playerNames[index] = newName
          this.textContent = newName
          savePlayerNames()
        }

        // Eventos para salvar a edição
        input.addEventListener("blur", saveEdit)
        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            saveEdit()
          }
        })
      })

      playersGrid.appendChild(playerColumn)
    }
  }

  // Função para limpar todos os dados
  function clearAllData() {
    // Resetar todos os dados para null
    for (const category in gameData) {
      for (const item in gameData[category]) {
        gameData[category][item] = Array(6).fill(null)
      }
    }

    // Salvar dados limpos
    saveGameData()

    // Repopular tabelas
    populateTable("suspects-table", "suspects")
    populateTable("weapons-table", "weapons")
    populateTable("rooms-table", "rooms")
  }

  // Inicializar cabeçalhos dos jogadores
  createPlayerHeaders()

  // Preencher todas as tabelas
  populateTable("suspects-table", "suspects")
  populateTable("weapons-table", "weapons")
  populateTable("rooms-table", "rooms")

  // Funcionalidade de toggle de visibilidade (No Cheating)
  const toggleVisibilityButton = document.getElementById("toggle-visibility")
  const appContent = document.getElementById("app-content")
  const noCheatScreen = document.getElementById("no-cheating-screen")

  toggleVisibilityButton.addEventListener("click", () => {
    if (noCheatScreen.style.display === "flex") {
      noCheatScreen.style.display = "none"
    } else {
      noCheatScreen.style.display = "flex"
    }
  })

  // Funcionalidade do menu dropdown
  const menuButton = document.getElementById("menu-button")
  const dropdownMenu = document.getElementById("dropdown-menu")

  menuButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show")
  })

  // Fechar dropdown ao clicar fora
  window.addEventListener("click", (event) => {
    if (!event.target.matches("#menu-button") && !event.target.closest("#menu-button")) {
      if (dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show")
      }
    }
  })

  // Funcionalidade de limpar tudo
  const clearAllButton = document.getElementById("clear-all")
  const clearModal = document.getElementById("clear-modal")
  const cancelClearButton = document.getElementById("cancel-clear")
  const confirmClearButton = document.getElementById("confirm-clear")

  clearAllButton.addEventListener("click", () => {
    clearModal.style.display = "flex"
    dropdownMenu.classList.remove("show")
  })

  cancelClearButton.addEventListener("click", () => {
    clearModal.style.display = "none"
  })

  confirmClearButton.addEventListener("click", () => {
    clearAllData()
    clearModal.style.display = "none"
  })

  // Fechar modal ao clicar fora
  clearModal.addEventListener("click", (event) => {
    if (event.target === clearModal) {
      clearModal.style.display = "none"
    }
  })

  // Funcionalidade de alternar tema
  const toggleThemeButton = document.getElementById("toggle-theme")
  const appContainer = document.getElementById("app-container")

  toggleThemeButton.addEventListener("click", () => {
    if (appContainer.classList.contains("theme-pink")) {
      // Mudar para tema verde
      appContainer.classList.remove("theme-pink")
      toggleThemeButton.textContent = "Tema Rosa"
      localStorage.setItem("detectiveNotepadTheme", "green")
    } else {
      // Mudar para tema rosa
      appContainer.classList.add("theme-pink")
      toggleThemeButton.textContent = "Tema Verde"
      localStorage.setItem("detectiveNotepadTheme", "pink")
    }
    dropdownMenu.classList.remove("show")
  })
})
