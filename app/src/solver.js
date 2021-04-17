function Solver() {

}

Solver.prototype.gauss = function(a, rows, cols) {
    var r = 0, c = 0;
    for (; r < rows && c < cols; ++r, ++c) {
        // 搜索主元
        var tr = r;
        for (var ir = r; ir < rows; ++ir) {
            if (a[ir][c]) {
                tr = ir;
                break;
            }
        }
        // 自由变元行
        if (a[tr][c] == 0) {
            r--;
            continue;
        }
        // I型初等行变换
        if (tr != r) {
            // for (var k = 0; k < cols; ++k) swap(a[r][k], a[tr][k]);
            [a[r], a[tr]] = [a[tr], a[r]];
        }
        // 消元
        for (var ir = r + 1; ir < rows; ++ir) {
            if (a[ir][c]) {
                for (var ic = c; ic < cols; ++ic) {
                    a[ir][ic] ^= a[r][ic];
                }
            }
        }
    }
    if (DEBUG) {
        for (var r = 0; r < rows; ++r) {
            console.log(a[r].join(","));
        }
    }
    // 反向回代
    var equations = rows;
    var x = new Array(equations);
    for (var ir = rows - 1; ir >= 0; --ir) {
        x[ir] = a[ir][cols - 1];
        for (var ic = ir + 1; ic < equations; ++ic) {
            if (a[ir][ic]) x[ir] ^= x[ic];
        }
    }
    return x;
}

/* samples of augmented matrix
  1   1   1   0 | x11
  1   1   0   1 | x12
  1   0   1   1 | x21
  0   1   1   1 | x22

  1   1   0   1   0   0   0   0   0 | x11
  1   1   1   0   1   0   0   0   0 | x12
  0   1   1   0   0   1   0   0   0 | x13
  1   0   0   1   1   0   1   0   0 | x21
  0   1   0   1   1   1   0   1   0 | x22
  0   0   1   0   1   1   0   0   1 | x23
  0   0   0   1   0   0   1   1   0 | x31
  0   0   0   0   1   0   1   1   1 | x32
  0   0   0   0   0   1   0   1   1 | x33
*/

Solver.prototype.solve = function (n, b) {
    // 构造增广矩阵
    var rows = n * n;
    var cols = rows + 1;
    var a = new Array(rows);
    for (var r = 0; r < rows; ++r) {
        a[r] = new Array(cols).fill(0);
        a[r][r] = 1;
        var i = Math.floor(r / n), j = r % n;
        if (i > 0) a[r][r - n] = 1;     // (i - 1) * n + j
        if (i < n - 1) a[r][r + n] = 1; // (i + 1) * n + j
        if (j > 0) a[r][r - 1] = 1;     // i * n + (j - 1)
        if (j < n - 1) a[r][r + 1] = 1; // i * n + (j + 1)
        a[r][cols - 1] = b[r];
    }
    if (DEBUG) {
        for (var r = 0; r < rows; ++r) {
            console.log(a[r].join(","));
        }
        console.log("");
    }
    var result = this.gauss(a, rows, cols);
    for (var i = 0; i < result.length; i += n) {
        var rr = result.slice(i, i + n);
        console.log(rr.join(","));
    }
    return result;
}