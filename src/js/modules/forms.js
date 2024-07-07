import checkNumInputs from './checkNumInputs';

const forms = state => {
	const form   = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');
	  //const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

	checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: 'Loading...',
		success: 'You will be contacted soon',
		failure: 'Something went wrong'
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: 'Post',
			body: data
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};

	form.forEach(item => {
		item.addEventListener('submit', e => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);
			if (item.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					statusMessage.textContent = message.success;
				})
				.catch(() => (statusMessage.textContent = message.failure))
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
};

export default forms;
