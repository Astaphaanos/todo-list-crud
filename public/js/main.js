document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.tarefas-container')
  console.log('tarefas-container:', container)

  if (!container) return

  container.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-concluir')) {
      e.preventDefault()
      console.log('Botão concluir clicado', e.target.dataset.id)

      const btn = e.target
      const id = btn.dataset.id
      const tarefaDiv = btn.closest('.tarefa')
      const titulo = tarefaDiv.querySelector('.titulo')
      const statusText = tarefaDiv.querySelector('.status-text')
      const btnEditar = tarefaDiv.querySelector('.editar-btn')

      try {
        const response = await fetch(`/concluir/${id}`, { method: 'POST' })

        if (response.ok) {
          tarefaDiv.classList.add('concluida')
          titulo.style.textDecoration = 'line-through'
          titulo.style.color = '#666'
          statusText.innerText = 'Concluída'
          btn.remove()
          btnEditar.remove()

          // Move pro fim da lista
          container.appendChild(tarefaDiv)
        } else {
          alert('Erro ao concluir tarefa.')
        }
      } catch (err) {
        console.error(err)
        alert('Erro ao conectar ao servidor.')
      }
    }
  })
})
