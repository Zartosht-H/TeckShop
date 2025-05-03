text_truncate = function (str, length, ending) {
    // If the length parameter is not provided, set it to 100 characters
    if (length == null) {
        length = 100;
    }
    // If the ending parameter is not provided, set it to '...'
    if (ending == null) {
        ending = '...';
    }
    // Check if the length of the input string exceeds the specified length
    if (str.length > length) {
        // If yes, truncate the string to length - ending.length characters and append the ending
        return str.substring(0, length - ending.length) + ending;
    } else {
        // If no, return the original string
        return str;
    }
};

var container = document.getElementById("cardContainer");



fetch("https://fakestoreapi.com/products")
    .then(function (responce) {
        return responce.json();
    })
    .then(function (data) {
        var aspectRatio
        data.map(function (product) {
            var img = new Image();
            img.src = product.image;
            img.onload = function() {
                aspectRatio = this.width/this.height;
                console.log(aspectRatio);
            }
            var card = document.createElement("div");
            var cardImage = document.createElement("img");
            var cardBody = document.createElement("div");
            var cardTitle = document.createElement("h5");
            var cardDescription = document.createElement("p");
            var cardPrice = document.createElement("p");
            cardImage.setAttribute("src", `${product.image}`);
            cardImage.setAttribute("class", "card-img-top");
            cardImage.setAttribute("alt", `${product.category}`);
            cardBody.setAttribute("class", "card-body");
            cardTitle.innerHTML = text_truncate(product.title, 20);
            cardTitle.setAttribute("class", "card-title");
            cardDescription.setAttribute("class", "card-text");
            cardDescription.innerHTML = text_truncate(product.description);
            cardPrice.innerHTML = product.price;
            cardPrice.setAttribute("class", "btn btn-primary");
            card.appendChild(cardImage);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);
            cardBody.appendChild(cardPrice);
            card.appendChild(cardBody);
            card.setAttribute("class", "card col col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12");
            //card.setAttribute("style", "width: 18rem;");
            container.appendChild(card);
        })
    })
