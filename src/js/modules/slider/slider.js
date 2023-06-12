export default class Slider {
	constructor({container = null,
		//вперед/назад для головного слайдера 
		nextPage = null, 
		prevPage = null,
		//вперед/назад для міні слайдера
		next = null, 
		prev = null,
		//додаткова кнопка для перелистування (міні слайдер)
		nextPlus = null,
		activeClass = '',
		animate,
		autoplay } = {}) {

		this.container = document.querySelector(container);
		try {
			this.slides = this.container.children;
		} catch(e) {} 
		this.nextPage = document.querySelectorAll(nextPage);
		this.prevPage = document.querySelectorAll(prevPage);
		this.prev = document.querySelector(prev);
		this.next = document.querySelector(next);
		this.nextPlus = document.querySelectorAll(nextPlus);
		this.activeClass = activeClass;
		this.animate = animate;
		this.autoplay = autoplay;
		this.slideIndex = 1;
	}

}