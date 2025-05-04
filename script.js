document.addEventListener("DOMContentLoaded", () => {
  const gameData = {
    suspects: {
      "Coronel Mostarda": Array(6).fill(null),
      "Professor Plum": Array(6).fill(null),
      "Sr. Green": Array(6).fill(null),
      "Sra. Peacock": Array(6).fill(null),
      "Srta. Scarlet": Array(6).fill(null),
      "Dr. Orchid": Array(6).fill(null),
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
      "Jardim de Inverno": Array(6).fill(null),
      "Salão de Jogos": Array(6).fill(null),
      Biblioteca: Array(6).fill(null),
      Escritório: Array(6).fill(null),
    },
  }

  let playerNames = ["P1", "P2", "P3", "P4", "P5", "P6"]

  const savedData = localStorage.getItem("detectiveNotepadData")
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      Object.assign(gameData, parsedData)
    } catch (e) {
      console.error("Erro ao carregar dados salvos:", e)
    }
  }

  const savedPlayerNames = localStorage.getItem("detectiveNotepadPlayerNames")
  if (savedPlayerNames) {
    try {
      const parsedNames = JSON.parse(savedPlayerNames)
      playerNames = parsedNames
    } catch (e) {
      console.error("Erro ao carregar nomes dos jogadores:", e)
    }
  }

  const savedTheme = localStorage.getItem("detectiveNotepadTheme")
  if (savedTheme === "pink") {
    document.getElementById("app-container").classList.add("theme-pink")
    document.getElementById("toggle-theme").textContent = "Tema Verde"
  }

  function saveGameData() {
    localStorage.setItem("detectiveNotepadData", JSON.stringify(gameData))
  }

  function savePlayerNames() {
    localStorage.setItem("detectiveNotepadPlayerNames", JSON.stringify(playerNames))
  }

  function createMarkCell(category, item, playerIndex) {
    const cell = document.createElement("div")
    cell.className = "mark-cell"

    if (playerIndex % 2 === 0) {
      cell.classList.add("cell-color-1")
    } else {
      cell.classList.add("cell-color-2")
    }

    updateCellContent(cell, gameData[category][item][playerIndex])

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

      updateCellContent(cell, gameData[category][item][playerIndex])

      saveGameData()
    })

    return cell
  }

  function updateCellContent(cell, value) {
    cell.innerHTML = ""

    if (value === true) {
      cell.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="check-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `
    } else if (value === false) {
      cell.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="x-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `
    }
  }

  function createTableRow(category, item) {
    const row = document.createElement("div")
    row.className = "game-row"

    const itemCell = document.createElement("div")
    itemCell.className = "item-cell"
    itemCell.textContent = item
    row.appendChild(itemCell)

    for (let i = 0; i < 6; i++) {
      const markCell = createMarkCell(category, item, i)
      row.appendChild(markCell)
    }

    return row
  }

  function populateTable(tableId, category) {
    const table = document.getElementById(tableId)
    table.innerHTML = "" 

    for (const item in gameData[category]) {
      const row = createTableRow(category, item)
      table.appendChild(row)
    }
  }

  function createPlayerHeaders() {
    const playersGrid = document.getElementById("players-grid")
    playersGrid.innerHTML = "" 

    for (let i = 0; i < 6; i++) {
      const playerColumn = document.createElement("div")
      playerColumn.className = "player-column"
      playerColumn.textContent = playerNames[i]
      playerColumn.dataset.index = i
      playerColumn.dataset.defaultName = `P${i + 1}`

      playerColumn.addEventListener("click", function () {
        const index = Number.parseInt(this.dataset.index)
        const defaultName = this.dataset.defaultName
        const currentName = playerNames[index]

        const input = document.createElement("input")
        input.type = "text"
        input.className = "player-input"
        input.value = currentName === defaultName ? "" : currentName
        input.placeholder = defaultName
        input.maxLength = 3 

        this.textContent = ""
        this.appendChild(input)
        input.focus()

        const saveEdit = () => {
          let newName = input.value.trim()

          if (newName === "") {
            newName = defaultName
          }

          playerNames[index] = newName
          this.textContent = newName
          savePlayerNames()
        }

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

  function clearAllData() {
    for (const category in gameData) {
      for (const item in gameData[category]) {
        gameData[category][item] = Array(6).fill(null)
      }
    }

    saveGameData()

    populateTable("suspects-table", "suspects")
    populateTable("weapons-table", "weapons")
    populateTable("rooms-table", "rooms")
  }
  createPlayerHeaders()

  populateTable("suspects-table", "suspects")
  populateTable("weapons-table", "weapons")
  populateTable("rooms-table", "rooms")

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

  const menuButton = document.getElementById("menu-button")
  const dropdownMenu = document.getElementById("dropdown-menu")

  menuButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show")
  })

  window.addEventListener("click", (event) => {
    if (!event.target.matches("#menu-button") && !event.target.closest("#menu-button")) {
      if (dropdownMenu.classList.contains("show")) {
        dropdownMenu.classList.remove("show")
      }
    }
  })

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

  clearModal.addEventListener("click", (event) => {
    if (event.target === clearModal) {
      clearModal.style.display = "none"
    }
  })

  const toggleThemeButton = document.getElementById("toggle-theme")
  const appContainer = document.getElementById("app-container")

  toggleThemeButton.addEventListener("click", () => {
    if (appContainer.classList.contains("theme-pink")) {
      appContainer.classList.remove("theme-pink")
      toggleThemeButton.textContent = "Tema Rosa"
      localStorage.setItem("detectiveNotepadTheme", "green")
    } else {
      appContainer.classList.add("theme-pink")
      toggleThemeButton.textContent = "Tema Verde"
      localStorage.setItem("detectiveNotepadTheme", "pink")
    }
    dropdownMenu.classList.remove("show")
  })
})
