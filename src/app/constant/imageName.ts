export const imageName = ():number => {
    const digits = new Set<number>();

    while (digits.size < 3) {
        const digit = Math.floor(Math.random() * 10);
        if (digits.size === 0 && digit === 0) continue; 
        digits.add(digit);
    }

    return Number([...digits].join(""));
}

