import { Component } from '../core/Component'

export class ListItem extends Component {
	setup(props) {
		this.state = {
			id: Date.now(),
			date: new Date(),
			amount: props.amount,
			onDelete: props.onDelete,
		}

		this.$rootElement = document.createElement('div')
		this.$rootElement.className = 'donate-item'

		this.$rootElement.id = this.state.id
		this.$rootElement.textContent = `${this.getDateFormat(
			this.state.date,
			'/'
		)}, ${this.getTimeFormat(this.state.date, ':')} - `

		const amount = document.createElement('b')
		amount.textContent = `$${this.state.amount}`

		const deleteButton = document.createElement('button')
		deleteButton.className = 'delete-button'
		deleteButton.type = 'button'
		deleteButton.textContent = 'Удалить'
		deleteButton.dataset.id = this.state.id
		this.$deleteButton = deleteButton
		this.$deleteButton.addEventListener('click', this.state.onDelete)

		this.$rootElement.append(amount, deleteButton)
		console.log('this.$rootElement', this.$rootElement)
	}

	addZero(num) {
		return String(num).length === 1 ? `0${num}` : String(num)
	}

	getDateFormat(date, separator = '.') {
		if (!(date instanceof Date)) {
			return 'Первое значение должно быть экземпляром класса Date'
		}
		const dateItem = date.getDate()
		const monthIndex = date.getMonth()
		const year = date.getFullYear()
		return [dateItem, monthIndex + 1, year]
			.map(el => this.addZero(el))
			.join(`${separator}`)
	}

	getTimeFormat(date, separator = '.') {
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const seconds = date.getSeconds()
		return [hours, minutes, seconds]
			.map(el => this.addZero(el))
			.join(`${separator}`)
	}
}
