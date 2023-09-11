/* The `Number.prototype.format` function is a custom method added to the `Number` prototype in
JavaScript. It allows you to format a number with a specified number of decimal places, thousands
separator, and decimal separator. */
Number.prototype.format = function (decimalPlaces, thousandsSeparator, decimalSeparator) {
    console.warn(decimalPlaces, thousandsSeparator, decimalSeparator)
    // Check for optional arguments and set defaults
    decimalPlaces = typeof decimalPlaces !== 'undefined' ? decimalPlaces : 2;
    thousandsSeparator = thousandsSeparator || ',';
    decimalSeparator = decimalSeparator || '.';

    // Round the number to the specified decimal places
    const roundedNumber = Number.parseFloat(this).toFixed(decimalPlaces);

    // Split the number into integer and decimal parts
    const parts = roundedNumber.toString().split('.');

    // Add thousands separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    // Join the integer and decimal parts with the decimal separator
    return parts.join(decimalSeparator);
};

/* The NumberAnimator class is a JavaScript class that animates a number from a start value to an end
value. */
// Example usage:
// const numberElement = document.getElementById('numberElement'); // Replace with the actual element
// const startValue = 0;
// const endValue = 1000;
// const animationDuration = 1000;
// const numberAnimator = new NumberAnimator(numberElement, endValue, startValue, animationDuration);
// numberAnimator.animate()
class NumberAnimator {
    constructor(element, end, start = 0, duration = 1000) {
        this.element = element;
        this.end = end;
        this.start = start;
        this.duration = duration;
        this.startTime = null;
        // this.animate();
    }

    setNumber(val){
        this.end = val
    }

    animate() {
        const updateNumber = (timestamp) => {
            if (!this.startTime) this.startTime = timestamp;
            const progress = (timestamp - this.startTime) / this.duration;

            if (progress < 1) {
                const value = Math.round(this.start + (this.end - this.start) * progress);
                this.element.textContent = value.toLocaleString(); // Format the number with commas
                requestAnimationFrame(updateNumber);
            } else {
                this.element.textContent = this.end.toLocaleString();
            }
        };

        requestAnimationFrame(updateNumber);
    }
}

// Function to format a number with thousands separators
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Add keyup event listener to format the input with thousands separators
document.querySelectorAll('.input-number-format').forEach(function(input) {
    input.addEventListener('keyup', function() {
        this.value = this.value.replace(/\D/g, '');
        let n = parseInt(this.value.replace(/\D/g, ''), 10);
        if (n) {
            this.value = formatNumberWithCommas(n);
        }
    });
            // Add blur event listener to format the input as a number with thousands separators
    input.addEventListener('blur', function() {
        this.value = this.value ? formatNumberWithCommas(parseFloat(this.value.replace(/,/g, '')).format()) : '';
    });
});

// Add input event listener to allow only numbers and a single decimal point
document.querySelectorAll('.input-number').forEach(function(input) {
    input.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9.]/g, '');
    });
});
