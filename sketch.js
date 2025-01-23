//i wonder if i'll get in trouble for ripping supermassive black hole off of youtube

let song, analyzer, fft;

function setup() {
  createCanvas(800, 800);
  iterations = int(prompt("How many frequencies do you want do display? (you are able to display extreme numbers, but the frequency cutoff of most songs appears around 600 iterations, so a number below or at 600 is best for visualization)"));
  song = loadSound("./audio/lotus-flower.mp3");
  song.loop();
  
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  
  analyzer.setInput(song);
  fft.setInput(song);
  
  rectMode(CENTER);
  angleMode(DEGREES);
  
  bar1 = createCheckbox("single multicolor bars", true);
  bar2 = createCheckbox("double white bars", false);
  bar3 = createCheckbox("red circle red bars", false);
  
}

function draw() {
  background(0);
  
  let samples = fft.analyze();
  let rms = analyzer.getLevel();
  
  let lineX = 0;
  strokeWeight(2);
  
  //the following lines make me extremely ashamed
  
  if (bar1.checked() ) {
    for (let i = 0; i < samples.length; i++) {
      stroke(lineX + 150, lineX - 255, lineX - 510);
      line(lineX - (800 / iterations), -2 * samples[i] + 700, lineX, -2 * samples[i] + 700);
      line(lineX, -2 * samples[i] + 700, lineX,  -2 * samples[i + 1] + 700);
      lineX += (800 / iterations);
    }
  }
  
  let barX = 0;
  if (bar2.checked()) {
    for(let i = -50; i < 51; i++) {
      fill(map(0, 1, 0, 255, samples[abs(i)]));
      stroke(0);
      rect(barX - 8, 400, 8, samples[abs(i)], 10, 10, 10, 10);
      barX += 8;
    }
  }
  
  if (bar3.checked()) {
    push();
    translate(400, 400);
    for (let i = -45; i < 45; i++) {
      noStroke();
      fill(1.5 * samples[abs(i)], 0, 0);
      rect(0, 100, 5, samples[abs(i)], 10, 10, 10, 10);
      rotate(-4);
      fill(2 * samples[abs(i)], 0, 0);
      circle(0, 0, 200);
    }
    pop();
  }
  
}
