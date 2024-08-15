function calculateTotals() {
    // Calculate totals for each column and update the footer cells
    const expensesTotal = calculateColumnTotal('expenses');
    const tipTotal = calculateColumnTotal('tip');
    const bankTotal = calculateColumnTotal('bank');
    const cashTotal = calculateColumnTotal('cash');

    // Display the totals in the respective footer cells
    document.getElementById('expenses-total').textContent = expensesTotal.toFixed(2);
    document.getElementById('tip-total').textContent = tipTotal.toFixed(2);
    document.getElementById('bank-total').textContent = bankTotal.toFixed(2);
    document.getElementById('cash-total').textContent = cashTotal.toFixed(2);
}

function calculateGrandTotal() {
    // First, calculate and display individual column totals
    calculateTotals();

    // Get the total of each column from the footer
    const expensesTotal = parseFloat(document.getElementById('expenses-total').textContent) || 0;
    const tipTotal = parseFloat(document.getElementById('tip-total').textContent) || 0;
    const bankTotal = parseFloat(document.getElementById('bank-total').textContent) || 0;
    const cashTotal = parseFloat(document.getElementById('cash-total').textContent) || 0;

    // Calculate the grand total of all columns
    const grandTotal = expensesTotal + tipTotal + bankTotal + cashTotal;

    // Display the grand total in the designated cell in the footer
    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}

function calculateColumnTotal(type) {
    // Find all input elements that match the provided type and calculate the total
    const cells = document.querySelectorAll(`.input-cell[data-type='${type}']`);
    let total = 0;
    cells.forEach(cell => {
        const value = parseFloat(cell.value) || 0;
        total += value;
    });
    return total;
}

// Function to remove header and footer when printing
function removePrintHeaderFooter() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.innerHTML = `
        @page {
            margin: 0;
        }
        body {
            margin: 1cm;
        }
    `;
    document.head.appendChild(style);
}

// Call the function to remove print header and footer
removePrintHeaderFooter();
