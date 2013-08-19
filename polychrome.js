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
                 { name: "blue",   col: "#09f", r: 255, g: 102, b:   0 }];

pyc.COLS.GOM5 = [{ name: "blue",   col: "#09f", r: 255, g: 102, b:   0 },
                 { name: "yellow", col: "#ee0", r:  17, g:  17, b: 255 },
                 { name: "green",  col: "#080", r: 255, g: 119, b: 255 },
                 { name: "black",  col: "#000", r: 255, g: 255, b: 255 },
                 { name: "red",    col: "#c00", r:  51, g: 255, b: 255 }
                ];

pyc.COLS.RUBIKS = [{ name: "blue",   col: "#003373", r: 255, g: 204, b: 140 },
                   { name: "red",    col: "#8c000f", r: 115, g: 255, b: 240 },
                   { name: "yellow", col: "#ffd200", r:   0, g:  45, b: 255 },
                   { name: "green",  col: "#00732f", r: 255, g: 140, b: 208 },
                   { name: "orange", col: "#ff4600", r:   0, g: 185, b: 255 },
                   { name: "white",  col: "#ffffff", r:   0, g:   0, b:   0 }
                  ];

pyc.COLS.GOM6 = [{ name: "blue",   col: "#09f", r: 255, g: 102, b:   0 },
                 { name: "yellow", col: "#ee0", r:  17, g:  17, b: 255 },
                 { name: "green",  col: "#080", r: 255, g: 119, b: 255 },
                 { name: "black",  col: "#000", r: 255, g: 255, b: 255 },
                 { name: "red",    col: "#c00", r:  51, g: 255, b: 255 },
                 { name: "white",  col: "#fff", r:   0, g:   0, b:   0 }
                ];

pyc.COLS.GOM7 = [{ name: "blue",   col: "#09f", r: 255, g: 102, b:   0 },
                 { name: "yellow", col: "#ee0", r:  17, g:  17, b: 255 },
                 { name: "orange", col: "#d92", r:  34, g: 102, b: 221 },
                 { name: "pink",   col: "#e08", r:  17, g: 255, b: 119 },
                 { name: "green",  col: "#080", r: 255, g: 119, b: 255 },
                 { name: "violet", col: "#408", r: 187, g: 255, b: 119 },
                 { name: "red",    col: "#c00", r:  51, g: 255, b: 255 }
                ];

pyc.COLS.GOM8 = [{ name: "blue",   col: "#09f", r: 255, g: 102, b:   0 },
                 { name: "yellow", col: "#ee0", r:  17, g:  17, b: 255 },
                 { name: "orange", col: "#d92", r:  34, g: 102, b: 221 },
                 { name: "pink",   col: "#e08", r:  17, g: 255, b: 119 },
                 { name: "green",  col: "#080", r: 255, g: 119, b: 255 },
                 { name: "violet", col: "#408", r: 187, g: 255, b: 119 },
                 { name: "red",    col: "#c00", r:  51, g: 255, b: 255 },
                 { name: "white",  col: "#fff", r:   0, g:   0, b:   0 }
                ];

pyc.conversion_running = false;
pyc.stop_conversion = false;

pyc.Y_FACTOR = Math.sqrt(3) / 2;

pyc.convert_image = function() {
  if (pyc.conversion_running) {
    pyc.stop_conversion = true;
    // Retry in one second, once the current conversion has been stopped
    setTimeout(pyc.convert_image, 1000);
    return;
  }
  pyc.conversion_running = true;
  var needed = document.getElementById("needed");
  needed.innerHTML = "Sticker needed: computing...";
  
  var z = parseInt(document.getElementById("gsize").value);
  var zoom = parseFloat(document.getElementById("zoom").value);
  var palette = document.getElementById("palette").value;
  var cols = pyc.COLS[palette].slice(0); // Copy array
  var back = document.getElementById("back").value;
  var altback = back === "#ffffff" ? "#eeeeee" : "#222222";
  if (back === "#ffffff") {
    cols.push({name: "-none-", col: back, r: 0, g: 0, b: 0});
  } else {
    cols.push({name: "-none-", col: back, r: 255, g: 255, b: 255});
  }
  var hex = document.getElementById("grid").value === "3";

  var viewport = document.getElementById("viewport");
  var img = document.getElementById("image_in");
  var width = img.width;
  var height = img.height;
  img.style.backgroundColor = back;
  viewport.width = (1 + Math.ceil(width / zoom)) * z * (hex ? 1.5 : 2);
  viewport.height = (1 + Math.ceil(height / zoom)) * z * 2 * (hex ? pyc.Y_FACTOR : 1);
  var gx = viewport.getContext("2d");
  gx.save();
  gx.fillStyle = back;
  gx.fillRect(0, 0, width * z * 2, height * z * 2);

  var tmp = document.createElement("canvas");
  tmp.width = Math.ceil(width / zoom);
  tmp.height = Math.ceil(height / zoom);
  var gfx = tmp.getContext("2d");
  gfx.fillStyle = back;
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
  pyc.do_conversion(tmp, data, cols, gx, z, back, altback, hex);
};


pyc.do_conversion = function(src, data, cols, gx, z, back, altback, hex) {
  var size = src.width * src.height;
  var used = {};
  pyc.do_conversion_chunk(src, data, cols, gx, z, used, size, 0, 100, back, altback, hex);
};

pyc.do_conversion_chunk = function(src, data, cols, gx, z, used, size, start_t, end_t, back,
                                   altback, hex) {
  if (pyc.stop_conversion) {
    pyc.stop_conversion = false;
    pyc.conversion_running = false;
    return;
  }
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
    var cx, cy;
    
    var conv = hex ? pyc.convert3(r, g, b, cols) : pyc.convert(r, g, b, cols);
    gx.fillStyle = (i + j) % 2 === 0 ? back : altback;
    if (!hex) {
      gx.fillRect(z * i * 2 + 0.5, z * j * 2 + 0.5, z * 2, z * 2);
    }
    
    for (var e = 0; e < conv.length; ++e) {
      var de = Math.floor(e / 2);
      var col = (e < conv.length ? conv[e].col : "#000000");
      var colname = conv[e].name;
      if (colname === "-none-") {
        continue;
      }
      if (used[col] === undefined) {
        used[col] = 0;
      }
      used[col] += 1;
      
      gx.fillStyle = col;
      // Discs
      gx.beginPath();
      if (hex) {
        if (i % 2 === 0) {
          if (e < 2) {
            cx = i * 1.5 + e + 0.5;
            cy = j * 2 * pyc.Y_FACTOR + 0.5;
          } else {
            cx = i * 1.5 + e - 2 + 1;
            cy = j * 2 * pyc.Y_FACTOR + 0.5 + pyc.Y_FACTOR;
          }
          
        } else {
          if (e < 1) {
            cx = i * 1.5 + e + 1;
            cy = j * 2 * pyc.Y_FACTOR + 0.5;
          } else {
            cx = i * 1.5 + e - 1 + 0.5;
            cy = j * 2 * pyc.Y_FACTOR + 0.5 + pyc.Y_FACTOR;
          }
        }
        
      } else {
        cx = (i * 2 + (e % 2) + 0.5);
        cy = (j * 2 + de + 0.5);
      }
      gx.arc(z * cx, z * cy, z / 2, 0, Math.PI * 2, true);
      gx.fill();
    }
  }
  if (t < size) {
    // Launch the following conversion asynchronously
    setTimeout(function() {
      pyc.do_conversion_chunk(src, data, cols, gx, z, used, size, end_t, end_t + end_t - start_t,
                              back, altback, hex);
      }, 0);
  } else {
    pyc.conversion_running = false;
    var needed = document.getElementById("needed");
    var text = "";
    var total = 0;
    for (var k in used) {
      if (text.length > 0) {
        text += ", "
      }
      text += "<span style=\"font-size: 200%; color: " + k + "\">\u25cf</span> " + used[k];
      total += used[k];
    }
    var unitprice = parseFloat(document.getElementById("price").value);
    var price = unitprice ? (", price: "+ unitprice * total) : "";
    needed.innerHTML = ("Stickers needed: " + text + "<br>"+
                        "Total: " + total + price + ", Size: " + src.width + "x" + src.height);
  }
};


// Convert one color in RGB format to a set of at most four colors from the given palette
pyc.convert = function(r, g, b, cols) {
  var clen = cols.length;
  // Check if color is same as '-none-' to avoid using stickers in that case
  for (var c = 0; c < clen; ++c) {
    var col = cols[c];
    if ((col.name === "-none-") &&
        (r === (255 - col.r)) &&
        (g === (255 - col.g)) &&
        (b === (255 - col.b))) {
      return [col, col, col, col];
    }
  }
  
  var ret = [];
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

// Convert one color in RGB format to a set of at most three colors from the given palette
pyc.convert3 = function(r, g, b, cols) {
  var clen = cols.length;
  // Check if color is same as '-none-' to avoid using stickers in that case
  for (var c = 0; c < clen; ++c) {
    var col = cols[c];
    if ((col.name === "-none-") &&
        (r === (255 - col.r)) &&
        (g === (255 - col.g)) &&
        (b === (255 - col.b))) {
      return [col, col, col, col];
    }
  }
  
  var ret = [];
  var mindist = 72 * 255;
  for (var a00 = 0; a00 < clen; ++a00) {
    for (var a10 = 0; a10 < clen; ++a10) {
      for (var a01 = 0; a01 < clen; ++a01) {
        var vr = 765 - (cols[a00].r + cols[a10].r + cols[a01].r);
        var vg = 765 - (cols[a00].g + cols[a10].g + cols[a01].g);
        var vb = 765 - (cols[a00].b + cols[a10].b + cols[a01].b);
        var dist = 2 * Math.abs(vr - r * 3) + 3 * Math.abs(vg - g * 3) + Math.abs(vb - b * 3);
        if ((dist < mindist) || ((dist === mindist) && (Math.random() < 0.5))) {
          mindist = dist;
          ret = [ cols[a00], cols[a10], cols[a01] ];
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
  if (!files) {
    alert("Sorry! I am not able to read the uploaded file from your browser!");
    return;
  }
  if (files.length !== 1) {
    alert("Shoud have uploaded exactly one file.");
    return;
  }
  if ((window["FileReader"] === undefined) ||
      (typeof FileReader !== "function")) {
    alert("Sorry! No FileReader available on your browser!");
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
