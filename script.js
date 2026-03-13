// Grab references to interactive elements
const envelope = document.getElementById('envelope');
const cardContainer = document.getElementById('cardContainer');
const card = document.getElementById('card');
const insidePanel = document.querySelector('.inside-panel');

// State for dragging card rotation (X and Y axes)
let isDraggingCard = false;
let lastX = 0;
let lastY = 0;
let rotationX = 0; // card rotation on X-axis
let rotationY = 0; // card rotation on Y-axis

// State for dragging hinge (opening/closing the card)
let isDraggingHinge = false;
let hingeAngle = 0; // 0° closed, 180° open

// --- Envelope opening animation ---
envelope.addEventListener('click', () => {
    // avoid re-open if already opened
    if (envelope.classList.contains('open')) return;

    envelope.classList.add('open');

    // slide the card container out of the envelope
    gsap.to(cardContainer, {
        duration: 0.8,
        display: 'block',
        y: -50,
        ease: 'back.out(1.7)',
        onStart: () => {
            cardContainer.classList.add('show');
        },
        onComplete: () => {
            // after sliding out, auto-open the card slowly
            autoOpenCard();
        }
    });
});

// Function to auto-open the card (hinge animation)
function autoOpenCard() {
    gsap.to(insidePanel, {
        duration: 1.5,
        rotationY: -180,
        ease: 'power2.out',
        onUpdate: () => {
            hingeAngle = Math.abs(gsap.getProperty(insidePanel, 'rotationY'));
            // update cake expansion based on hinge
            updateCakeExpansion();
        },
        onComplete: () => {
            insidePanel.classList.add('open');
        }
    });
}

// Function to update pop-up cake expansion based on hinge angle
function updateCakeExpansion() {
    const cake = document.getElementById('cake');
    const expansion = hingeAngle / 180; // 0 to 1
    cake.style.transform = `scale(${expansion}) translateZ(${expansion * 20}px)`;
}

// --- Card interaction: rotation and hinge control ---
// Start drag: determine if dragging card or hinge
function startDrag(e) {
    const target = e.target;
    if (target.closest('.inside-panel')) {
        // dragging on inside panel: control hinge
        isDraggingHinge = true;
        lastY = e.clientY || e.touches[0].clientY;
    } else if (target.closest('.card')) {
        // dragging on card (but not inside): rotate whole card
        isDraggingCard = true;
        lastX = e.clientX || e.touches[0].clientX;
        lastY = e.clientY || e.touches[0].clientY;
        card.classList.add('dragging');
    }
    e.preventDefault();
}

// During drag
function drag(e) {
    if (isDraggingHinge) {
        const currentY = e.clientY || e.touches[0].clientY;
        const deltaY = currentY - lastY;
        lastY = currentY;
        hingeAngle += deltaY * 0.5; // sensitivity
        hingeAngle = Math.max(0, Math.min(180, hingeAngle)); // clamp 0-180
        insidePanel.style.transform = `translateZ(0) rotateY(${-hingeAngle}deg)`;
        updateCakeExpansion();
        if (hingeAngle > 90) {
            insidePanel.classList.add('open');
        } else {
            insidePanel.classList.remove('open');
        }
    } else if (isDraggingCard) {
        const currentX = e.clientX || e.touches[0].clientX;
        const currentY = e.clientY || e.touches[0].clientY;
        const deltaX = currentX - lastX;
        const deltaY = currentY - lastY;
        lastX = currentX;
        lastY = currentY;
        rotationY += deltaX * 0.5;
        rotationX -= deltaY * 0.5; // invert for natural feel
        cardContainer.style.transform = `translate(-50%, 0) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
    e.preventDefault();
}

// Stop drag
function stopDrag() {
    isDraggingCard = false;
    isDraggingHinge = false;
    card.classList.remove('dragging');
}

// Attach event listeners for mouse and touch
card.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

card.addEventListener('touchstart', startDrag, {passive: false});
document.addEventListener('touchmove', drag, {passive: false});
document.addEventListener('touchend', stopDrag);

// Optional: double-click to reset rotations
card.addEventListener('dblclick', () => {
    rotationX = 0;
    rotationY = 0;
    cardContainer.style.transform = `translate(-50%, 0) rotateX(0deg) rotateY(0deg)`;
    // also reset hinge if wanted, but maybe not
});
