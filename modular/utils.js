function createNewElement(elementTag = 'div', elementClass = [''], elementTextContent = '', attributes = {}, elementId = '') {
    const element = document.createElement(elementTag);

    if (elementClass.length >= 0) {
        elementClass.forEach(className => {
            element.classList.add(className);
        })
    }

    if (elementTextContent.length) {
        element.textContent = elementTextContent;
    }

    if (Object.keys(attributes).length) {
        setAttributes(element, attributes);
    }

    if (elementId.length) {
        element.id = elementId;
    }

    return element;
}

function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
