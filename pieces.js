"use strict";

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

pyc.brick_def = function(id, w, h, color, design_id, brick_id, color_name, price) {
  this.id = id;
  this.w = w;
  this.h = h;
  this.color = color;
  this.design_id = design_id;
  this.brick_id = brick_id;
  this.color_name = color_name;
  this.price = price;
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

pyc.catalog.prototype.register = function(w, h, color, color_name, design_id, brick_id, price) {
  var real_design_id = design_id || pyc.prop_to_design_id(w, h);
  var real_brick_id = brick_id || pyc.prop_to_brick_id(w, h, color);
  var prop_id = pyc.prop_to_prop_id(w, h, color);
  var id = this.next_id;
  this.next_id += 1;
  var def = new pyc.brick_def(id, w, h, color, real_design_id, real_brick_id, color_name, price);
  this.by_props[prop_id] = def;
  this.by_brick_id[real_brick_id] = def;
  this.by_id[id] = def;
};

pyc.catalog.init = function() {
  var catalog = new pyc.catalog();
  for (var ci = 0; ci < pyc.COLS.LEGO.length; ++ci) {
    var color = pyc.COLS.LEGO[ci].col;
    var color_name = pyc.COLS.LEGO[ci].name;
    catalog.register(8, 3, color, color_name, "3008", null, 19); // 0.79 / px
    catalog.register(6, 3, color, color_name, "3009", null, 19); // 1.06
    catalog.register(4, 3, color, color_name, "3010", null, 15); // 1.25
    catalog.register(3, 3, color, color_name, "3622", null, 15); // 1.67
    catalog.register(2, 3, color, color_name, "3004", null, 11); // 1.83
    catalog.register(1, 3, color, color_name, "3005", null,  8); // 2.67
    catalog.register(8, 1, color, color_name, "3460", null, 15); // 1.87
    catalog.register(6, 1, color, color_name, "3666", null, 11); // 1.83
    catalog.register(4, 1, color, color_name, "3710", null,  8); // 2.00
    catalog.register(3, 1, color, color_name, "3623", null,  8); // 2.67
    catalog.register(2, 1, color, color_name, "3023", null,  8); // 4.00
    catalog.register(1, 1, color, color_name, "3024", null,  8); // 8.00
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

pyc.board.prototype.optimize = function() {
  this.try_size(8, 3);
  this.try_size(6, 3);
  this.try_size(4, 3);
  this.try_size(3, 3);
  this.try_size(2, 3);
  this.try_size(6, 1);  
  this.try_size(8, 1);
  this.try_size(4, 1); 
  this.try_size(1, 3);
  this.try_size(3, 1);
  this.try_size(2, 1);
  this.try_size(1, 1);
};

pyc.board.prototype.stats = function() {
  var stats = {};
  var price = 0;
  var count = 0;
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
        count += 1;
        price += brick.def.price;
      }
    }
  }
  stats["count"] = count;
  stats["price"] = price;
  return stats;
};
