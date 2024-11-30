const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.90;
  setInterval(drawClock, 1000);

  function drawClock() {
    drawFace(ctx, radius);
    drawTicks(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }

  function drawFace(ctx, radius) {
    const grad = ctx.createRadialGradient(0, 0, radius * 0.9, 0, 0, radius * 1.1);
    grad.addColorStop(0, '#ffe6f0');
    grad.addColorStop(1, '#ffb6c1');
    ctx.fillStyle = grad;
    
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = '#ff85a2';
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.fillStyle = '#ff85a2';
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, 15);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fill();
  }

  function drawTicks(ctx, radius) {
    for (let i = 0; i < 60; i++) {
      let angle = i * Math.PI / 30;
      ctx.rotate(angle);
      ctx.translate(0, -radius * 0.9);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, i % 5 === 0 ? 10 : 5);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffb6c1';
      ctx.stroke();
      ctx.translate(0, radius * 0.9);
      ctx.rotate(-angle);
    }
  }

  function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = '#ff85a2';
    for (let num = 1; num < 13; num++) {
      let ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.75);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.75);
      ctx.rotate(-ang);
    }
  }

  function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds() + now.getMilliseconds() / 1000;

    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
           (minute * Math.PI / (6 * 60)) +
           (second * Math.PI / (360 * 60));
    ctx.strokeStyle = '#ff85a2';
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);

    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    ctx.strokeStyle = '#ffadc9';
    drawHand(ctx, minute, radius * 0.8, radius * 0.05);

    second = (second * Math.PI / 30);
    ctx.strokeStyle = '#ff6f91';
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
  }

  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }