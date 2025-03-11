import { Component } from '../core/Component'

export class List extends Component {
	setup() {
		this.$rootElement = document.createElement('div')
		this.$rootElement.className = 'donates-container'

		const title = document.createElement('h2')
		title.className = 'donates-container__title'
		title.textContent = 'Список донатов'
		const listContainer = document.createElement('div')
		listContainer.className = 'donates-container__donates'
		this.$listContainer = listContainer

		this.$rootElement.append(title, listContainer)
	}

	addItem(item) {
		this.$listContainer.appendChild(item.$rootElement)
	}
}
