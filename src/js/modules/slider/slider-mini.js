import Slider from './slider';

export default class MiniSlider extends Slider {
	constructor(container, next, prev, activeClass, animate, autoplay, nextPlus) {
		super(container, next, prev, activeClass, animate, autoplay, nextPlus);
		this.interval = null; // Додана змінна для зберігання інтервалу
			
	}

	decorizeSlides() {
		this.slides.forEach(slide => {
			slide.classList.remove(this.activeClass);
			if (this.animate) {
				slide.querySelector('.card__title').style.opacity = '0.4';
				slide.querySelector('.card__controls-arrow').style.opacity = '0';
			}
		});

		//виправлення багу з кнопками
		if(!this.slides[0].closest('button')) {
			this.slides[0].classList.add(this.activeClass);
		}

		//this.slides[0].classList.add(this.activeClass);

		if (this.animate) {
			this.slides[0].querySelector('.card__title').style.opacity = '1';
			this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
		}

	}

	nextSlide() {
		//виправлення багу з кнопками
		//якщо кнопки перемістилися на 2-ге і 3-тє місце
		if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
			this.container.appendChild(this.slides[0]); //Слайд на кінець
			this.container.appendChild(this.slides[1]); //Переміщуємо кнопку
			this.container.appendChild(this.slides[2]); //Переміщуємо кнопку
			this.decorizeSlides();
		} else if (this.slides[1].tagName == 'BUTTON') {
			this.container.appendChild(this.slides[0]); //Слайд на кінець
			this.container.appendChild(this.slides[1]); //Переміщуємо кнопку
			this.decorizeSlides();
		} else {
			//ставимо 1-й елемент в кінець
			this.container.appendChild(this.slides[0]);
			this.decorizeSlides();
		}
            
            
		//ставимо 1-й елемент в кінець
		//this.container.appendChild(this.slides[0]);
		//this.decorizeSlides();
	}

	bindTriggers() {
		//При натисканні кнопки далі перший слайд перемішується в кінець слайдеру
		this.next.addEventListener('click', () => this.nextSlide());

		this.nextPage.forEach(arrow => {
			arrow.addEventListener('click', () => this.nextSlide());
		});

		
		this.prev.addEventListener('click', () => {

			//виправлення багу з кнопками
			for (let i = this.slides.length - 1; i > 0; i--) {
				if (this.slides[i].tagName !== 'BUTTON') {
					//визначаємо останній слайд
					let active = this.slides[i];
					//ставимо останній слайд в початок (1-й аргумент - елемент, 2-й - куди ставимо)
					this.container.insertBefore(active, this.slides[0]);
					this.decorizeSlides();
					break;
				}
			}


			//визначаємо останній слайд
			//let active = this.slides[this.slides.length - 1];
			//ставимо останній слайд в початок (1-й аргумент - елемент, 2-й - куди ставимо)
			//this.container.insertBefore(active, this.slides[0]);
			//this.decorizeSlides();
		});
	}

	init() {
		try {
			this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;
        
			this.bindTriggers();
			this.decorizeSlides();

			/* if(this.autoplay) {
			setInterval(() => this.nextSlide(), 5000);
		} */

			if (this.autoplay) {
				this.interval = setInterval(() => this.nextSlide(), 5000); // Зберігаємо інтервал в змінній
			}

			this.container.addEventListener('mouseover', () => {
				clearInterval(this.interval); // Зупиняємо інтервал при наведенні на контейнер
			});

			this.container.addEventListener('mouseout', () => {
				if (this.autoplay) {
					this.interval = setInterval(() => this.nextSlide(), 5000); // Поновлюємо інтервал при знятті курсора з контейнера
				}
			});

			this.next.addEventListener('mouseover', () => {
				clearInterval(this.interval); // Зупиняємо інтервал при наведенні на кнопки
			});

			this.next.addEventListener('mouseout', () => {
				if (this.autoplay) {
					this.interval = setInterval(() => this.nextSlide(), 5000); // Поновлюємо інтервал при знятті курсора з кнопки
				}
			});

			this.prev.addEventListener('mouseover', () => {
				clearInterval(this.interval); // Зупиняємо інтервал при наведенні на кнопки
			});

			this.prev.addEventListener('mouseout', () => {
				if (this.autoplay) {
					this.interval = setInterval(() => this.nextSlide(), 5000); // Поновлюємо інтервал при знятті курсора з кнопки
				}
			});
		} catch(e) {}

	}

}