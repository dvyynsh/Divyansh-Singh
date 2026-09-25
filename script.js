const canvas = document.getElementById("scroll-canvas");
const context = canvas.getContext("2d");

// There are 27 frames according to the unzipped directory
const frameCount = 260;

// Function to get the path of a specific frame
const currentFrame = index => (
  `./video-frames-new/frame_${(index + 1).toString().padStart(5, '0')}.jpg`
);

const images = [];
let imagesLoaded = 0;

// Preload all images and setup canvas once the first image is loaded
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    
    if (i === 0) {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        };
    }
    
    images.push(img);
}

// Function to update the canvas with the image at a specific index
const updateImage = index => {
    if (images[index] && images[index].complete) {
        context.drawImage(images[index], 0, 0);
    }
};

// Listen to the scroll event
window.addEventListener('scroll', () => {
    // Get the current scroll position
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    
    // Calculate the maximum possible scroll top value
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    
    // Calculate the percentage of scroll progress
    const scrollFraction = maxScrollTop === 0 ? 0 : scrollTop / maxScrollTop;
    
    // Determine the current frame based on the scroll fraction
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );
    
    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => updateImage(frameIndex));
});
