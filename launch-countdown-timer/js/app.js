const targetDate = new Date("May 14, 2023 00:00:00");
// targetDate.setHours(targetDate.getHours() + 5);

function getTimeSegmentElements(segmentElement) {
    const segmentDisplay = segmentElement.querySelector(
        '.segment-display'
    );
    const segmentDisplayTop = segmentDisplay.querySelector(
        '.segment-display__top'
    );
    const segmentDisplayBottom = segmentDisplay.querySelector(
        '.segment-display__bottom'
    );

    const segmentOverlay = segmentDisplay.querySelector(
        '.segment-overlay'
    );
    const segmentOverlayTop = segmentOverlay.querySelector(
        '.segment-overlay__top'
    );
    const segmentOverlayBottom = segmentOverlay.querySelector(
        '.segment-overlay__bottom'
    );

    return {
        segmentDisplayTop,
        segmentDisplayBottom,
        segmentOverlay,
        segmentOverlayTop,
        segmentOverlayBottom,
    };
}

function updateSegmentValues(
    displayElement,
    overlayElement,
    value
) {
    displayElement.textContent = value;
    overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
    const segmentElements =
        getTimeSegmentElements(segmentElement);

    if (
        parseInt(
            segmentElements.segmentDisplayTop.textContent,
            10
        ) === timeValue
    ) {
        return;
    }

    segmentElements.segmentOverlay.classList.add('flip');

    updateSegmentValues(
        segmentElements.segmentDisplayTop,
        segmentElements.segmentOverlayBottom,
        timeValue
    );

    function finishAnimation() {
        segmentElements.segmentOverlay.classList.remove('flip');
        updateSegmentValues(
            segmentElements.segmentDisplayBottom,
            segmentElements.segmentOverlayTop,
            timeValue
        );

        this.removeEventListener(
            'animationend',
            finishAnimation
        );
    }

    segmentElements.segmentOverlay.addEventListener(
        'animationend',
        finishAnimation
    );
}

function updateTimeSection(sectionID, timeValue) {
    const firstNumber = Math.floor(timeValue / 10) || 0;
    const secondNumber = timeValue % 10 || 0;
    const sectionElement = document.getElementById(sectionID);
    const timeSegments =
        sectionElement.querySelectorAll('.time-segment');

    updateTimeSegment(timeSegments[0], firstNumber);
    updateTimeSegment(timeSegments[1], secondNumber);
}

function getTimeRemaining(targetDateTime) {
    const nowTime = Date.now();
    const complete = nowTime >= targetDateTime;

    if (complete) {
        return {
            complete,
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0
        };
    }

    const secondsRemaining = Math.floor(targetDateTime - nowTime);
    const days = Math.floor(secondsRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((secondsRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((secondsRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((secondsRemaining / 1000) % 60)

    return {
        complete,
        seconds,
        minutes,
        hours,
        days,
    };
}

function updateAllSegments() {
    const timeRemainingBits = getTimeRemaining(
        new Date(targetDate).getTime()
    );

    updateTimeSection('seconds', timeRemainingBits.seconds);
    updateTimeSection('minutes', timeRemainingBits.minutes);
    updateTimeSection('hours', timeRemainingBits.hours);
    updateTimeSection('days', timeRemainingBits.days);
    return timeRemainingBits.complete;
}

const countdownTimer = setInterval(() => {
    const isComplete = updateAllSegments();

    if (isComplete) {
        clearInterval(countdownTimer);
    }
}, 1000);

updateAllSegments();
