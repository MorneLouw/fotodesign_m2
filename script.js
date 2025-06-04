
function addShapeEntry() {
    const container = document.getElementById('shape-entries');
    const entry = document.createElement('div');
    entry.classList.add('shape-entry');

    const html = `
        <select onchange="updateLabels(this); updateTotal()">
            <option value="rectangle">Rectangle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
            <option value="circle">Circle</option>
            <option value="cube">Cube (one face)</option>
            <option value="cylinder_solid">Cylinder (Solid Side)</option>
            <option value="cylinder_hollow">Cylinder (Hollow with Ends)</option>
            <option value="angle_iron">Angle Iron</option>
        </select>
        <label>Dimension 1 (mm): <input type="number" onchange="updateTotal()"></label>
        <label>Dimension 2 (mm): <input type="number" onchange="updateTotal()"></label>
        <label>Quantity: <input type="number" value="1" onchange="updateTotal()"></label>
        <label>Side Type: 
            <select onchange="updateTotal()">
                <option value="1">Single Sided</option>
                <option value="2">Double Sided</option>
            </select>
        </label>
        <p>m²: <span class="result">0</span></p>
    `;

    entry.innerHTML = html;
    container.appendChild(entry);
    updateLabels(entry.querySelector('select'));
}

function updateLabels(selectElement) {
    const shape = selectElement.value;
    const labels = selectElement.parentElement.querySelectorAll("label");

    switch (shape) {
        case 'rectangle':
            labels[0].innerHTML = 'Length (mm): <input type="number" onchange="updateTotal()">';
            labels[1].innerHTML = 'Width (mm): <input type="number" onchange="updateTotal()">';
            break;
        case 'square':
            labels[0].innerHTML = 'Side Length (mm): <input type="number" onchange="updateTotal()">';
            labels[1].innerHTML = 'N/A: <input type="number" disabled>';
            break;
        case 'triangle':
            labels[0].innerHTML = 'Base (mm): <input type="number" onchange="updateTotal()">';
            labels[1].innerHTML = 'Height (mm): <input type="number" onchange="updateTotal()">';
            break;
        case 'circle':
            labels[0].innerHTML = 'Diameter (mm): <input type="number" onchange="updateTotal()">';
            labels[1].innerHTML = 'N/A: <input type="number" disabled>';
            break;
        case 'cube':
            labels[0].innerHTML = 'Edge Length (mm): <input type="number" onchange="updateTotal()">';
            labels[1].innerHTML = 'N/A: <input type="number" disabled>';
            break;
        case 'cylinder_solid':
            labels[0].innerHTML = 'Diameter (mm): <input type="number" onchange="updateTotal()">';
            labels[1].innerHTML = 'Height (mm): <input type="number" onchange="updateTotal()">';
            break;
        case 'cylinder_hollow':
            labels[0].innerHTML = 'Diameter (mm): <input type="number" onchange="updateTotal()">';
            labels[1].innerHTML = 'Height (mm): <input type="number" onchange="updateTotal()">';
            break;
        case 'angle_iron':
            labels[0].innerHTML = 'Leg Length (mm): <input type="number" onchange="updateTotal()">';
            labels[1].innerHTML = 'Width (mm): <input type="number" onchange="updateTotal()">';
            break;
    }
}

function updateTotal() {
    const entries = document.querySelectorAll('.shape-entry');
    let grandTotal = 0;

    entries.forEach(entry => {
        const shape = entry.querySelectorAll('select')[0].value;
        const inputs = entry.querySelectorAll('input');
        const dim1 = parseFloat(inputs[0].value) || 0;
        const dim2 = parseFloat(inputs[1].disabled ? "0" : inputs[1].value) || 0;
        const qty = parseInt(inputs[2].value) || 1;
        const sides = parseInt(entry.querySelectorAll('select')[1].value);
        let m2 = 0;

        switch (shape) {
            case 'rectangle':
                m2 = (dim1 / 1000) * (dim2 / 1000);
                break;
            case 'square':
                m2 = Math.pow((dim1 / 1000), 2);
                break;
            case 'triangle':
                m2 = 0.5 * (dim1 / 1000) * (dim2 / 1000);
                break;
            case 'circle':
                m2 = Math.PI * Math.pow((dim1 / 2000), 2);
                break;
            case 'cube':
                m2 = Math.pow((dim1 / 1000), 2);  // One face
                break;
            case 'cylinder_solid':
                m2 = Math.PI * (dim1 / 1000) * (dim2 / 1000);
                break;
            case 'cylinder_hollow':
                const side = Math.PI * (dim1 / 1000) * (dim2 / 1000);
                const ends = 2 * Math.PI * Math.pow((dim1 / 2000), 2);
                m2 = side + ends;
                break;
            case 'angle_iron':
                m2 = 2 * (dim1 / 1000) * (dim2 / 1000);
                break;
        }

        m2 *= qty * sides;
        entry.querySelector('.result').textContent = m2.toFixed(2);
        grandTotal += m2;
    });

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}
