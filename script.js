document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill');
    const bgMusic = document.getElementById('bgMusic');
    const pfpMuteBtn = document.getElementById('pfpMuteBtn');
    const pfpMuteIcon = pfpMuteBtn.querySelector('i');

    if (bgMusic && pfpMuteBtn) {
        bgMusic.volume = 0.3;

        const savedMute = localStorage.getItem("bgMusicMuted");
        if (savedMute === "true") {
            bgMusic.muted = true;
            pfpMuteIcon.className = 'fas fa-volume-mute';
        } else {
            bgMusic.muted = false;
            pfpMuteIcon.className = 'fas fa-volume-up';
            bgMusic.play().catch(() => {
                console.warn('Autoplay blocked until user interacts.');
            });
        }

        pfpMuteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            bgMusic.muted = !bgMusic.muted;

            if (bgMusic.muted) {
                pfpMuteIcon.className = 'fas fa-volume-mute';
                localStorage.setItem("bgMusicMuted", "true");
            } else {
                pfpMuteIcon.className = 'fas fa-volume-up';
                localStorage.setItem("bgMusicMuted", "false");
                if (bgMusic.paused) bgMusic.play();
            }
        });
    }

    

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                const fill = skill.querySelector('.fill');
                const percent = skill.querySelector('.percent');
                const targetPercent = parseInt(fill.style.width);

                fill.style.width = "0%";
                percent.textContent = "0%";

                requestAnimationFrame(() => {
                    fill.style.transition = 'width 1.2s ease-out';
                    fill.style.width = `${targetPercent}%`;
                });

                let current = 0;
                const updateCounter = () => {
                    current += 2;
                    if (current >= targetPercent) {
                        percent.textContent = `${targetPercent}%`;
                    } else {
                        percent.textContent = `${current}%`;
                        requestAnimationFrame(updateCounter);
                    }
                };
                updateCounter();

                obs.unobserve(skill);
            }
        });
    }, {
        threshold: 0.3
    });
        const tabSequence = ['b', 'o', 'g'];
        let i = 0;

        function animateTabTitle() {
            if (i < tabSequence.length) {
                document.title = tabSequence[i];
                i++;
                setTimeout(animateTabTitle, 500); 
            } else {
                document.title = 'bog';
                setTimeout(() => {
                    i = 0; 
                    animateTabTitle();
                }, 60000); 
            }
        }
        animateTabTitle();

    skills.forEach(skill => observer.observe(skill));

    skills.forEach(skill => {
        const fill = skill.querySelector('.fill');
        skill.addEventListener('mouseenter', () => {
            fill.style.transform = 'scaleY(1.1)';
            fill.style.filter = 'brightness(1.2)';
        });
        skill.addEventListener('mouseleave', () => {
            fill.style.transform = 'scaleY(1)';
            fill.style.filter = 'brightness(1)';
        });
    });
});

const loadingMessages = [
  "use truffled.lol",
  "frogie my twin",
  "szvy is a fatass",
  "silksong NOW",
  "npa.lol",
  "thinking about him <3",
  "baby shlawng"
];

const loadingText = document.getElementById("loading-text");
const loadingScreen = document.getElementById("loading-screen");

window.addEventListener("load", () => {
  const msg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  loadingText.textContent = msg;
  loadingText.style.opacity = 1;

  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "opacity 0.8s ease";
    setTimeout(() => loadingScreen.remove(), 800);
  }, 700);
});