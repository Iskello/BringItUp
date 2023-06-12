export default class Difference {
	constructor (oldOfficer, newOfficer, items) {
		this.oldOfficer = document.querySelector(oldOfficer);
		this.newOfficer = document.querySelector(newOfficer);

		//конструкція, яка часто повторюється
		this.oldItems = this.oldOfficer.querySelectorAll(items);
		this.newItems = this.newOfficer.querySelectorAll(items);

		
		this.oldCounter = 0;
		this.newCounter = 0;
	}

	hideItems(container) {
		container.forEach((item, i, arr) => {
			//якщо це не останній елемент, то ховаємо
			if(i !== arr.length - 1) {
				item.style.display = 'none';
			}
		});
	}

	bindTriggers(container, counter, items) {
		container.querySelector('.plus').addEventListener('click', () => {			
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

		//Неоптимізована функція
		/* this.oldOfficer.querySelector('.plus').addEventListener('click', () => {
			//При кожному натисненні показується елементи, коли доходить до останнього, блок зникає
			//умовою перевіряємо, що елемент не останній
			if (this.oldCounter !== this.oldItems.length - 2) {
				//показуємо даний елемент, збільшуємо лічильник
				this.oldItems[this.oldCounter].style.display = 'flex';
				this.oldCounter++;
			} else {
				//Коли доходимо до останнього, показуємо передостанній блок і видаляємо останній
				this.oldItems[this.oldCounter].style.display = 'flex';
				this.oldItems[this.oldItems.length - 1].remove(); 

			}
		}); */
	}




	init() {
		this.hideItems(this.oldItems);
		this.hideItems(this.newItems);
		this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
		this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
		
	}
}