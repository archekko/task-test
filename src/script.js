window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const checkNum = (selector) => {
        const numIputs = document.querySelectorAll(selector);
    
        //запрещаем ввод цифр
        numIputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\W/, '');
            });
        });
    };

    const forms = () => {
        const form = document.querySelectorAll('form'),
              inputs = document.querySelectorAll('input');

        checkNum('input[name="name"]');

        const message = {
            loading: 'loading...',
            success: 'Data sent successfully!',
            failure: 'Something went wrong...'
        };
    
        //функция котороая отправляет данные на сервер
        const postData = async (url, data) => {
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
    
            return await res.text();
        };
    
        //очищаем инпуты
        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            });
        };
    
        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);
    
                //собираем данные из формы
                const formData = new FormData(item);
                //если у формы есть атрибут то мы добавляем еще функционал
                if (item.getAttribute('data-calc') === "end") {
                    for (let k in state) {
                        formData.append(key, state[key]);
                    }
                }
    
                postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 10000);
                    });
            });
        });
    };
    forms();
});