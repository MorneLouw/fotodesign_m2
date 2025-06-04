
function addShape() {
    const container = document.getElementById('shapeContainer');
    const div = document.createElement('div');
    div.innerHTML = `
        <select class="shape">
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="triangle">Triangle</option>
            <option value="cylinder">Cylinder</option>
        </select>
        <input type="number" placeholder="Dimension 1 (mm)" class="dim1">
        <input type="number" placeholder="Dimension 2 (mm)" class="dim2">
        <input type="number" placeholder="Height (mm)" class="height">
        <input type="number" placeholder="Quantity" class="qty" value="1">
    `;
    container.appendChild(div);
}

document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let totalM2 = 0;
    const shapes = document.querySelectorAll('#shapeContainer > div');
    shapes.forEach(s => {
        const shape = s.querySelector('.shape').value;
        const d1 = parseFloat(s.querySelector('.dim1').value) || 0;
        const d2 = parseFloat(s.querySelector('.dim2').value) || 0;
        const h = parseFloat(s.querySelector('.height').value) || 0;
        const qty = parseInt(s.querySelector('.qty').value) || 1;
        let area = 0;

        if (shape === 'rectangle') area = (d1 * d2) / 1_000_000;
        if (shape === 'circle') area = (Math.PI * Math.pow((d1 / 2), 2)) / 1_000_000;
        if (shape === 'triangle') area = (0.5 * d1 * d2) / 1_000_000;
        if (shape === 'cylinder') area = (2 * Math.PI * (d1 / 2) * ((d1 / 2) + h)) / 1_000_000;

        totalM2 += area * qty;
    });

    const details = {
        customer: document.getElementById('customerName').value,
        contact: document.getElementById('contactNumber').value,
        email: document.getElementById('emailAddress').value,
        job: document.getElementById('jobNumber').value,
        notes: document.getElementById('notes').value,
        completedBy: document.getElementById('completedBy').value,
        totalM2: totalM2.toFixed(2)
    };

    const body = Object.entries(details).map(([k, v]) => `${k}: ${v}`).join('\n');
    window.location.href = `mailto:sales@fotodesign.co.za?subject=New Surface Area Job&body=${encodeURIComponent(body)}`;
});
