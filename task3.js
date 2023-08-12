function multiline(strings) {
  const rows = strings.raw[0].split("\n");
    console.log(rows)
  const result = rows.map((row, index) => {
    const rowNumber = (index + 1).toString();
    return `${rowNumber} ${row}`;
  });

  return result.join("\n");
}

const code = multiline`
function add(a, b) {
  return a + b;
}
123
fd
df
df
d`;

console.log(code);
