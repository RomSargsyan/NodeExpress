const toCarrency = price => {
    return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCarrency(node.textContent)
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
                        const html = basket.courses.map(el => {
                        return `
                            <tr>
                                <th>${el.title}</th>
                                <th>${el.count}</th>
                                <th>
                                    <button class="btn btm-small js-remove" data-id="${id}">Remove</button>
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