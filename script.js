const sliderTabs = document.querySelectorAll('.slider-tab');
const sliderIndicator = document.querySelector('.slider-indicator');
const sliderControls = document.querySelector('.slider-controls');

// update indicator height and width
const updateIndicator = (tab, index) => {
    sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
    sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

    const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.offsetWidth / 2 + sliderTabs[index].offsetWidth / 2;
    sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth"});
}

const swiper = new Swiper(".slider-container",{
    effect: "fade",
    speed: 1300,
    // autoplay: { delay: 4000 }
    navigation: {
        prevEl: "#slide-prev",
        nextEl: "#slide-next"
    },
    on: {
        slideChange: () => {
            const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
            updateIndicator(sliderTabs[swiper.activeIndex], currentTabIndex);
        }
    }
})
// update slide and pagination on click
sliderTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        swiper.slideTo(index);
        updateIndicator(tab, index);
    });
});

updateIndicator(sliderTabs[0],0);
window.addEventListener("resize", () => updateIndicator(sliderTabs[swiper.activeIndex],0));