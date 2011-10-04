"use strict";
var pyc = {};

// All known color palettes
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

pyc.COLS.GOM4 = [{ name: "yellow", col: "#ee0", r:  17, g:  17, b: 255 },
                 { name: "red",    col: "#c00", r:  51, g: 255, b: 255 },
                 { name: "green",  col: "#080", r: 255, g: 119, b: 255 },
                 { name: "blue",   col: "#09f", r: 255, g: 102, b:   0 },
                 { name: "-none-", col: "#fff", r:   0, g:   0, b:   0 }];

pyc.COLS.GOM7 = [{ name: "blue",   col: "#09f", r: 255, g: 102, b:   0 },
                 { name: "yellow", col: "#ee0", r:  17, g:  17, b: 255 },
                 { name: "orange", col: "#d92", r:  34, g: 102, b: 221 },
                 { name: "pink",   col: "#e08", r:  17, g: 255, b: 119 },
                 { name: "green",  col: "#080", r: 255, g: 119, b: 255 },
                 { name: "violet", col: "#408", r: 187, g: 255, b: 119 },
                 { name: "red",    col: "#c00", r:  51, g: 255, b: 255 },
                 { name: "-none-", col: "#fff", r:   0, g:   0, b:   0 }
                ];

pyc.convert_image = function() {
  var z = parseInt(document.getElementById("gsize").value);
  var zoom = parseInt(document.getElementById("zoom").value);
  var palette = document.getElementById("palette").value;
  var cols = pyc.COLS[palette];

  var viewport = document.getElementById("viewport");
  var img = document.getElementById("image_in");
  var width = img.width;
  var height = img.height;
  viewport.width = Math.ceil(width / zoom) * z * 2;
  viewport.height = Math.ceil(height / zoom) * z * 2;
  var gx = viewport.getContext("2d");
  gx.save();
  gx.fillStyle = "#ffffff";
  gx.fillRect(0, 0, width * z * 2, height * z * 2);

  var tmp = document.createElement("canvas");
  tmp.width = Math.ceil(width / zoom);
  tmp.height = Math.ceil(height / zoom);
  var gfx = tmp.getContext("2d");
  gfx.fillStyle = "#fff";
  gfx.fillRect(0, 0, tmp.width, tmp.height);
  gfx.drawImage(img, 0, 0, width, height, 0, 0, tmp.width, tmp.height);

  var data = gfx.getImageData(0, 0, tmp.width, tmp.height).data;
  for (var i = 0; i < tmp.width; ++i) {
    if (i % 5 === 0) {
      gx.save();
      gx.beginPath();
      gx.strokeStyle = "#ccc";
      gx.moveTo(z * i * 2 + 0.5, 0.5);
      gx.lineTo(z * i * 2 + 0.5, z * tmp.height * 2 + 0.5);
      gx.closePath();
      gx.stroke();
      gx.restore();
    }
    
    for (var j = 0; j < tmp.height; ++j) {
      if ((i === 0) && (j % 5 === 0)) {
        gx.save();
        gx.beginPath();
        gx.strokeStyle = "#ccc";
        gx.moveTo(0.5, z * j * 2 + 0.5);
        gx.lineTo(z * tmp.width * 2 + 0.5, z * j * 2 + 0.5);
        gx.closePath();
        gx.stroke();
        gx.restore();
      }
    }
  }
  pyc.do_conversion(tmp, data, cols, gx, z);
};


pyc.do_conversion = function(src, data, cols, gx, z) {
  var size = src.width * src.height;
  pyc.do_conversion_chunk(src, data, cols, gx, z, size, 0, 100);
};

pyc.do_conversion_chunk = function(src, data, cols, gx, z, size, start_t, end_t) {
  var t;
  var max_t = Math.min(size, end_t);
  for (t = start_t; t < max_t; ++t) {
    var j = Math.floor(t / src.width);
    var i = t - j * src.width;
    var didx = 4 * t;
    var r = data[didx];
    var g = data[didx + 1];
    var b = data[didx + 2];
    var a = data[didx + 3];
    
    var conv = pyc.convert(r, g, b, cols);
    gx.fillStyle = (i + j) % 2 === 0 ? "#ffffff" : "#eeeeee";
    gx.fillRect(z * i * 2 + 0.5, z * j * 2 + 0.5, z * 2, z * 2);
    
    for (var e = 0; e < 4; ++e) {
      var de = Math.floor(e / 2);
      var col = (e < conv.length ? conv[e].col : "#000000");
      var colname = conv[e].name;
      if (col === "#fff") {
        continue;
      }
      gx.fillStyle = col;
      // Discs
      gx.beginPath();
      gx.arc(z * (i * 2 + (e % 2) + 0.5), z * (j * 2 + de + 0.5), z / 2, 0, Math.PI * 2, true);
      gx.fill();
    }
  }
  if (t < size) {
    // Launch the following conversion asynchronously
    setTimeout(function() {
        pyc.do_conversion_chunk(src, data, cols, gx, z, size, end_t, end_t + end_t - start_t);
      }, 0);
  }
};


// Convert one color in RGB format to a set of at most four colors from the given palette
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
  pyc.change_image(value);
}

pyc.change_image = function(img_src) {
  var image = document.getElementById("image_in");
  if (!image.onload) {
    image.onload = pyc.convert_image;
  }
  image.src = img_src;
};

pyc.upload = function() {
  var files = document.getElementById("upload").files;
  if (files.length !== 1) {
    alert("Shoud have uploaded exactly one file.");
    return;
  }
  var reader = new FileReader();
  reader.onload = function(f) {
    pyc.change_image(reader.result);
  };
  reader.readAsDataURL(files[0]);
};


pyc.start = function() {
  //document.getElementById("upload").addEventListener("change", pyc.upload);
  pyc.convert_image();
};

window.onload = pyc.start;
