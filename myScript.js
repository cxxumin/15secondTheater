let movies = document.querySelectorAll('[id^="movie"]');
let popcorns = document.querySelectorAll('[class^="popcorn"]');
movies = Array.from(movies);
popcorns = Array.from(popcorns);

document.addEventListener('DOMContentLoaded', function() {
    movies.forEach(movie => {
        movie.style.display = 'none';
    });
    popcorns.forEach(popcorn => {
        popcorn.style.display = 'none';
    });
});

function playPopcornSound() {
    const audio = new Audio('popcorn_sound.mp3');
    audio.play();
}

let clickCount = 0;

document.body.addEventListener('click', function() {
    clickCount++;
    let numMoviesToShow;
    if (clickCount === 1) {
        numMoviesToShow = Math.floor(Math.random() * 2) + 1;
    } else if (clickCount === 2) {
        numMoviesToShow = Math.floor(Math.random() * 2) + 3;
    } else if (clickCount === 3) {
        numMoviesToShow = Math.floor(Math.random() * 2) + 8;
    } else if (clickCount === 4) {
        numMoviesToShow = movies.length;
    } else if (clickCount === 5) {
        let shuffledPopcorns = popcorns.sort(() => 0.5 - Math.random());
        let index = 0;
        const interval = setInterval(() => {
            if (index >= shuffledPopcorns.length) {
                clearInterval(interval);
                setTimeout(() => {
                    fadeOutEffect(1, 0, 2000).then(() => {
                        window.location.href = 'end.html';
                    });
                }, 3000);
                return;
            }
            shuffledPopcorns[index].style.display = 'block';
            playPopcornSound();
            index++;
        }, 200);
    }

    const chosenMovies = [];
    while (chosenMovies.length < numMoviesToShow) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        if (!chosenMovies.includes(randomIndex)) {
            chosenMovies.push(randomIndex);
            movies[randomIndex].style.display = 'block';
        }
    }
});

async function fadeOutEffect(start, end, duration) {
    return new Promise(resolve => {
        let currentTime = 0;
        const increment = 20;
        const tick = () => {
            currentTime += increment;
            document.body.style.opacity = easeInOutQuad(currentTime, start, end, duration);
            if (currentTime < duration) {
                setTimeout(tick, increment);
            } else {
                resolve();
            }
        };
        tick();
    });
}

function easeInOutQuad(currentTime, start, end, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) return (end - start) / 2 * currentTime * currentTime + start;
    currentTime--;
    return -(end - start) / 2 * (currentTime * (currentTime - 2) - 1) + start;
}
