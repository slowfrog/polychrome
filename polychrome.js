var pyc = {};

pyc.start = function() {
  var z = parseInt(document.getElementById("gsize").value);
  var palette = document.getElementById("palette").value;
  var cols = pyc.COLS[palette];
  
  pyc.g = document.getElementById("viewport").getContext("2d");
  pyc.g.save();
  pyc.g.fillStyle = "#ffffff";
  pyc.g.fillRect(0, 0, 600, 800);

  var img = document.getElementById("image_in");
  var tmp = document.createElement("canvas");
  tmp.width = img.width;
  tmp.height = img.height;
  var gfx = tmp.getContext("2d");
  gfx.fillStyle = "#fff";
  gfx.fillRect(0, 0, tmp.width, tmp.height);
  gfx.drawImage(img, 0, 0);

  var data = gfx.getImageData(0, 0, tmp.width, tmp.height).data;
  var used = {};
  for (var i = 0; i < tmp.width; ++i) {
    if (i % 5 === 0) {
      pyc.g.save();
      pyc.g.beginPath();
      pyc.g.strokeStyle = "#ccc";
      pyc.g.moveTo(z * i * 2 + 0.5, 0.5);
      pyc.g.lineTo(z * i * 2 + 0.5, z * tmp.height * 2 + 0.5);
      pyc.g.closePath();
      pyc.g.stroke();
      pyc.g.restore();
    }
    
    for (var j = 0; j < tmp.height; ++j) {
      if ((i === 0) && (j % 5 === 0)) {
        pyc.g.save();
        pyc.g.beginPath();
        pyc.g.strokeStyle = "#ccc";
        pyc.g.moveTo(0.5, z * j * 2 + 0.5);
        pyc.g.lineTo(z * tmp.width * 2 + 0.5, z * j * 2 + 0.5);
        pyc.g.closePath();
        pyc.g.stroke();
        pyc.g.restore();
      }
      
      var didx = 4 * (j * tmp.width + i);
      var r = data[didx];
      var g = data[didx + 1];
      var b = data[didx + 2];
      var a = data[didx + 3];

      var conv = pyc.convert(r, g, b, cols);
      pyc.g.fillStyle = (i + j) % 2 === 0 ? "#ffffff" : "#eeeeee";
      pyc.g.fillRect(z * i * 2 + 0.5, z * j * 2 + 0.5, z * 2, z * 2);
      
      for (var e = 0; e < 4; ++e) {
        var de = Math.floor(e / 2);
        var col = (e < conv.length ? conv[e].col : "#000000");
        var colname = conv[e].name;
        if (col === "#fff") {
          continue;
        }
        if (used[colname] === undefined) {
          used[colname] = 1;
        } else {
          ++used[colname];
        }
        pyc.g.fillStyle = col;
        // Discs
        pyc.g.beginPath();
        pyc.g.arc(z * (i * 2 + (e % 2) + 0.5), z * (j * 2 + de + 0.5), z / 2, 0, Math.PI * 2, true);
        pyc.g.fill();
      }
    }
  }
  pyc.g.restore();
  var total = 0;
  var max = 0;
  for (var k in used) {
    console.log(k + ": " + used[k]);
    total += used[k];
    max = Math.max(max, used[k]);
  }
  console.log("Total: " + total);
  console.log("You need " + Math.ceil(max / 88) + " packs");
};

pyc.COLS = {};
pyc.COLS.CMYRGBW = [{ col: "#ff0", r: 0, g: 0, b: 255 },
                    { col: "#0ff", r: 255, g: 0, b: 0 },
                    { col: "#f0f", r: 0, g: 255, b: 0 },
                    { col: "#f00", r: 0, g: 255, b: 255 },
                    { col: "#0f0", r: 255, g: 0, b: 255 },
                    { col: "#00f", r: 255, g: 255, b: 0 },
                    { col: "#fff", r: 0, g: 0, b: 0 }];

pyc.COLS.YRGBW = [{ col: "#ff0", r: 0, g: 0, b: 255 },
                  { col: "#f00", r: 0, g: 255, b: 255 },
                  { col: "#0f0", r: 255, g: 0, b: 255 },
                  { col: "#00f", r: 255, g: 255, b: 0 },
                  { col: "#fff", r: 0, g: 0, b: 0 }];

pyc.COLS.CMYW = [{ col: "#ff0", r: 0, g: 0, b: 255 },
                 { col: "#0ff", r: 255, g: 0, b: 0 },
                 { col: "#f0f", r: 0, g: 255, b: 0 },
                 { col: "#fff", r: 0, g: 0, b: 0 }];

pyc.COLS.RGBW = [ { col: "#f00", r: 0, g: 255, b: 255 },
                  { col: "#0f0", r: 255, g: 0, b: 255 },
                  { col: "#00f", r: 255, g: 255, b: 0 },
                  { col: "#fff", r: 0, g: 0, b: 0 }];

pyc.COLS.GOM4 = [{ name: "yellow", col: "#ee0", r: 16, g: 16, b: 255 },
                 { name: "red",    col: "#c00", r: 48, g: 255, b: 255 },
                 { name: "green",  col: "#080", r: 255, g: 127, b: 255 },
                 { name: "blue",   col: "#09f", r: 255, g: 111, b: 0 },
                 { name: "-none-", col: "#fff", r: 0, g: 0, b: 0 }];

pyc.COLS.GOM7 = [{ name: "blue",   col: "#09f", r: 255, g: 111, b: 0 },
                 { name: "yellow", col: "#ee0", r: 16, g: 16, b: 255 },
                 { name: "orange", col: "#d92", r: 40, g:204, b: 216 },
                 { name: "pink",   col: "#e08", r: 24, g: 255, b: 120 },
                 { name: "green",  col: "#080", r: 255, g: 127, b: 255 },
                 { name: "violet", col: "#408", r: 184, g: 255, b: 120 },
                 { name: "red",    col: "#c00", r: 48, g: 255, b: 255 },
                 { name: "-none-", col: "#fff", r: 0, g: 0, b: 0 }
                ];

pyc.convert = function(r, g, b, cols) {
  var ret = [];
  var clen = cols.length;
  var mindist = 72 * 255;
  for (var a00 = 0; a00 < clen; ++a00) {
    for (var a10 = 0; a10 < clen; ++a10) {
      for (var a01 = 0; a01 < clen; ++a01) {
        for (var a11 = 0; a11 < clen; ++a11) {
          var vr = 1020 - (cols[a00].r + cols[a10].r + cols[a01].r + cols[a11].r);
          var vg = 1020 - (cols[a00].g + cols[a10].g + cols[a01].g + cols[a11].g);
          var vb = 1020 - (cols[a00].b + cols[a10].b + cols[a01].b + cols[a11].b);
          var dist = 2 * Math.abs(vr - r * 4) + 3 * Math.abs(vg - g * 4) + Math.abs(vb - b * 4);
          if ((dist < mindist) || ((dist === mindist) && (Math.random() < 0.5))) {
            mindist = dist;
            ret = [ cols[a00], cols[a10], cols[a01], cols[a11] ];
          }
        }
      }
    }
  }
  return ret;
};

pyc.refresh = function() {
  var input = document.getElementById("source_image")
  var value = input.value;
  var image = document.getElementById("image_in");
  if (!image.onload) {
    image.onload = pyc.start;
  }
  image.src = value;
};

window.onload = pyc.start;
