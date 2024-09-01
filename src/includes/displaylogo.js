function getTerminalWidth() {
    return process.stdout.columns || 80;
}
function centerText(text, terminalWidth) {
    const totalPadding = terminalWidth - text.length;
    const padding = Math.floor(totalPadding / 2);
    return ' '.repeat(padding) + text;
}
function formatAndCenterOptions(options, columns, columnSpacing, prefix) {
    const terminalWidth = getTerminalWidth();
    let formattedOptions = [];


    const prefixedOptions = options.map(option => prefix + option);

    for (let i = 0; i < prefixedOptions.length; i += columns) {

        let row = prefixedOptions.slice(i, i + columns).map(opt => opt.padEnd(10)).join(' '.repeat(columnSpacing));
        formattedOptions.push(centerText(row, terminalWidth));
    }

    return formattedOptions;
}
function getColorFromGradient(index, total, startColor, endColor) {

    const midpoint = Math.floor(total / 2);
    return (index < midpoint) ? `\x1b[38;5;${startColor}m` : `\x1b[38;5;${endColor}m`;
}

function displayIt() {
    const terminalWidth = getTerminalWidth();
    const startColor = 196;
    const endColor = 124;
    const lines = [
        "   ▄████████  ▄██████▄     ▄████████",
        "  ███    ███ ███    ███   ███    ███",
        "  ███    ███ ███    ███   ███    █▀ ",
        "  ███    ███ ███    ███  ▄███▄▄▄    ",
        "▀███████████ ███    ███ ▀▀███▀▀▀    ",
        "  ███    ███ ███    ███   ███       ",
        "  ███    ███ ███    ███   ███       ",
        "  ███    █▀   ▀██████▀    ███       ",
        " ",
        "All For One v1.0"
    ];
    console.clear()
    lines.forEach((line, index) => { const color = getColorFromGradient(index, lines.length - 1, startColor, endColor); console.log(color + centerText(line, terminalWidth)) });
    const columnSpacing = 50;
    

}

module.exports = {
    displayIt
}