// Grab references to interactive elements
const envelope = document.getElementById('envelope');
const card = document.getElementById('card');

// State for dragging rotation
let isDragging = false;
let lastY = 0;
let rotationX = 90; // card starts flat (rotateX(90deg))

// --- Envelope opening animation ---
envelope.addEventListener('click', () => {
    // avoid re-open if already opened
    if (envelope.classList.contains('open')) return;

    envelope.classList.add('open');

    // after the flap opens we bring the card into view with a pop animation
    // use GSAP to keep it smooth and callback-based
    gsap.to(card, {
        duration: 0.8,
        display: 'block',
        opacity: 1,
        y: -50,
        rotateX: 0,
        ease: 'back.out(1.7)',
        onStart: () => {
            card.classList.add('show');
        }
    });
});

// --- card 3D rotation logic ---
function startDrag(e) {
    isDragging = true;
    lastY = e.clientY || e.touches[0].clientY;
    // prevent text selection / default touch behavior
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;
    const currentY = e.clientY || e.touches[0].clientY;
    const deltaY = currentY - lastY;
    lastY = currentY;
    rotationX += deltaY * 0.5; // sensitivity
    // constrain rotation to avoid flipping upside down completely
    if (rotationX > 360) rotationX -= 360;
    if (rotationX < -360) rotationX += 360;
    card.style.transform = `translate(-50%, 0) rotateX(${rotationX}deg)`;
    e.preventDefault();
}

function stopDrag() {
    isDragging = false;
}

// attach both mouse and touch event listeners
card.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

card.addEventListener('touchstart', startDrag, {passive:false});
document.addEventListener('touchmove', drag, {passive:false});
document.addEventListener('touchend', stopDrag);

// optional: reset rotation when double-clicked
card.addEventListener('dblclick', () => {
    rotationX = 0;
    card.style.transform = `translate(-50%, 0) rotateX(0deg)`;
});
