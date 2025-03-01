"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageName = void 0;
const imageName = () => {
    const digits = new Set();
    while (digits.size < 3) {
        const digit = Math.floor(Math.random() * 10);
        if (digits.size === 0 && digit === 0)
            continue;
        digits.add(digit);
    }
    return Number([...digits].join(""));
};
exports.imageName = imageName;
