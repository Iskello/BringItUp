/* export default class Accordeon {
	constructor (triggerBtns) {
		this.triggerBtns = document.querySelectorAll(triggerBtns);
	}

	bindTriggers(btns) {
		btns.forEach(btn => {
			btn.addEventListener('click', () => {
				const hideContent = btn.nextElementSibling;
				hideContent.style.display = 'block';
                hideContent.classList.add('animated', 'fadeInDown');
			});
		});
	}


	init() {
		this.bindTriggers(this.triggerBtns);
	}
} */

export default class Accordeon {
	constructor (triggers) {
		this.btns = document.querySelectorAll(triggers);
	}	


	init() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {				
				const hideContent = btn.nextElementSibling;
				hideContent.classList.toggle('msg');
				hideContent.style.marginTop = '20px';
				hideContent.classList.add('animated', 'fadeInDown');
			});
		});
	}
}