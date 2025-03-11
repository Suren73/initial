import { Component } from '../core/Component'
import { Form } from './Form'
import { List } from './List'
import { ListItem } from './ListItem'

export class App extends Component {
	setup(props) {
		this.state = {
			total: 0,
			donates: [],
		}

		this.$rootElement = document.createElement('div')
		this.$rootElement.className = 'app'
		const totalAmount = document.createElement('h1')
		totalAmount.className = 'total-amount'
		totalAmount.textContent = 'Итого: $'
		const totalAmountText = document.createElement('span')
		totalAmountText.textContent = `${this.state.total}`
		this.$total = totalAmountText

		totalAmount.append(totalAmountText)
		this.$rootElement.appendChild(totalAmount)

		const donateForm = new Form({ onSubmit: this.onItemCreate.bind(this) })
		this.$rootElement.appendChild(donateForm.$rootElement)
		const donateList = new List()
		this.donateList = donateList
		this.$rootElement.appendChild(donateList.$rootElement)
	}

	onItemCreate(amount) {
		const item = new ListItem({
			amount: amount,
			onDelete: this.handleButton.bind(this),
		})
		this.state.donates.push(item)
		this.donateList.addItem(item)
		this.state.total += amount
		this.$total.textContent = `${this.state.total}`
		console.log(this.state.donates)
	}

	handleButton(event) {
		const { target } = event
		const rootElementDelete = target.closest('.donate-item')
		const totalId = rootElementDelete.id

		const searchIndex = this.state.donates.findIndex(
			donate => donate.state.id === Number(totalId)
		)

		if (searchIndex !== -1) {
			const amount = this.state.donates[searchIndex].state.amount
			this.state.total -= amount
			this.$total.textContent = `${this.state.total}`
			this.state.donates.splice(searchIndex, 1)
			rootElementDelete.remove()
		}
	}
}
