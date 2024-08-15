document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate the total for each column
    function calculateColumnTotal(columnIndex) {
        let columnTotal = 0;
        document.querySelectorAll('tbody tr').forEach(row => {
            const cellValue = parseFloat(row.children[columnIndex].querySelector('input').value) || 0;
            columnTotal += cellValue;
        });
        return columnTotal;
    }

    // Function to calculate Total Sale
    function calculateTotalSale(row) {
        const card = parseFloat(row.querySelector('input[name="card"]').value) || 0;
        const cash = parseFloat(row.querySelector('input[name="cash"]').value) || 0;
        const deliveroo = parseFloat(row.querySelector('input[name="deliveroo"]').value) || 0;
        return card + cash + deliveroo;
    }

    // Event listeners for calculating column totals
    document.querySelectorAll('.calculateColumnTotal').forEach(button => {
        button.addEventListener('click', function () {
            const columnIndex = parseInt(this.getAttribute('data-column'));
            const columnTotal = calculateColumnTotal(columnIndex);
            this.nextElementSibling.textContent = `£${columnTotal.toFixed(2)}`;
        });
    });

    // Event listener for grand total button
    document.getElementById('calculateGrandTotal').addEventListener('click', function () {
        let grandTotal = 0;
        document.querySelectorAll('.columnTotal').forEach(total => {
            const value = parseFloat(total.textContent.replace('£', '')) || 0;
            grandTotal += value;
        });
        document.getElementById('grandTotal').textContent = `£${grandTotal.toFixed(2)}`;
    });

    // Event listener for automatically calculating Total Sale
    document.querySelectorAll('tbody tr').forEach(row => {
        row.querySelectorAll('input[name="card"], input[name="cash"], input[name="deliveroo"]').forEach(input => {
            input.addEventListener('input', function() {
                const totalSale = calculateTotalSale(row);
                row.querySelector('input[name="totalSale"]').value = totalSale.toFixed(2);
            });
        });
    });

    // Autofill date inputs
    document.querySelectorAll('input[name="date"]').forEach((input, index, dateInputs) => {
        input.addEventListener('input', function() {
            const startDate = new Date(this.value);
            for (let i = index; i < dateInputs.length; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + (i - index));
                dateInputs[i].value = date.toISOString().split('T')[0];
            }
        });
    });

    // Staff Wages button event listener
    document.getElementById('staffWagesBtn').addEventListener('click', function() {
        window.location.href = 'staffwages.html'; 
    });

    // Function to remove header and footer when printing and ensure content fits on one page
    function removePrintHeaderFooter() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'print';
        style.innerHTML = `
            @page {
                size: auto; /* Adjusts to the size of the content */
                margin: 0; /* Remove default margins */
            }
            body {
                margin: 0; /* Remove default body margin */
                padding: 0;
                overflow: visible; /* Ensure content isn't cut off */
            }
            .container {
                page-break-inside: avoid; /* Prevent page breaks inside the container */
            }
            table {
                width: 100%; /* Ensure table width fits the page */
                border-collapse: collapse; /* Collapse table borders */
            }
            td, th {
                border: 1px solid black; /* Optional: Add borders to ensure table cells are visible */
                padding: 4px; /* Optional: Adjust padding for readability */
            }
        `;
        document.head.appendChild(style);
    }

    // Call the function to apply print styles
    removePrintHeaderFooter();
});
