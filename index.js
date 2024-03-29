var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"),
  requestAnimation;

function defineWay(x, y) {
  if (y > 0 || y === 0) {
    return Math.acos(x);
  } else return 2 * Math.PI - Math.acos(x);
}
function radiansToDegrees(rad) {
  return rad / (Math.PI / 180);
}

var square = {
  name: "Square #1",
  demension: "2D",
  coordinates: [
    [200, 0],
    [0, 0],
    [0, 200],
    [200, 200],
  ],
  connecting: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  vertexes: 4,
};

var strange = {
  name: "strange",
  demension: "2D",
  coordinates: [
    [600, 100],
    [400, 100],
    [400, 0],
    [0, 0],
    [0, 200],
    [100, 200],
    [100, 600],
    [300, 600],
    [300, 500],
    [400, 500],
    [400, 400],
    [600, 400],
  ],
  connecting: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  vertexes: 12,
};

var triangle = {
  name: "triangle",
  demension: "2D",
  coordinates: [
    [200, 200],
    [100, 0],
    [0, 200],
  ],
  connecting: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  vertexes: 3,
};

var house = {
  name: "house",
  demension: "2D",
  coordinates: [
    [300, 200],
    [200, 0],
    [100, 200],
    [100, 400],
    [300, 400],
  ],
  connecting: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  vertexes: 5,
};

var strange2 = {
  name: "strange",
  demension: "2D",
  coordinates: [
    [1100, 0],
    [900, 0],
    [900, 200],
    [800, 200],
    [800, 0],
    [200, 0],
    [200, 300],
    [0, 300],
    [0, 600],
    [400, 600],
    [400, 500],
    [300, 500],
    [300, 400],
    [400, 400],
    [400, 300],
    [700, 300],
    [700, 600],
    [1100, 600],
  ],
  connecting: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  vertexes: 18,
};

function center(figure) {
  if (figure.demension === "2D") {
    var x_center = 0;
    var y_center = 0;
    var center = [];

    for (var i = 0; i < figure.vertexes; i++) {
      x_center += figure.coordinates[i][0];
      y_center += figure.coordinates[i][1];
    }

    x_center = x_center / figure.vertexes;
    y_center = y_center / figure.vertexes;

    center[0] = x_center;
    center[1] = y_center;

    return center;
  }
}
var circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};
function distance2D(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function drawFigure(figure, x, y) {
  ctx.beginPath();
  ctx.moveTo(figure.coordinates[0][0] + x, figure.coordinates[0][1] + y);
  for (var i = 1; i < figure.vertexes; i++) {
    ctx.lineTo(figure.coordinates[i][0] + x, figure.coordinates[i][1] + y);
  }

  ctx.lineTo(figure.coordinates[0][0] + x, figure.coordinates[0][1] + y);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "black";
}

function drawPoints(figure, x, y) {
  ctx.beginPath();
  for (var i = 0; i < figure.vertexes; i++) {
    ctx.fillRect(
      figure.coordinates[i][0] + x,
      figure.coordinates[i][1] + y,
      10,
      10
    );
  }
  ctx.stroke();
}

function drawCircles(figure, x, y) {
  for (var i = 0; i < figure.vertexes; i++) {
    ctx.beginPath();
    ctx.arc(
      center(figure)[0] + x,
      center(figure)[1] + y,
      distance2D(
        center(figure)[0] + x,
        center(figure)[1] + y,
        figure.coordinates[i][0] + x,
        figure.coordinates[i][1] + y
      ),
      0,
      2 * Math.PI,
      false
    );
    ctx.stroke();
  }
}

function reCenter(x0, y0, r, x1, y1) {
  var localCenter = [];
  localCenter[0] = (x1 - x0) / r;
  localCenter[1] = (-1 * (y1 - y0)) / r;
  return localCenter;
}

function reCenterBack(x0, y0, r, local1, local2) {
  var globalCenter = [];
  globalCenter[0] = local1 * r + x0;
  globalCenter[1] = -1 * local2 * r + y0;

  return globalCenter;
}

function powerfulDefineStrange(x, y) {
  return radiansToDegrees(
    defineWay(
      reCenter(300, 300, distance2D(x, y, 300, 300), x, y)[0],
      reCenter(300, 300, distance2D(x, y, 300, 300), x, y)[1]
    )
  );
}

function powerfulDefine(figure, x, y) {
  return radiansToDegrees(
    defineWay(
      reCenter(
        center(figure)[0],
        center(figure)[1],
        distance2D(x, y, center(figure)[0], center(figure)[1]),
        x,
        y
      )[0],
      reCenter(
        center(figure)[0],
        center(figure)[1],
        distance2D(x, y, center(figure)[0], center(figure)[1]),
        x,
        y
      )[1]
    )
  );
}

function rotateFigure(figure) {
  var figureCenterX = center(figure)[0];
  var figureCenterY = center(figure)[1];

  var degreesArray = [];
  if (degreesArray.length === 0) {
    for (var i = 0; i < figure.vertexes; i++) {
      degreesArray[i] =
        (Math.PI / 180) *
        powerfulDefine(
          figure,
          figure.coordinates[i][0],
          figure.coordinates[i][1]
        );
    }
  }

  for (var i = 0; i < figure.vertexes; i++) {
    var distance = distance2D(
      figureCenterX,
      figureCenterY,
      figure.coordinates[i][0],
      figure.coordinates[i][1]
    );
    Math.round(
      (figure.coordinates[i][0] = Math.cos(
        degreesArray[i] + (n * Math.PI) / 10
      ))
    );
    Math.round(
      (figure.coordinates[i][1] = Math.sin(
        degreesArray[i] + (n * Math.PI) / 10
      ))
    );

    Math.round(
      (figure.coordinates[i][0] = reCenterBack(
        figureCenterX,
        figureCenterY,
        distance,
        figure.coordinates[i][0],
        figure.coordinates[i][1]
      )[0])
    );
    Math.round(
      (figure.coordinates[i][1] = reCenterBack(
        figureCenterX,
        figureCenterY,
        distance,
        figure.coordinates[i][0],
        figure.coordinates[i][1]
      )[1])
    );

    //stage.push([figure.coordinates[i][0],figure.coordinates[i][1]]);
  }
  //calculated.push(stage);
  ctx.clearRect(0, 0, 5000, 5000);
  if (document.getElementById("points").checked === true) {
    drawPoints(figure, 500, 500);
  }
  if (document.getElementById("fig").checked === true) {
    drawFigure(figure, 500, 500);
  }
  if (document.getElementById("circles").checked === true) {
    drawCircles(figure, 500, 500);
  }
  n = -0.01;
}

function figureDegrees(figure) {
  var degreesArray = [];

  for (var i = 0; i < figure.vertexes; i++) {
    degreesArray[i] =
      (Math.PI / 180) *
      powerfulDefine(
        figure,
        figure.coordinates[i][0],
        figure.coordinates[i][1]
      );
  }

  return degreesArray;
}

function take() {
  n = document.getElementById("takefrom").value;
}

function rotateChosen() {
  document.getElementById("name").className = "hide";
  document.getElementById("takefrom").className = "hide";
  document.getElementById("turn").className = "hide";

  if (document.getElementById("name").value === "square") {
    rotateFigure(square);
  }
  if (document.getElementById("name").value === "triangle") {
    rotateFigure(triangle);
  }
  if (document.getElementById("name").value === "house") {
    rotateFigure(house);
  }
  if (document.getElementById("name").value === "strange") {
    rotateFigure(strange);
  }
  if (document.getElementById("name").value === "strange2") {
    rotateFigure(strange2);
  }
}

setInterval(take, 16);
