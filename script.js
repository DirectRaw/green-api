// Базовый URL для взаимодействия с API
const apiBaseUrl = "http://172.30.154.231:8080/waInstance";

// Функция для получения настроек
function getSettings() {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiTokenInstance').value;

    if (!idInstance || !apiToken) {
        document.getElementById('response').value = "Error: idInstance or apiTokenInstance is missing.";
        return;
    }

    const url = `${apiBaseUrl}${idInstance}/getSettings/${apiToken}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('response').value = `Error: ${error.message}`;
        });
}

// Функция для получения состояния инстанса
function getStateInstance() {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiTokenInstance').value;

    if (!idInstance || !apiToken) {
        document.getElementById('response').value = "Error: idInstance or apiTokenInstance is missing.";
        return;
    }

    const url = `${apiBaseUrl}${idInstance}/getStateInstance/${apiToken}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('response').value = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('response').value = `Error: ${error.message}`;
        });
}

// Функция для отправки сообщения
function sendMessage() {
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiTokenInstance').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Проверяем обязательные поля
    if (!idInstance || !apiToken || !phone || !message) {
        document.getElementById('response').value = "Error: Missing required fields (idInstance, apiTokenInstance, phone, message).";
        return;
    }

    // Конструируем URL согласно документации API
    const url = `${apiBaseUrl}${idInstance}/sendMessage/${apiToken}`;

    // Делаем запрос
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chatId: `${phone}@c.us`,  // Формат chatId для отправки сообщений
            message: message         // Текст сообщения
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Выводим ответ в текстовое поле
            document.getElementById('response').value = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('response').value = `Error: ${error.message}`;
        });
}

// Функция для отправки файла по URL
function sendFileByUrl() {
    // Считываем данные из полей ввода
    const idInstance = document.getElementById('idInstance').value;
    const apiToken = document.getElementById('apiTokenInstance').value;
    const phoneFile = document.getElementById('phoneFile').value;
    const fileUrl = document.getElementById('fileUrl').value;
    const responseElement = document.getElementById('response');

    // Проверяем, указаны ли все обязательные данные
    if (!idInstance) {
        responseElement.value = "Error: 'idInstance' is missing.";
        return;
    }
    if (!apiToken) {
        responseElement.value = "Error: 'apiTokenInstance' is missing.";
        return;
    }
    if (!phoneFile) {
        responseElement.value = "Error: 'phoneFile' (phone number) is missing.";
        return;
    }
    if (!fileUrl) {
        responseElement.value = "Error: 'fileUrl' (file URL) is missing.";
        return;
    }

    // Конструируем URL API
    const url = `${apiBaseUrl}${idInstance}/sendFileByUrl/${apiToken}`;

    // Формируем тело запроса
    const payload = {
        chatId: `${phoneFile}@c.us`,    // Формат chatId
        urlFile: fileUrl,              // URL файла
        fileName: fileUrl.split('/').pop() || 'file' // Имя файла на основе URL
    };

    // Выполняем запрос к API
    fetch(url, {
        method: 'POST',                          // Метод POST
        headers: { 'Content-Type': 'application/json' }, // Заголовок
        body: JSON.stringify(payload)           // Преобразуем тело запроса в JSON
    })
        .then(response => {
            // Проверяем, успешен ли запрос
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Если ответ успешен, выводим JSON-ответ сервера
            responseElement.style.color = "green"; // Успешный результат (зеленый цвет)
            responseElement.value = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            // В случае ошибки выводим сообщение об ошибке
            responseElement.style.color = "red";  // Ошибочное состояние (красный цвет)
            responseElement.value = `Error: ${error.message}`;
        });
}