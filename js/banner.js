const bannerClassList = ["animated", "flip", "slowest"];
const buttonClassList = ["animated", "zoomInUp", "slowest"];
const imageClassList = ["animated", "zoomInDown", "slowest"];

bannerSrc1 = new BannerSrc("sheraton-new-orleans-hotel.html", "/img/sponsors/sheraton1.jpg", 1);
bannerSrc2 = new BannerSrc("walk-on's-bistreaux.html", "/img/sponsors/walk6.jpeg", 2);
bannerSrc3 = new BannerSrc("children's_museum.html", "/img/sponsors/children2.jpeg", 3);
bannerSrc4 = new BannerSrc("ritz-carlton.html", "/img/sponsors/carlon2.jpeg", 4);
bannerSrc5 = new BannerSrc("haunted_museum.html", "/img/sponsors/haunted4.jpeg", 5);
bannerSrc6 = new BannerSrc("museum_of_death.html", "/img/sponsors/museum1.jpeg", 6);
bannerSrc7 = new BannerSrc("premium_parking.html", "/img/sponsors/parking2.jpeg", 7);
bannerSrc8 = new BannerSrc("ace_hotel.html", "/img/sponsors/ace_hotel4.jpeg", 8);

const bannerSrcArr = [bannerSrc1, bannerSrc2, bannerSrc3, bannerSrc4, bannerSrc5, bannerSrc6, bannerSrc7, bannerSrc8];

bannerSrc1.showCounter += 1;
banner1 = new Banner(bannerSrc1, "banner-1");

bannerSrc2.showCounter += 1;
banner2 = new Banner(bannerSrc2, "banner-2");

bannerSrc4.showCounter += 1;
banner3 = new Banner(bannerSrc4, "banner-3");

bannerSrc3.showCounter += 1;
banner4 = new Banner(bannerSrc3, "banner-4");

const bannerArr = [banner1, banner2, banner3, banner4];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

if (window.innerWidth >= 992) {

    setInterval(function () {

        let bannerID = "banner-" + (getRandomInt(bannerArr.length) + 1);

        currentBannerIDs = bannerArr.map(banner => (banner.src.id));

        let notVisibleBanners = bannerSrcArr.filter(bannerSrc => (!currentBannerIDs.includes(bannerSrc.id)));


        let minShowCounter = notVisibleBanners[0].showCounter;
        for (let i = 0; i < notVisibleBanners.length; i++) {
            if (notVisibleBanners[i].showCounter < minShowCounter) {
                minShowCounter = notVisibleBanners[i].showCounter;
            }
        }


        bannerMinShowArr = notVisibleBanners.filter(banner => (banner.showCounter == minShowCounter));


        let chosenBannerSrc = null;
        if (bannerMinShowArr.length > 1) {

            let index = getRandomInt(bannerMinShowArr.length);
            chosenBannerSrc = bannerMinShowArr[index];
        } else {
            chosenBannerSrc = bannerMinShowArr[0];
        }

        chosenBannerSrc.showCounter += 1;

        let chosenBanner = bannerArr.filter(banner => (banner.id == bannerID));

        chosenBanner.src = chosenBannerSrc;

        for (let i = 0; i < bannerArr.length; i++) {
            if (bannerArr[i].id == bannerID) {
                bannerArr[i].src = chosenBannerSrc;
            }
        }


        let currentBanner = document.getElementById(bannerID);

        if (currentBanner.classList.contains("tada")) {
            currentBanner.classList.remove("animated", "tada");
            currentBanner.classList.add(...bannerClassList);
        } else {
            for (let i = 0; i < bannerClassList.length; i++) {
                removeClassIfExists(currentBanner, bannerClassList[i]);
            }
            setTimeout(function () {
                currentBanner.classList.add(...bannerClassList);
            }, 500);

        }

        currentBanner.childNodes[3].href = chosenBanner.src.url;
        let img = currentBanner.childNodes[3].firstElementChild.firstElementChild;
        img.src = chosenBanner.src.img;
        for (let i = 0; i < imageClassList.length; i++) {
            removeClassIfExists(img, imageClassList[i]);
        }
        img.style.display = "none";
        setTimeout(function () {
            img.classList.add(...imageClassList);
            img.style.display = "block";
        }, 500);

        currentBanner.childNodes[5].href = chosenBanner.src.url;
        for (let i = 0; i < buttonClassList.length; i++) {
            removeClassIfExists(currentBanner.childNodes[5], buttonClassList[i]);
        }

        currentBanner.childNodes[5].style.display = "none";
        setTimeout(function () {
            currentBanner.childNodes[5].classList.add(...buttonClassList);
            currentBanner.childNodes[5].style.display = "block";
        }, 700);


    }, 10000);
} else {

    banner13 = new Banner(null, "banner-13");

    $(document).ready(function () {

        $('#mobile-banner').modal('show');

        setInterval(function () {

            let currentBanner = document.getElementById("banner-13");

            if (!$('#mobile-banner').is(':visible')) {
                let lastShownBannerID;
                if (banner13.src != null) {
                    lastShownBannerID = banner13.src.id;
                } else {
                    lastShownBannerID = 1;
                }

                let notVisibleBanners = bannerSrcArr.filter(bannerSrc => (lastShownBannerID != bannerSrc.id));


                let minShowCounter = notVisibleBanners[0].showCounter;
                for (let i = 0; i < notVisibleBanners.length; i++) {
                    if (notVisibleBanners[i].showCounter < minShowCounter) {
                        minShowCounter = notVisibleBanners[i].showCounter;
                    }
                }


                bannerMinShowArr = notVisibleBanners.filter(banner => (banner.showCounter == minShowCounter));


                let chosenBannerSrc = null;
                if (bannerMinShowArr.length > 1) {

                    let index = getRandomInt(bannerMinShowArr.length);
                    chosenBannerSrc = bannerMinShowArr[index];
                } else {
                    chosenBannerSrc = bannerMinShowArr[0];
                }

                chosenBannerSrc.showCounter += 1;

                banner13.src = chosenBannerSrc;

                currentBanner.childNodes[3].href = banner13.src.url;

                let img = currentBanner.childNodes[3].firstElementChild.firstElementChild;
                img.src = banner13.src.img;

                currentBanner.childNodes[5].href = banner13.src.url;


                $('#mobile-banner').modal('show');


            }
        }, 20000);


    });
}


function removeClassIfExists(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }

}

function BannerSrc(url, img, id) {

    this.url = url,
        this.img = img,
        this.id = id
    this.showCounter = 0
}

function Banner(src, id) {
    this.src = src;
    this.id = id;
}