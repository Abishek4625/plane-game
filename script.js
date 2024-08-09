// Get the plane element
const plane = document.getElementById('plane');

// Set initial position
let planeX = window.innerWidth / 2 - plane.offsetWidth / 2;
let planeY = window.innerHeight / 2 - plane.offsetHeight / 2;

plane.style.left = `${planeX}px`;
plane.style.top = `${planeY}px`;

// Event listener for key presses
document.addEventListener('keydown', (event) => {
    const step = 10; // Distance the plane moves with each key press

    switch (event.key) {
        case 'ArrowUp':
            if (planeY > 0) planeY -= step;
            break;
        case 'ArrowDown':
            if (planeY < window.innerHeight - plane.offsetHeight) planeY += step;
            break;
        case 'ArrowLeft':
            if (planeX > 0) planeX -= step;
            break;
        case 'ArrowRight':
            if (planeX < window.innerWidth - plane.offsetWidth) planeX += step;
            break;
    }

    plane.style.left = `${planeX}px`;
    plane.style.top = `${planeY}px`;
});

// Generate clouds
function createCloud() {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';

    // Random initial position
    cloud.style.top = `${Math.random() * (window.innerHeight - 60)}px`;
    cloud.style.left = `${window.innerWidth}px`;

    document.getElementById('gameArea').appendChild(cloud);

    moveCloud(cloud);
}

// Move clouds across the screen
function moveCloud(cloud) {
    const cloudSpeed = 2; // Speed of cloud movement

    function updateCloudPosition() {
        const cloudX = parseFloat(cloud.style.left);

        if (cloudX + cloud.offsetWidth < 0) {
            cloud.remove(); // Remove the cloud when it goes off-screen
        } else {
            cloud.style.left = `${cloudX - cloudSpeed}px`;

            // Check for collision
            if (checkCollision(cloud)) {
                alert("Game Over!");
                window.location.reload(); // Restart the game
            } else {
                requestAnimationFrame(updateCloudPosition);
            }
        }
    }

    requestAnimationFrame(updateCloudPosition);
}

// Check for collision between the plane and a cloud
function checkCollision(cloud) {
    const planeRect = plane.getBoundingClientRect();
    const cloudRect = cloud.getBoundingClientRect();

    return !(
        planeRect.top > cloudRect.bottom ||
        planeRect.bottom < cloudRect.top ||
        planeRect.left > cloudRect.right ||
        planeRect.right < cloudRect.left
    );
}

// Generate a new cloud every 2 seconds
setInterval(createCloud, 2000);
