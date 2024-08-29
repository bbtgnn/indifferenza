const pixelPercentageThreshold = 0.04;
const colorDifferenceThreshold = 60;

const videoResizeScale = 10;

const debug = true;

const dotsColor = "white";
const dotsBackgroundColor = "black";

//

let video;
let previousFrame;

let totalPixels;

//

function setupMovementDetection() {
  pixelDensity(1);

  video = createCapture(VIDEO);
  const resizedWidth = width / videoResizeScale;
  const resizedHeight = height / videoResizeScale;
  video.size(resizedWidth, resizedHeight);
  video.hide();

  totalPixels = Math.round(resizedHeight * resizedWidth);

  previousFrame = createImage(video.width, video.height);
}

//

function detectMovementAndDrawDots() {
  let movingPixels = 0;

  video.loadPixels();
  previousFrame.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4;

      let pr = previousFrame.pixels[index + 0];
      let pg = previousFrame.pixels[index + 1];
      let pb = previousFrame.pixels[index + 2];

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      var diff = dist(r, g, b, pr, pg, pb);

      if (diff >= colorDifferenceThreshold) {
        movingPixels++;
      }

      // Debug view
      if (debug) {
        if (diff < colorDifferenceThreshold) {
          fill(dotsBackgroundColor);
        } else {
          fill(dotsColor);
        }
        noStroke();
        rect(
          x * videoResizeScale,
          y * videoResizeScale,
          videoResizeScale,
          videoResizeScale
        );
      }
    }
  }

  previousFrame.copy(
    video,
    0,
    0,
    video.width,
    video.height,
    0,
    0,
    video.width,
    video.height
  );

  return movingPixels / totalPixels > pixelPercentageThreshold;
}

// TODO - Implement
function updateMovementDetectionOnWindowResize() {}
