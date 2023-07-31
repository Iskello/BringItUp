export default class VideoPlayer {
	constructor (triggers, overlay) {
		this.btns = document.querySelectorAll(triggers);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector('.close');
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
	}

	bindTriggers() {		
		this.btns.forEach((btn, i) => {
			try {
				const blockedElem = btn.closest('.module__video-item').nextElementSibling;

				if (i % 2 == 0) {
					blockedElem.setAttribute('data-disabled', 'true');
				}				
			} catch (e) {}

			btn.addEventListener('click', () => {
				if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
					//дізнаємося активну кнопку
					this.activeBtn = btn;

					//Ця умова виконається тільки тоді, коли ми вже 1 раз викликали наш плеєр - тоді у блока iframe буде id frame
					if (document.querySelector('iframe#frame')) {
						this.overlay.style.display = 'flex';
						//виправлення багу, що відкривається одне і те ж саме відео
						//перевіряємо, чи шлях співпадає за data-url у кнопки. Якщо ні, завантажуємо нове відео
						if (this.path !== btn.getAttribute('data-url')) {
							this.path = btn.getAttribute('data-url');
							this.player.loadVideoById({videoId: this.path});
						}
					} else {
						this.path = btn.getAttribute('data-url');
						this.createPlayer(this.path);
					}
				}
								
			});
		});
	}

	bindCloseBtn() {
		this.close.addEventListener('click', () => {
			this.overlay.style.display = 'none';
			this.player.stopVideo();
		});
	}

	createPlayer(url) {
		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: `${url}`,
			events: {
				'onStateChange': this.onPlayerStateChange
			}
		});

		this.overlay.style.display = 'flex';
	}

	onPlayerStateChange(state) {
		try {
			//від активної кнопки отримуємо батьківський блок, а від нього - наступний елемент (заблокований)
			const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
			//копіюємо повністю svg активного елемента
			const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
	
			//перевіряємо стан відео на завершеність state.data === 0
			if (state.data === 0) {
				if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
					blockedElem.querySelector('.play__circle').classList.remove('closed');
					blockedElem.querySelector('svg').remove();
					blockedElem.querySelector('.play__circle').appendChild(playBtn);
					blockedElem.querySelector('.play__text').textContent = 'play video';
					blockedElem.querySelector('.play__text').classList.remove('attention');
					blockedElem.style.opacity = 1;
					blockedElem.style.filter = 'none';
	
					blockedElem.setAttribute('data-disabled', 'false');
				}
			}
			
		} catch (error) {}

		
	}

	
	init() {
		if (this.btns.length > 0) {
			const tag = document.createElement('script');

			tag.src = 'https://www.youtube.com/iframe_api';
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			
			this.bindTriggers();
			this.bindCloseBtn();
		}
	}
}