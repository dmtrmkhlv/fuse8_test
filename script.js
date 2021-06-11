;(function () { 
    'use strict';
    const cards = document.querySelector('.cards');

    let inputKey = document.getElementById('filter');
    inputKey.addEventListener('keyup', ()=>{
        if(inputKey.value.length > 2)
            fetch('https://603e38c548171b0017b2ecf7.mockapi.io/homes')
            .then(response => response.json())
            .then(data => {
                let dataFilter = data.filter((curentValue)=>{   
                    if(curentValue.title.toLowerCase().indexOf(inputKey.value.toLowerCase()) !== -1 )
                        return curentValue;
                });
                printArrayCool(dataFilter);
            })
            .catch(e => console.log(e.message));   
        if(inputKey.value.length == 0){
            fetch('https://603e38c548171b0017b2ecf7.mockapi.io/homes')
            .then(response => response.json())
            .then(data => printArrayCool(data))
            .catch(e => console.log(e.message));
        }
    })

    const printArrayCool = arrData => {
        cards.innerHTML = '';
        arrData.map(cardsItem => {
            let card = document.createElement('a');
            card.href =  `/details/${cardsItem.id}`
            card.classList.add('card');

            let cardImage = document.createElement('div');
            cardImage.classList.add('card-image');
            card.append(cardImage);

            let img = document.createElement('div');
            img.classList.add('card-image-img');
            img.style.backgroundImage = 'url("https://via.placeholder.com/564x233/'+ Math.floor(Math.random() * (256)).toString(16) + Math.floor(Math.random() * (256)).toString(16) + Math.floor(Math.random() * (256)).toString(16)+'/FFFFFF?text='+`${cardsItem.title}`+'")';
            cardImage.append(img); 

            let cardImageInfo = document.createElement('div');
            cardImageInfo.classList.add('card-image-info');
            (cardsItem.type == "IndependentLiving")?cardImageInfo.style.background = "#006F79":cardImageInfo.style.background = "#EC6608";
            cardImageInfo.innerHTML = `${cardsItem.type}`;
            cardImage.append(cardImageInfo);
            
            let cardInfo = document.createElement('div');
            cardInfo.classList.add('card-info');
            card.append(cardInfo);

            let cardTitle = document.createElement('h3');
            cardTitle.classList.add('card-title');
            cardTitle.innerHTML = `${cardsItem.title}`;
            cardInfo.append(cardTitle);

            let cardAddress = document.createElement('p');
            cardAddress.classList.add('card-address');
            cardAddress.innerHTML = `${cardsItem.address}`;
            cardInfo.append(cardAddress);

            let cardPrice = document.createElement('p');
            cardPrice.classList.add('card-price');
            cardPrice.innerHTML = 'New Properties for Sale from <b>£'+(`${cardsItem.price}`).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");+'</b>';
            cardInfo.append(cardPrice);
            
            let cardType = document.createElement('p');
            cardType.classList.add('card-type');
            cardType.innerHTML = 'Shared Ownership Available';
            cardInfo.append(cardType);

            cards.append(card);
        })
    }

    fetch('https://603e38c548171b0017b2ecf7.mockapi.io/homes')
    .then(response => response.json())
    .then(data => printArrayCool(data))
    .catch(e => console.log(e.message));

})();