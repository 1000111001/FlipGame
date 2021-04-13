function Solver() {

}

function swap(a, b) {
    var t = a;
    a = b;
    b = t;
}

Solver.prototype.gauss = function(a, n, rows, cols) {
    var r = 0, c = 0;
    for (; r < rows && c < cols; ++r, ++c) {
        // 搜索主元
        var tr = r;
        for (var ir = r + 1; ir < rows; ++ir) {
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
            for (var k = 0; k < n; ++k) swap(a[r][k], a[tr][k]);
        }
        // 消元
        for (var ir = r + 1; ir < rows; ++ir) {
            if (a[ir][c]) {
                for (var ic = c; ic < n; ++ic) {
                    a[ir][ic] ^= a[r][ic];
                }
            }
        }
    }

    // 反向回代
    for (var ir = rows - 1; ir >= 0; --ir) {

    }

    return n - r;
}

Solver.prototype.solve = function (rows, cols, b) {
    // 构造增广矩阵
    var a = [];
    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols + 1; ++c) {
            
        }
        a[r][cols] = b[r];
    }
    var result = this.gauss(a, rows, rows, cols + 1);
}