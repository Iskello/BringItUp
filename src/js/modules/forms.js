export default class Form {
	constructor (form) {
		this.forms = document.querySelectorAll(form);
		this.inputs = document.querySelectorAll('input');
		this.message = {
			loading: 'Йде відправка',
			success: 'Дякуємо за заявку! Невдовзі ми з Вами зв\'яжемось!',
			failure: 'Упс! Щось пішло не так...'
		};
		this.path = 'assets/question.php';
	}

    
	//Функція відправки запиту на сервер
	async postData (url, data) {		
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
	}

	clearInputs() {
		this.inputs.forEach(item => {
			item.value = '';
		});
	}

	checkMailInputs() {
		const mailInputs = document.querySelectorAll('[type="email"]');
    
		mailInputs.forEach(input => {
			//тільки англійські літери и та числа
			input.addEventListener('keypress', function(e) {
				//всі символи від а до я та 0 - 9 в любому регістрі глобально
				if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
					e.preventDefault();
				}
			});            
		});
	}

	initMask() {
		//встановлюємо позицію курсора у елемента форми
		let setCursorPosition = (pos, elem) => {
			elem.focus();
			//перевіряє чи є метод та встановлює діапазон виділення тексту
			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			//перевіряємо інший метод для старіших версій IE
			} else if (elem.createTextRange) {
				let range = elem.createTextRange();

				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		};

		//основна функція створення маски
		function createMask(event) {
		//шаблон маски
			let matrix = '+1 (___) ___-____',
				i = 0,
				//видаляються всі нецифрові значення 
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '');

			if (def.length >= val.length) {
				val = def;
			}

			//використовуємо заміну кожного елементу
			this.value = matrix.replace(/./g, function(a) {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
			});

			if (event.type === 'blur') {
			//якщо нічого не написано, ставимо в початкову позицію
				if (this.value.length == 2) {
					this.value = '';
				}
			} else {
			//ставимо в позицію курсору
				setCursorPosition(this.value.length, this);
			}
		}

		let inputs = document.querySelectorAll('[name="phone"]');

		inputs.forEach(input => {
			input.addEventListener('input', createMask);
			input.addEventListener('focus', createMask);
			input.addEventListener('blur', createMask);
		});
	}

	init() {
		this.checkMailInputs();
		this.initMask();
		this.forms.forEach(form => {
			form.addEventListener('submit', (e) => {
				e.preventDefault();

				let statusMessage = document.createElement('div');
				statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
				form.parentNode.appendChild(statusMessage);

				statusMessage.textContent = this.message.loading;

				const formData = new FormData(form);

				this.postData(this.path, formData)
					.then(res => {
						console.log(res);
						statusMessage.textContent = this.message.success; 
					})
					.catch(() => {
						statusMessage.textContent = this.message.failure; 
					})
					.finally(() => {
						this.clearInputs();
						setInterval(() => {
							statusMessage.remove();
						}, 6000);
					});
			});
		});

	}
}