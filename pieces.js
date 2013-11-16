"use strict";

pyc.COLORS = ["#ffffff",
		      "#ff9734",
		      "#101010",
		      "#aeaeae",
		      "#ca171a",
		      "#2036d9",
              "#23c43a",
		      //"#802f3e",
		      "#a070b9",
		      "#d1be86",
		      "#757575",
		      "#0a356f",
		      "#fce909",
		      "#683f2a",
		      //"#b3dc52",
		      //"#ffbaf3",
             ];
pyc.WIDTHS = [1, 2, 3, 4, 6, 8];
pyc.HEIGHTS = [1, 3];


pyc.prop_to_design_id = function(w, h) {
  return "" + w + "-" + h;
};

pyc.prop_to_prop_id = function(w, h, color) {
  return "" + w + "-" + h + "-" + color;
};

pyc.prop_to_brick_id = function(w, h, color) {
  return pyc.prop_to_design_id(w, h) + "-" + color;
};

pyc.brick_def = function(id, w, h, color, design_id, brick_id) {
  this.id = id;
  this.w = w;
  this.h = h;
  this.color = color;
  this.design_id = design_id;
  this.brick_id = brick_id;
};

pyc.brick_def.prototype.prop_id = function() {
  return pyc.prop_to_prop_id(this.w, this.h, this.color);
};

pyc.brick = function(def, x0, y0) {
  this.def = def;
  this.x0 = x0;
  this.y0 = y0;
};

pyc.brick.prototype.prop_id = function() {
  return this.def.prop_id();
};

pyc.catalog = function() {
  this.by_props = {};
  this.by_brick_id = {};
  this.by_id = [];
  this.next_id = 1;
};

pyc.catalog.prototype.register = function(w, h, color, design_id, brick_id) {
  var real_design_id = design_id || pyc.prop_to_design_id(w, h);
  var real_brick_id = brick_id || pyc.prop_to_brick_id(w, h, color);
  var prop_id = pyc.prop_to_prop_id(w, h, color);
  var id = this.next_id;
  this.next_id += 1;
  var def = new pyc.brick_def(id, w, h, color, real_design_id, real_brick_id);
  this.by_props[prop_id] = def;
  this.by_brick_id[real_brick_id] = def;
  this.by_id[id] = def;
};

pyc.catalog.init = function() {
  var catalog = new pyc.catalog();
  for (var ci = 0; ci < pyc.COLORS.length; ++ci) {
    for (var wi = 0; wi < pyc.WIDTHS.length; ++wi) {
      for (var hi = 0; hi < pyc.HEIGHTS.length; ++hi) {
        catalog.register(pyc.WIDTHS[wi], pyc.HEIGHTS[hi], pyc.COLORS[ci]);
      }
    }
  }
  pyc.CATALOG = catalog;
  return catalog;
};

pyc.board = function(w, h) {
  this.w = w;
  this.h = h;
  this.b = [];
  for (var y = 0; y < h; ++y) {
    var row = [];
    for (var x = 0; x < w; ++x) {
      row.push(null);
    }
    this.b.push(row);
  }
};

pyc.board.prototype.put = function(x, y, def) {
  var brick = new pyc.brick(def, x, y);
  for (var xi = x; xi < x + def.w; ++xi) {
    for (var yi = y; yi < y + def.h; ++yi) {
      this.b[yi][xi] = brick;
    }
  }
};

pyc.board.prototype.get_brick = function(x, y) {
  return this.b[y][x];
};

pyc.board.prototype.get_def = function(x, y) {
  return this.b[y][x].def;
};

pyc.board.prototype.get_color = function(x, y) {
  return this.b[y][x].def.color;
};

pyc.board.prototype.try_size = function(w, h) {
  for (var x = 0; x <= this.w - w; ++x) {
    for (var y = 0; y <= this.h - h; ++y) {
      var color = this.get_color(x, y);
      var all_same = true;
      for (var xi = 0; all_same && (xi < w); ++xi) {
        for (var yi = (xi > 0) ? 0 : 1; all_same && (yi < h); ++yi) {
          all_same = all_same && (color == this.get_color(x + xi, y + yi));
        }
      }
      if (all_same) {
        this.maybe_replace(x, y, pyc.CATALOG.by_props[pyc.prop_to_prop_id(w, h, color)]);
      }
    }
  }
};

pyc.board.prototype.maybe_replace = function(x, y, def) {
  // If a brick of the same or a greater size is already on some position, don't actually replace
  // TODO: consider price instead of size
  var size = def.w * def.h;
  for (var xi = x; xi < x + def.w; ++xi) {
    for (var yi = y; yi < y + def.h; ++yi) {
      var prev_def = this.get_def(xi, yi);
      if (prev_def.w * prev_def.h >= size) {
        return;
      }
    }
  }
  this.replace(x, y, def);
};

pyc.board.prototype.replace = function(x, y, def) {
  var def11 = pyc.CATALOG.by_props[pyc.prop_to_prop_id(1, 1, def.color)];
  for (var xi = x; xi < x + def.w; ++xi) {
    for (var yi = y; yi < y + def.h; ++yi) {
      var prev_brick = this.get_brick(xi, yi);
      for (var bxi = 0; bxi < prev_brick.def.w; ++bxi) {
        for (var byi = 0; byi < prev_brick.def.h; ++byi) {
          if ((prev_brick.x0 + bxi < x) ||
              (prev_brick.x0 + bxi >= x + def.w) ||
              (prev_brick.y0 + byi < y) ||
              (prev_brick.y0 + byi >= y + def.h)) {
            this.put(prev_brick.x0 + bxi, prev_brick.y0 + byi, def11);
          }
        }
      }
    }
  }
  this.put(x, y, def);
};

pyc.board.prototype.stats = function() {
  var stats = {};
  for (var x = 0; x < this.w; ++x) {
    for (var y = 0; y < this.h; ++y) {
      var brick = this.get_brick(x, y);
      if ((brick.x0 == x) && (brick.y0 == y)) {
        var prop_id = brick.prop_id();
        if (prop_id in stats) {
          stats[prop_id] += 1;
        } else {
          stats[prop_id] = 1;
        }
      }
    }
  }
  return stats;
};
