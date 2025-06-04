
function addShapeEntry() {
    const container = document.getElementById('shape-entries');
    const entry = document.createElement('div');
    entry.classList.add('shape-entry');

    const html = `
        <select onchange="updateTotal()">
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="triangle">Triangle</option>
        </select>
        <input type="number" placeholder="Dimension 1 (mm)" onchange="updateTotal()">
        <input type="number" placeholder="Dimension 2 (mm)" onchange="updateTotal()">
        <input type="number" placeholder="Quantity" value="1" onchange="updateTotal()">
        <select onchange="updateTotal()">
            <option value="1">Single Sided</option>
            <option value="2">Double Sided</option>
        </select>
        <p>m²: <span class="result">0</span></p>
    `;

    entry.innerHTML = html;
    container.appendChild(entry);
}

function updateTotal() {
    const entries = document.querySelectorAll('.shape-entry');
    let grandTotal = 0;

    entries.forEach(entry => {
        const shape = entry.querySelector('select').value;
        const dim1 = parseFloat(entry.querySelectorAll('input')[0].value) || 0;
        const dim2 = parseFloat(entry.querySelectorAll('input')[1].value) || 0;
        const qty = parseInt(entry.querySelectorAll('input')[2].value) || 1;
        const sides = parseInt(entry.querySelectorAll('select')[1].value);
        let m2 = 0;

        switch (shape) {
            case 'rectangle':
                m2 = (dim1 / 1000) * (dim2 / 1000);
                break;
            case 'circle':
                m2 = Math.PI * Math.pow((dim1 / 2000), 2);
                break;
            case 'triangle':
                m2 = 0.5 * (dim1 / 1000) * (dim2 / 1000);
                break;
        }

        m2 *= qty * sides;
        entry.querySelector('.result').textContent = m2.toFixed(2);
        grandTotal += m2;
    });

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}
