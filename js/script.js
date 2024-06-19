document.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const fadeStart = 0;
    const fadeEnd = heroSection.offsetHeight;
    const fadeRange = fadeEnd - fadeStart;

    let opacity = 1;

    if (scrollTop >= fadeStart && scrollTop <= fadeEnd) {
        opacity = 1 - (scrollTop - fadeStart) / fadeRange;
    } else if (scrollTop > fadeEnd) {
        opacity = 0;
    }

    heroSection.style.backgroundColor = `rgba(24, 24, 26, ${1 - opacity})`;
    heroSection.style.backdropFilter = `blur(${(1 - opacity) * 15}px)`;
});


//Below are the codes for the animated hero texts in the hero section

document.addEventListener('DOMContentLoaded', function () {
    // Typewriter Effect for Hero Text
    function typeWriter(element, text, delay = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        type();
    }

    const heroText = document.getElementById('hero-name');
    const h2Texts = document.querySelector('.h2-texts');
    const heroTextContent = "Good-Day, Helen";
    const h2TextContent = "Let's get your Health in check right away. Select an option below <br> Or use the Health Bot floating beside you";

    typeWriter(heroText, heroTextContent, 100);
    setTimeout(() => {
        h2Texts.innerHTML = "";
        typeWriter(h2Texts, h2TextContent, 50);
    }, heroTextContent.length * 100 + 500);
});
