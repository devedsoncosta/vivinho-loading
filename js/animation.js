document.addEventListener("DOMContentLoaded", function () {
    const isLoading = true;
    let waveInterval;

    const elements = {
        vivinhoIn: document.getElementById('vivinhoInAnimation'),
        vivinhoPulse: document.getElementById('vivinhoPulseAnimation'),
        vivinhoOut: document.getElementById('vivinhoOutAnimation'),
        wave1: document.getElementById('waveAnimation'),
        wave2: document.getElementById('waveAnimation2')
    };

    const createAnimation = (element, path, loop = false, autoplay = false) => {
        return lottie.loadAnimation({
            container: element,
            renderer: 'svg',
            loop: loop,
            autoplay: autoplay,
            path: path
        });
    };

    const animations = {
        vivinhoIn: createAnimation(elements.vivinhoIn, '../lottie/in-lottie.json', false, true),
        vivinhoPulse: createAnimation(elements.vivinhoPulse, '../lottie/pulse-lottie.json', true, false),
        vivinhoOut: createAnimation(elements.vivinhoOut, '../lottie/out-lottie.json', false, false),
        wave1: createAnimation(elements.wave1, '../lottie/wave-lottie.json', false, false),
        wave2: createAnimation(elements.wave2, '../lottie/wave-lottie.json', false, false)
    };

    const toggleClass = (element, className, add) => {
        if (add) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    };

    const hideElements = () => {
        Object.values(elements).forEach(el => toggleClass(el, 'hidden', true));
    };

    const showElement = (element) => {
        toggleClass(element, 'hidden', false);
    };

    const addWave = (waveAnimation, waveContainer) => {
        showElement(waveContainer);
        waveAnimation.goToAndPlay(0, true);
    };

    const startWaveInterval = () => {
        if (!waveInterval) {
            waveInterval = setInterval(() => {
                addWave(animations.wave1, elements.wave1);
                setTimeout(() => {
                    addWave(animations.wave2, elements.wave2);
                }, 1000);
            }, 2000);
        }
    };

    const stopWaveInterval = () => {
        clearInterval(waveInterval);
        waveInterval = null;
        toggleClass(elements.wave1, 'wave-fade-out', true);
        toggleClass(elements.wave2, 'wave-fade-out', true);
    };

    const handleVivinhoInComplete = () => {
        toggleClass(elements.vivinhoIn, 'hidden', true);
        if (isLoading) {
            showElement(elements.vivinhoPulse);
            animations.vivinhoPulse.play();
            startWaveInterval();
        } else {
            showElement(elements.vivinhoOut);
            animations.vivinhoOut.play();
        }
    };

    const handleVivinhoPulseLoopComplete = () => {
        if (!isLoading) {
            animations.vivinhoPulse.stop();
            stopWaveInterval();
            toggleClass(elements.vivinhoPulse, 'hidden', true);
            showElement(elements.vivinhoOut);
            animations.vivinhoOut.play();
        }
    };

    const handleVivinhoOutComplete = () => {
        toggleClass(elements.wave1, 'wave-fade-out', true);
        toggleClass(elements.wave2, 'wave-fade-out', true);
        toggleClass(elements.vivinhoOut, 'hidden', true);
    };

    hideElements();
    showElement(elements.vivinhoIn);

    animations.vivinhoIn.addEventListener('complete', handleVivinhoInComplete);
    animations.vivinhoPulse.addEventListener('loopComplete', handleVivinhoPulseLoopComplete);
    animations.vivinhoOut.addEventListener('complete', handleVivinhoOutComplete);
});
