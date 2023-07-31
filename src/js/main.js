import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';
import Accordeon from './modules/accordeon';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
	const slider = new MainSlider({nextPage: '.next', container: '.page', prevPage: '.sidecontrol__controls-show'});
	slider.render();

	const modulePageSlider = new MainSlider({container: '.moduleapp', nextPage: '.next', prevPage: '.prev'});
	modulePageSlider.render();

	const showUpSlider = new MiniSlider({
		container: '.showup__content-slider',
		prev: '.showup__prev',
		next: '.showup__next',
		nextPage: '.card__controls-arrow',
		activeClass: 'card-active',
		animate: true
	});
	showUpSlider.init();

	const modulesSlider = new MiniSlider({
		container: '.modules__content-slider',
		prev: '.modules__info-btns .slick-prev',
		next: '.modules__info-btns .slick-next',
		nextPage: '.card__controls-arrow',
		activeClass: 'card-active',
		animate: true,
		autoplay: true
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		container: '.feed__slider',
		prev: '.feed__slider .slick-prev',
		next: '.feed__slider .slick-next',
		activeClass: 'feed__item-active'
	});
	feedSlider.init();

	new VideoPlayer('.showup .play', '.overlay').init();
	new VideoPlayer('.module__video-item .play', '.overlay').init();

	
	new Difference('.officerold', '.btn_trigger', '.officer__card-item').init();
	new Difference('.officernew', '.btn_trigger', '.officer__card-item').init();

	new Accordeon('.module__info-show').init();

	new Download('.download').init();
	

	
	new Form('.form').init();
});