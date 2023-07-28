export default class Difference {
	constructor (container, triggerBtn, items) {
		this.container = document.querySelector(container);

		try {
			//конструкція, яка часто повторюється
			this.items = this.container.querySelectorAll(items);
			this.triggerBtn = this.container.querySelector(triggerBtn);
		} catch(e) {}

		
		this.counter = 0;
	}

	//ховаємо всі елементи крім останнього
	hideItems(items) {
		items.forEach((item, i, arr) => {
			//якщо це не останній елемент, то ховаємо
			if(i !== arr.length - 1) {
				item.style.display = 'none';
			}
		});
	}

	bindTriggers(counter, items) {
		this.triggerBtn.addEventListener('click', () => {
			//При кожному натисненні показується елементи, коли доходить до останнього, блок зникає
			//умовою перевіряємо, що елемент не останній
			if (counter !== items.length - 2) {
				//показуємо даний елемент, збільшуємо лічильник
				items[counter].style.display = 'flex';
				items[counter].classList.add('animated', 'fadeInUp');
				counter++;
			} else {
				//Коли доходимо до останнього, показуємо передостанній блок і видаляємо останній
				items[counter].style.display = 'flex';
				items[counter].classList.add('animated', 'fadeInUp');
				items[items.length - 1].remove(); 

			}
		});
		
	}




	init() {
		try {
			this.hideItems(this.items);
			this.bindTriggers(this.counter, this.items);		
		} catch(e) {}
	}
}