$(function () {
    carouselCards = 0;
    fetchItems();
    $(".btn-create-coupon-code").on("click", function() {
        $("#itemToRedeem").innertext($(this).parent.id+"Header")
    });
});

function buildCard(dir, o) {
    /**
     * [Builds the card using the agreed-upon html/css.]
     * @param o [JSON object]
     * @param dir [directory for thumbnail relative to index.html]
     * @returns [string representation of html for card]
     */
    let card;
    if (o.section == "hero") {
        card = `<div class="carousel-item ${carouselCards == 0 ? "active" : ""}">
        <img src="${o.thumbnail ? dir + o.id + o.thumbnail : "https://via.placeholder.com/1080x700"}" class="img-fluid d-block" alt="An image promoting "${o.itemName}">
            <div class="d-block rounded-bottom border mb-0 px-4 py-2">
                <h5 id=${o.id+"Header"}>${o.itemName}</h5>
                <p class="my-1">${o.desc}</p>
                <p class="text-muted">Expires: ${o.endDate}</p>
                <button type="button" class="btn align-self-end ml-auto w-50 btn-primary rounded-3 btn-create-coupon-code" data-bs-toggle="modal"
                                        data-bs-target="#orderModal">Claim Reward</button>
            </div>
        </div>`;
        carouselCards++;
    } else {
        card = `
        <div class="card my-3 p-3 pb-xs-0" id="${o.id}Container">
            <div class="row">
                <div class="col-4">
                    <img src="https://via.placeholder.com/300" class="img-fluid img-thumbnail" alt='An image of "${o.itemName}"'>
                </div>
                <div class="col-8 my-auto">
                    <div class="card-body">
                        <h5 id=${o.id+"Header"} class="card-title">${o.itemName}</h5>
                        <p class="card-text">${o.desc}</p>
                        <p class="card-text text-muted">Expires: ${o.endDate}</p>
                        <button type="button" class="btn btn-primary rounded-3 btn-create-coupon-code" data-bs-toggle="modal"
                                        data-bs-target="#orderModal">Claim</button>
                    </div>
                </div>
            </div>
        </div>`;
    };
    return card;
};
function fetchItems() {
    /**
     * [Fetches items from "item_info.json", calls "buildCard", and appends the card to appropriate section based on object's section and ID.]
     */
    fetch("./assets/item_info.json")
        .then(response => response.json())
        .then(data => {
            let index = 0;
            data.forEach(section => {
                let o = data[index];

                card = buildCard("./assets/imgs/thumbnails/", o);
                $(`#${o.section}`).append(card);
                index++;
            });
        });
}
