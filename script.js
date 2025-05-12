// Contador de tiempo juntos
function updateTimeCounter() {
    const startDate = new Date('2023-05-11');
    const currentDate = new Date();
    
    const diff = currentDate - startDate;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = Math.floor(totalDays % 30);
    
    document.getElementById('timeCounter').innerHTML = 
        `${years} años, ${months} meses y ${days} días de amor infinito ❤️`;
        
    // Actualizar la fecha actual en el footer
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('es-ES', options);
}

// Mensajes especiales para cada foto
const messages = {
    1: "Cuando tuvimos nuestra primera citaa amrrrr",
    2: "Cuando nos dimos nuestro primer beso amorrr",
    3: "Cuando hicimos nuestra primero bayuncada amorrrr",
    4: "Cuando me dijiste que me amabas por primera vez"
};

function showMessage(photoId) {
    Swal.fire({
        title: '¡Nuestro Momento Especial!',
        text: messages[photoId],
        icon: 'success',
        confirmButtonText: '❤️',
        background: '#fff0f0',
        confirmButtonColor: '#ff4d4d',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then(() => {
        launchMiniConfetti();
    });
}

// Efecto de corazones flotantes en el fondo
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'floating-heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 14 + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    document.querySelector('.hearts-bg').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Confetti effect
function launchConfetti() {
    const colors = ['#ff4d4d', '#ff6b6b', '#ff9999', '#ffcccc'];
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['heart', 'circle'],
        gravity: 0.8,
        scalar: 1.2
    });
}

function launchMiniConfetti() {
    const colors = ['#ff4d4d', '#ff6b6b', '#ff9999'];
    confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: colors
    });
}

// Control de música
function setupMusicControl() {
    const musicBtn = document.getElementById('musicToggle');
    const music = document.getElementById('bgMusic');
    let isPlaying = false;

    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            musicBtn.classList.remove('music-playing');
        } else {
            music.play();
            musicBtn.classList.add('music-playing');
        }
        isPlaying = !isPlaying;
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateTimeCounter();
    setInterval(updateTimeCounter, 1000 * 60 * 60); // Actualiza cada hora
    setInterval(createHeart, 300);
    setupMusicControl();

    // Animated entrance for elements
    const elementsToAnimate = [
        document.querySelector('header'),
        document.querySelector('.love-message'),
        document.querySelector('.memory-gallery'),
        document.querySelector('.timeline'),
        document.querySelector('.love-buttons')
    ];

    elementsToAnimate.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.animation = 'fadeIn 1s ease forwards';
            element.style.animationDelay = index * 0.2 + 's';
        }, 100);
    });

    // Surprise button
    document.getElementById('surpriseButton').addEventListener('click', function() {
        const message = document.getElementById('surpriseMessage');
        message.classList.remove('hidden');
        launchConfetti();
        
        Swal.fire({
            title: 'Te Amo',
            text: '¡Feliz segundo aniversario, mi amor! Gracias por estos dos años juntooosss.',
            imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzh6NmE5YXlqZHp0ajZxcThzNngxc2thaGJ3Y3JsbGV5NGk0dGl2dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jsEqs3Q22zxRb6vkIZ/giphy.gif',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Corazón animado',
            confirmButtonText: '❤️',
            background: '#fff0f0',
            confirmButtonColor: '#ff4d4d',
            showClass: {
                popup: 'animate__animated animate__zoomIn'
            }
        });
    });
    
    // Love letter button
    document.getElementById('loveLetterBtn').addEventListener('click', function() {
        const letter = document.getElementById('loveLetter');
        letter.classList.remove('hidden');
        launchMiniConfetti();
    });
});

// Typing effect for the poem when visible
function createObserver() {
    const poemElement = document.querySelector('.poem p');
    const letterElement = document.querySelector('.letter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === poemElement) {
                    animateTextTyping(poemElement);
                } else if (entry.target === letterElement) {
                    animateTextFadeIn(letterElement);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (poemElement) observer.observe(poemElement);
    if (letterElement) observer.observe(letterElement);
}

function animateTextTyping(element) {
    const originalText = element.textContent;
    element.textContent = '';
    let i = 0;
    
    const typing = setInterval(() => {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 50);
}

function animateTextFadeIn(parentElement) {
    const paragraphs = parentElement.querySelectorAll('p');
    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.animation = 'fadeIn 1s ease forwards';
        p.style.animationDelay = index * 0.5 + 's';
    });
}

// Iniciar el observador cuando todo esté cargado
window.addEventListener('load', createObserver);
