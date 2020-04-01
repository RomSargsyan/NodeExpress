const toPriceCarrency = price => {
    return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(price)
}

const toDateCarrency = date => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDateCarrency(node.textContent)
})

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toPriceCarrency(node.textContent)
})

const $basket = document.querySelector('#basket')
if ($basket) {
    $basket.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;

            fetch('/basket/remove/' + id, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(basket => {
                    if (basket.courses.length) {
                        const html = basket.courses.map(course => {
                            return `
                            <tr>
                                <th>${course.title}</th>
                                <th>${course.count}</th>
                                <th>
                                    <button class="btn btm-small js-remove" data-id="${course.id}">Remove</button>
                                </th>
                            </tr>
                            `
                        }).join('')
                        $basket.querySelector('tbody').innerHTML = html;
                        $basket.querySelector('.price').textContent = toCarrency(basket.price)
                    } else {
                        $basket.innerHTML = '<strong>Your basket is empty</strong>'
                    }
                })

        }
    })
}