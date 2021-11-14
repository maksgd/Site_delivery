const cardsMenu = document.querySelector('.cards-menu')
const addCard = document.getElementById('addCard')


const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

buttonOut.addEventListener('click', () => {
    logout()
    window.location.href = 'index.html'
    alert('Для доступа к меню необходима авторизация!')

})

const addToCart = (cartItem) => {
    if (cartArray.some((item) => item.id === cartItem.id)) {
        cartArray.map(item => {
            if (item.id === cartItem.id) {
                item.count++
            }

            return item
        })
    } else {
        cartArray.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(cartArray))
}

const changeTitle = (restaurant) => {
    const restaurantTitle = document.querySelector('.restaurant-title')
    const restaurantRating = document.querySelector('.rating')
    const restaurantPrice = document.querySelector('.price')
    const restaurantCategory = document.querySelector('.category')

    restaurantTitle.textContent = restaurant.name
    restaurantRating.textContent = restaurant.stars
    restaurantPrice.textContent = `От ${restaurant.price} ₽`
    restaurantCategory.textContent = restaurant.kitchen
}

const renderItems = (data) => {
    data.forEach(({ description, id, image, name, price }) => {
        const card = document.createElement('div')

        card.classList.add('card')

        card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">
                        ${description}
                    </div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>
        `
        card.querySelector('.button-add-cart').addEventListener('click', () => {
            addToCart({ name, price, id, count: 1 })
        })

        cardsMenu.append(card)
    })
}

cardsMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('button') ||
        e.target.classList.contains('button-card-text')) {

        addCard.style.opacity = '1'
        setTimeout(() => {
            addCard.style.opacity = '0'
        }, 1000)

    } else {
        console.log('Почемуто мимо')
    }
})

if (localStorage.getItem('restaurant')) {
    const restaurant = JSON.parse(localStorage.getItem('restaurant'))

    changeTitle(restaurant)

    fetch(`./db/${restaurant.products}`)
        .then((res) => res.json())
        .then((data) => {
            renderItems(data)
        })
        .catch((err) => {
            console.log(err)
        })
} else {
    window.location.href = '/'
}



