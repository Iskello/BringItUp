import Slider from './slider';


//Створюємо головний слайдер який наслідується від Слайдеру
export default class MainSlider extends Slider {
	constructor(nextPage, prevPage) {
		super(nextPage, prevPage);
	}

	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		try {
			this.hanson.style.opacity = '0';
			//на третьому слайді показуємо вспливаюче інформаційне вікно
			if(n === 3) {
				this.hanson.classList.add('animated');
				setTimeout(() => {
					this.hanson.style.opacity = '1';
					this.hanson.classList.add('slideInUp');
				}, 3000);
			} else {
				this.hanson.classList.remove('slideInUp');
			}
		} catch(e) {}

		
		//ховаємо всі непотрібні слайди
		this.slides.forEach(slide => {
			slide.style.display = 'none';
		});
		//показуємо даний слайд
		this.slides[this.slideIndex - 1].style.display = 'block';
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	bindTriggers() {
		this.nextPage.forEach(item => {
			item.addEventListener('click', () => {
				this.plusSlides(1);
			});

			//При натисканні на логотип перелистується на перший слайд
			item.parentNode.previousElementSibling.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		
		});

		this.prevPage.forEach(item => {
			item.addEventListener('click', () => {				
				this.plusSlides(-1);
			});
		});

		

		/* document.querySelectorAll('.next').forEach(item => {
			item.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				this.plusSlides(1);
			});
		}); */
	}


	render() {
		if (this.container) {
			try {
				this.hanson = document.querySelector('.hanson');
			} catch(e) {}			
			
			this.showSlides(this.slideIndex);

			this.bindTriggers();
			
		} 
	}
}