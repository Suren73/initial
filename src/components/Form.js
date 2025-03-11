import { Component } from '../core/Component'

export class Form extends Component {
	setup(props) {
		this.state = {
			amount: '',
		}

		this.$rootElement = document.createElement('form')
		this.$rootElement.className = 'donate-form'

		const label = document.createElement('label')
		label.className = 'donate-form__input-label'
		label.textContent = 'Введите сумму в $'

		const input = document.createElement('input')
		input.className = 'donate-form__donate-input'
		input.name = 'amount'
		input.type = 'number'
		input.max = '100'
		input.min = '1'
		input.setAttribute('required', '')
		this.$input = input
		this.$input.addEventListener('input', this.handleInput.bind(this))

		label.append(input)

		const button = document.createElement('button')
		button.className = 'donate-form__submit-button'
		button.type = 'submit'
		button.setAttribute('disabled', '')
		button.textContent = 'Задонатить'
		this.$button = button

		this.$rootElement.appendChild(label)
		this.$rootElement.appendChild(button)
		this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this))
	}
	get isValid() {
		return this.state.amount >= 1 && this.state.amount <= 100
	}
	handleInput(event) {
		this.state.amount = event.target.value
		this.$button.disabled = !this.isValid
	}

	handleSubmit(event) {
		console.log(this.props)
		event.preventDefault()
		this.isValid ? this.props.onSubmit(Number(this.state.amount)) : null
		this.state.amount = ''
		this.$input.value = ''
	}
}
