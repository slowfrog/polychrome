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

pyc.COLS.LEGO = [{ name: "white",    col: "#ffffff", r:   0, g:   0, b:   0 },
                 { name: "obrown",   col: "#ff9734", r:   0, g: 104, b: 203 },
                 { name: "black",    col: "#101010", r: 239, g: 239, b: 239 },
                 { name: "lgray",    col: "#aeaeae", r:  81, g:  81, b:  81 },
                 { name: "red",      col: "#ca171a", r:  53, g: 232, b: 229 },
                 { name: "blue",     col: "#2036d9", r: 223, g: 201, b:  38 },
                 { name: "green" ,   col: "#23c43a", r: 220, g:  59, b: 197 },
                 //{ name: "bordeaux", col: "#802f3e", r: 127, g: 208, b: 193 },
                 { name: "lavender", col: "#a070b9", r:  95, g: 143, b:  70 },
                 { name: "beige",    col: "#d1be86", r:  46, g:  65, b: 121 },
                 { name: "gray",     col: "#757575", r: 138, g: 138, b: 138 },
                 { name: "dblue",    col: "#0a356f", r: 245, g: 202, b: 144 },
                 { name: "yellow",   col: "#fce909", r:   3, g:  22, b: 246 },
                 { name: "brown",    col: "#683f2a", r: 151, g: 192, b: 213 },
                 //{ name: "lgreen", col: "#b3dc52", r:  76, g:  35, b: 173 },
                 //{ name: "pink", col: "#ffbaf3", r:   0, g:  69, b:  12 }
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
  needed.innerHTML = "Sticker/bricks needed: computing...";
  var z = parseInt(document.getElementById("gsize").value);
  var zoom = parseFloat(document.getElementById("zoom").value);
  var palette = document.getElementById("palette").value;
  pyc.catalog.init(pyc.COLS[palette]);
  var cols = pyc.COLS[palette].slice(0); // Copy array
  var back = document.getElementById("back").value;
  var altback = back === "#ffffff" ? "#eeeeee" : "#222222";
  if (back === "#ffffff") {
    cols.push({name: "-none-", col: back, r: 0, g: 0, b: 0});
  } else if (back === "#000000") {
    cols.push({name: "-none-", col: back, r: 255, g: 255, b: 255});
  }
  var hex = document.getElementById("grid").value === "3";
  var lego = document.getElementById("grid").value === "L";
  var dither = document.getElementById("dither").value;
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
  tmp.height = Math.ceil(height / zoom) * (lego ? 3 : 1);
  var gfx = tmp.getContext("2d");
  var errordata = gfx.getImageData(0, 0, tmp.width, tmp.height);
  gfx.fillStyle = back;
  gfx.fillRect(0, 0, tmp.width, tmp.height);
  gfx.drawImage(img, 0, 0, width, height, 0, 0, tmp.width, tmp.height);

  var data;
  try {
    data = gfx.getImageData(0, 0, tmp.width, tmp.height).data;
  } catch (e) {
    // Probably a security error, let's stop
    console.log(e);
    pyc.conversion_running = false;
    return;
  }
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
  if (lego) {
    pyc.do_lego_conversion(tmp, data, cols, gx, z, back, altback, dither);
  } else {
    pyc.do_conversion(tmp, data, cols, gx, z, back, altback, hex);
  }
};

pyc.do_conversion = function(src, data, cols, gx, z, back, altback, hex) {
  var size = src.width * src.height;
  var used = {};
  pyc.do_conversion_chunk(src, data, cols, gx, z, used, size, 0, 100, back,
                          altback, hex);
};

pyc.do_lego_conversion = function(src, data, cols, gx, z, back, altback, dither) {
  var size = src.width * src.height;
  var used = {};
  var cat = pyc.CATALOG;
  var board = new pyc.board(src.width, src.height);
  pyc.do_lego_conversion_chunk(src, data, cols, gx, z, used, size, 0, 100, back,
                               altback, cat, board, dither);
};

pyc.do_conversion_chunk = function(src, data, cols, gx, z, used, size, start_t,
                                   end_t, back, altback, hex) {
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
  if (t == size) {
    pyc.finish_conversion(src, used, false, null);
  }

  // Launch the following conversion asynchronously
  setTimeout(function() {
    pyc.do_conversion_chunk(src, data, cols, gx, z, used, size, end_t,
			    end_t + end_t - start_t, back, altback, hex);
  }, 0);
};

pyc.do_lego_conversion_chunk = function(src, data, cols, gx, z, used, size,
					start_t, end_t, back, altback, cat,
					board, dither) {
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

    var conv = pyc.convert1(r, g, b, cols);
    gx.fillStyle = (i + j) % 2 === 0 ? back : altback;
    if (dither === "dumb") {
      var destidx;
      // Error propagation to the right (and bottom line at the end)
      if (t < size) {
        destidx = didx + 4;
        pyc.push_error(data, destidx, conv[1]);
        pyc.push_error(data, destidx + 1, conv[2]);
        pyc.push_error(data, destidx + 2, conv[3]);
      } 
    } else if (dither === "3pix") {
      // Error propagation inside the 3-brick 'pixel'
      if (j % 3 != 2) {
        destidx = didx + 4 * src.width;
        pyc.push_error(data, destidx, conv[1]);
        pyc.push_error(data, destidx + 1, conv[2]);
        pyc.push_error(data, destidx + 2, conv[3]);
      }
    } else if (dither === "down") {
      // Error propagation down
      if (j < src.height - 1) {
        destidx = didx + 4 * src.width;
        pyc.push_error(data, destidx, conv[1]);
        pyc.push_error(data, destidx + 1, conv[2]);
        pyc.push_error(data, destidx + 2, conv[3]);
      }
    } else if (dither === "southeast") {
      // Error propagation down and right
      if ((i < src.width - 1) && (j < src.height -1)) {
        var destidx_s = didx + 4 * src.width;
        var destidx_e = didx + 4;
        var err;
        err = pyc.push_error(data, destidx_s, conv[1] * 0.75);
        pyc.push_error(data, destidx_e, err + conv[1] * 0.25);
        err = pyc.push_error(data, destidx_s + 1, conv[2] * 0.75);
        pyc.push_error(data, destidx_e + 1, err + conv[2] * 0.25);
        err = pyc.push_error(data, destidx_s + 2, conv[3] * 0.75);
        pyc.push_error(data, destidx_e + 2, err + conv[3] * 0.25);
      }
    } else if (dither === "sse") {
      // Error propagation two pixels down and one right
      if ((i < src.width - 1) && (j < src.height -1)) {
        var destidx_s = didx + 4 * src.width;
        var destidx_ss = didx + 8 * src.width;
        var destidx_e = didx + 4;
        var err;
        err = pyc.push_error(data, destidx_s, conv[1] * 0.5);
        err = pyc.push_error(data, destidx_e, err + conv[1] * 0.25);
        pyc.push_error(data, destidx_ss, err + conv[1] * 0.25);
        err = pyc.push_error(data, destidx_s + 1, conv[2] * 0.5);
        err = pyc.push_error(data, destidx_e + 1, err + conv[2] * 0.25);
        pyc.push_error(data, destidx_ss + 1, err + conv[2] * 0.25);
        err = pyc.push_error(data, destidx_s + 2, conv[3] * 0.5);
        err = pyc.push_error(data, destidx_e + 2, err + conv[3] * 0.25);
        pyc.push_error(data, destidx_ss + 2, err + conv[3] * 0.25);
      }
    }

    var col = conv[0].col;
    var colname = conv[0].name;
    if (colname === "-none-") {
      continue;
    }
    if (used[col] === undefined) {
      used[col] = 0;
    }
    used[col] += 1;

    gx.fillStyle = col;
    // Rect
    gx.beginPath();
    cx = (i * 2 + 0.5);
    cy = (j * 2 / 3 + 0.5);
    var bdef = cat.by_props[pyc.prop_to_prop_id(1, 1, col)];
    board.put(i, j, bdef);
    gx.rect(z * cx + 0.5, z * cy + 0.5, z * 2, z * 2 / 3);
    gx.fill();
  }
  if (t == size) {
    pyc.finish_conversion(src, used, true, board);
  }

  // Launch the following conversion asynchronously
  setTimeout(function() {
    pyc.do_lego_conversion_chunk(src, data, cols, gx, z, used, size, end_t,
				 end_t + end_t - start_t, back, altback, cat,
				 board, dither);
  }, 0);
};

pyc.push_error = function(data, idx, error) {
  var newval = data[idx] + error;
  if (newval > 255) {
    data[idx] = 255;
    return newval - 255;
  } else if (newval < 0) {
    data[idx] = 0;
    return newval;
  } else {
    data[idx] = newval;
    return 0;
  }
}

pyc.finish_conversion = function(src, used, lego, board) {
  pyc.BOARD = board;
  pyc.conversion_running = false;
  var needed = document.getElementById("needed");
  var text = "";
  var total = 0;
  for (var k in used) {
    if (text.length > 0) {
      text += ", "
    }
    text += "<span style=\"font-size: 200%; color: " + k +
	    "\">\u25cf</span> " + used[k];
    total += used[k];
  }
  var unitprice = parseFloat(document.getElementById("price").value);
  var price = unitprice ? (", price: "+ unitprice * total) : "";
  needed.innerHTML = ("Stickers/bricks needed: " + text + "<br>"+
      "Total: " + total + price + ", Size: " + src.width + "x" + src.height);
  if (lego) {
      needed.innerHTML += (", actual size: " +
          (src.width * 0.8) + "cm x " +
          (src.height * 0.3) + "cm. Optimizing...");
    setTimeout(function() {
      pyc.BOARD.optimize();
      var stats = pyc.BOARD.stats();
      document.getElementById("needed").innerHTML += (
          "<br>Actual brick count: " + stats["count"] +
          ", price: " + (stats["price"] / 100) + "EUR<br>" +
          "EUR/pixel: " + (stats["price"] / (100 * pyc.BOARD.w * pyc.BOARD.h)));
      }, 0);
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

// Convert one color in RGB format to the closest color in the given palette
pyc.convert1 = function(r, g, b, cols) {
  var clen = cols.length;
  // Check if color is same as '-none-' to avoid using stickers in that case
  for (var c = 0; c < clen; ++c) {
    var col = cols[c];
    if ((col.name === "-none-") &&
        (r === (255 - col.r)) &&
        (g === (255 - col.g)) &&
        (b === (255 - col.b))) {
      return [col, 0, 0, 0];
    }
  }

  var ret = null;
  var mindist = 72 * 255;
  for (var a00 = 0; a00 < clen; ++a00) {
    var vr = 255 - cols[a00].r;
    var vg = 255 - cols[a00].g;
    var vb = 255 - cols[a00].b;
    var dist = 2 * Math.abs(vr - r) + 3 * Math.abs(vg - g) + Math.abs(vb - b);
    if ((dist < mindist) || ((dist === mindist) && (Math.random() < 0.5))) {
      mindist = dist;
      ret = [cols[a00], r - vr, g - vg, b - vb];
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
