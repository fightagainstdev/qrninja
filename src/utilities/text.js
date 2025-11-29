export const drawPixelTextInCanvas = (text, ctx, pixelSize, startX, startY, color = "black", size = 1) => {
    // 检测是否包含中文字符
    const hasChinese = /[一-龯]/.test(text);
    
    if (hasChinese) {
        // 中文使用现代字体渲染
        drawModernText(text, ctx, pixelSize, startX, startY, color, size);
    } else {
        // 英文保持像素字体
        const textPixelSize = pixelSize * size;
        const pixelText = convertTextToPixelArt(text);
        const halfWidthPixelTextSize = (pixelText[0].length * textPixelSize) / 2;
        const halfHeightPixelTextSize = (pixelText.length * textPixelSize) / 2;
        const textWidthStartPosition = (startX * pixelSize) - halfWidthPixelTextSize;
        const textHeightStartPosition = (startY * pixelSize) - halfHeightPixelTextSize;
        pixelText.forEach((row, y) => row.forEach((val, x) => {
            if (val) {
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.fillRect(
                    Math.round(textWidthStartPosition + (x * textPixelSize)),
                    Math.round(textHeightStartPosition + (y * textPixelSize)),
                    textPixelSize, textPixelSize);
            }
        }));
    }
}

const drawModernText = (text, ctx, pixelSize, startX, startY, color, size) => {
    // 保存当前上下文状态
    ctx.save();
    
    // 设置字体样式 - 使用更亮、更现代的字体
    const fontSize = Math.max(pixelSize * 3 * size, 16); // 至少16px确保清晰
    ctx.font = `${fontSize}px "Microsoft YaHei", "微软雅黑", "PingFang SC", "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 添加发光效果使文字更亮
    ctx.shadowColor = color;
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 绘制文字
    ctx.fillText(text, startX * pixelSize, startY * pixelSize);
    
    // 恢复上下文状态
    ctx.restore();
}

const convertTextToPixelArt = (text) => {
    const textLetters = text.toString().split('');
    let pixelText = [];
    space.forEach((val, pixelLetterHeight) => {
        let newPixelTextArray = [];
        textLetters.forEach((val, letterPos) => {
            letterPos > 0 && newPixelTextArray.push([false]);
            const currentPixelLetter = retrievePixelLetter(textLetters[letterPos]);
            newPixelTextArray.push(currentPixelLetter[pixelLetterHeight]);
        });
        pixelText.push(newPixelTextArray.flat());
    });
    return pixelText;
}

const retrievePixelLetter = (letter) => {
    // 支持中文字符
    switch (letter) {
        case '猫':
            return cat;
        case '武':
            return war;
        case '士':
            return shi;
        case '游':
            return you;
        case '戏':
            return xi;
        case '开':
            return kai;
        case '始':
            return shi2;
        case '完':
            return wan;
        case '成':
            return cheng;
        case '感':
            return gan;
        case '谢':
            return xie;
        case '新':
            return xin;
        case '纪':
            return ji;
        case '录':
            return lu;
        case '关':
            return guan;
        case '卡':
            return ka;
        case '最':
            return zui;
        case '高':
            return gao;
        case '（':
            return leftParenCN;
        case '）':
            return rightParenCN;
    }
    
    switch (letter.toLowerCase()) {
        case 'a':
            return a;
        case 'b':
            return b;
        case 'c':
            return c;
        case 'd':
            return d;
        case 'e':
            return e;
        case 'f':
            return f;
        case 'g':
            return g;
        case 'h':
            return h;
        case 'i':
            return i;
        case 'j':
            return j;
        case 'k':
            return k;
        case 'l':
            return l;
        case 'm':
            return m;
        case 'n':
            return n;
        case 'o':
            return o;
        case 'p':
            return p;
        case 'r':
            return r;
        case 's':
            return s;
        case 't':
            return t;
        case 'u':
            return u;
        case 'v':
            return v;
        case 'w':
            return w;
        case 'x':
            return x;
        case 'y':
            return y;
        case 'z':
            return z;

        case '!':
            return excl;
        case '+':
            return plus;
        case '/':
            return slash;
        case '(':
            return leftParen;
        case ')':
            return rightParen;
        case '-':
            return minus;
        case '<':
            return arrowLeft;
        case '>':
            return arrowRight;
        case '^':
            return arrowUp;
        case '~':
            return arrowDown;

        case '0':
            return zer;
        case '1':
            return one;
        case '2':
            return two;
        case '3':
            return thr;
        case '4':
            return fou;
        case '5':
            return fiv;
        case '6':
            return six;
        case '7':
            return sev;
        case '8':
            return eig;
        case '9':
            return nin;

        default:
            return space;
    }
};

const space = [
    [false],
    [false],
    [false],
    [false],
    [false]
];

const a = [
    [true, true, true],
    [true, false, true],
    [true, true, true],
    [true, false, true],
    [true, false, true]
];

const b = [
    [true, true, false],
    [true, false, true],
    [true, true, true],
    [true, false, true],
    [true, true, true]
];

const c = [
    [true, true, true],
    [true, false, false],
    [true, false, false],
    [true, false, false],
    [true, true, true]
];

const d = [
    [true, true, false],
    [true, false, true],
    [true, false, true],
    [true, false, true],
    [true, true, true]
];

const e = [
    [true, true, true],
    [true, false, false],
    [true, true, true],
    [true, false, false],
    [true, true, true]
];

const f = [
    [true, true, true],
    [true, false, false],
    [true, true, true],
    [true, false, false],
    [true, false, false]
];

const g = [
    [true, true, true],
    [true, false, false],
    [true, false, true],
    [true, false, true],
    [true, true, true]
];

const h = [
    [true, false, true],
    [true, false, true],
    [true, true, true],
    [true, false, true],
    [true, false, true]
];

const i = [
    [true],
    [true],
    [true],
    [true],
    [true]
];

const j = [
    [true, true, true],
    [false, false, true],
    [true, false, true],
    [true, false, true],
    [true, true, true]
];

const k = [
    [true, false, true],
    [true, false, true],
    [true, true, false],
    [true, false, true],
    [true, false, true]
];

const l = [
    [true, false, false],
    [true, false, false],
    [true, false, false],
    [true, false, false],
    [true, true, true]
];

const m = [
    [true, true, true, true, true],
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, false, true, false, true]
];

const n = [
    [true, true, true],
    [true, false, true],
    [true, false, true],
    [true, false, true],
    [true, false, true]
];

const o = [
    [true, true, true],
    [true, false, true],
    [true, false, true],
    [true, false, true],
    [true, true, true]
];

const p = [
    [true, true, true],
    [true, false, true],
    [true, true, true],
    [true, false, false],
    [true, false, false]
];

const r = [
    [true, true, true],
    [true, false, true],
    [true, true, false],
    [true, false, true],
    [true, false, true]
];

const s = [
    [false, true, true],
    [true, false, false],
    [true, true, true],
    [false, false, true],
    [true, true, false]
];

const t = [
    [true, true, true],
    [false, true, false],
    [false, true, false],
    [false, true, false],
    [false, true, false]
];

const u = [
    [true, false, true],
    [true, false, true],
    [true, false, true],
    [true, false, true],
    [true, true, true]
];

const v = [
    [true, false, true],
    [true, false, true],
    [true, false, true],
    [true, false, true],
    [false, true, false]
];

const w = [
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, false, true, false, true],
    [true, true, true, true, true]
];

const x = [
    [true, false, true],
    [true, true, true],
    [false, true, false],
    [true, true, true],
    [true, false, true]
];

const y = [
    [true, false, true],
    [true, false, true],
    [true, true, true],
    [false, true, false],
    [false, true, false]
];

const z = [
    [true, true, true],
    [false, false, true],
    [false, true, false],
    [true, false, false],
    [true, true, true]
];

const excl = [
    [true, true],
    [true, true],
    [true, false],
    [false, false],
    [true, false]
];

const plus = [
    [false, false, false],
    [false, true, false],
    [true, true, true],
    [false, true, false],
    [false, false, false]
];

const slash = [
    [false, true],
    [false, true],
    [true, true],
    [true, false],
    [true, false]
];

const minus = [
    [false, false],
    [false, false],
    [true, true],
    [false, false],
    [false, false]
];

const arrowDown = [
    [false, false, false],
    [false, false, false],
    [true, true, true],
    [false, true, false],
    [false, false, false]
];

const arrowUp = [
    [false, false, false],
    [false, true, false],
    [true, true, true],
    [false, false, false],
    [false, false, false]
];

const arrowLeft = [
    [false, false, false],
    [false, true, false],
    [true, true, false],
    [false, true, false],
    [false, false, false]
];

const arrowRight = [
    [false, false, false],
    [false, true, false],
    [false, true, true],
    [false, true, false],
    [false, false, false]
];

const leftParen = [
    [false, true],
    [true, false],
    [true, false],
    [true, false],
    [false, true]
];

const rightParen = [
    [true, false],
    [false, true],
    [false, true],
    [false, true],
    [true, false]
];

const zer = [
    [true, true, true],
    [true, false, true],
    [true, false, true],
    [true, false, true],
    [true, true, true]
];

const one = [
    [true],
    [true],
    [true],
    [true],
    [true]
];

const two = [
    [true, true, true],
    [false, false, true],
    [true, true, true],
    [true, false, false],
    [true, true, true]
];

const thr = [
    [true, true, true],
    [false, false, true],
    [true, true, true],
    [false, false, true],
    [true, true, true]
];

const fou = [
    [false, true, true],
    [true, false, true],
    [true, false, true],
    [true, true, true],
    [false, false, true]
];

const fiv = [
    [true, true, true],
    [true, false, false],
    [true, true, true],
    [false, false, true],
    [true, true, true]
];

const six = [
    [true, true, true],
    [true, false, false],
    [true, true, true],
    [true, false, true],
    [true, true, true]
];

const sev = [
    [true, true, true],
    [false, false, true],
    [false, true, true],
    [false, true, false],
    [false, true, false]
];

const eig = [
    [true, true, true],
    [true, false, true],
    [true, true, true],
    [true, false, true],
    [true, true, true]
];

const nin = [
    [true, true, true],
    [true, false, true],
    [true, true, true],
    [false, false, true],
    [true, true, true]
];

// 中文字符像素字体定义 (5x5)
const cat = [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [true, false, false, false, true],
    [true, false, false, false, true]
];

const war = [
    [true, true, true, true, false],
    [false, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
    [true, true, true, true, true]
];

const shi = [
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

const you = [
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [true, false, false, false, true],
    [true, false, false, false, true]
];

const xi = [
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false]
];

const kai = [
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [true, true, true, true, true]
];

const shi2 = [
    [true, true, true, true, false],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

const wan = [
    [true, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

const cheng = [
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

const gan = [
    [false, true, true, true, false],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, true, true, true, false]
];

const xie = [
    [true, false, false, true, false],
    [true, false, true, false, false],
    [true, true, false, false, false],
    [true, false, true, false, false],
    [true, false, false, true, false]
];

const xin = [
    [true, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

const ji = [
    [true, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [true, true, true, true, true]
];

const lu = [
    [true, true, true, true, false],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [true, true, true, true, false]
];

const guan = [
    [true, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

const ka = [
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

const zui = [
    [true, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

const gao = [
    [true, false, false, false, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [true, false, false, false, true],
    [true, false, false, false, true]
];

const leftParenCN = [
    [false, true, true, false, false],
    [true, false, false, true, false],
    [true, false, false, true, false],
    [true, false, false, true, false],
    [false, true, true, false, false]
];

const rightParenCN = [
    [false, false, true, true, false],
    [false, true, false, false, true],
    [false, true, false, false, true],
    [false, true, false, false, true],
    [false, false, true, true, false]
];