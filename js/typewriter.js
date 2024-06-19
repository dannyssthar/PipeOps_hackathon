// document.addEventListener('DOMContentLoaded', function() {
//     function typeWriter(element, text, delay = 100) {
//         let index = 0;
//         function type() {
//             if (index < text.length) {
//                 element.innerHTML += text.charAt(index);
//                 index++;
//                 setTimeout(type, delay);
//             }
//         }
//         type();
//     }

//     const heroName = document.getElementById('hero-name');
//     if (heroName) {
//         const text = heroName.textContent;
//         heroName.textContent = '';
//         typeWriter(heroName, text);
//     }
// });
