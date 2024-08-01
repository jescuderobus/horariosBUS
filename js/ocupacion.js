document.addEventListener('DOMContentLoaded', function() {
    // Define the mapping of numeric values to HTML strings
    const ocupacionMapping = {
        0: "ocupación ---",
        1: "ocupación <span class='oBaja' title='menos del 33%'>B A J A</span>",
        2: "ocupación <span class='oMedia' title='entre 33% y 66%'>M E D I A</span>",
        3: "ocupación <span class='oAlta' title='más del 66%'>A L T A</span>",
        4: "ocupación <span class='oMAlta' title='más del 90%'>M U Y  ALTA</span>"
    };

    // Fetch the JSON data from the PHP endpoint
    fetch('ocupacion/dameOcupacionDemo.php')
        .then(response => response.json())
        .then(data => {
            // Iterate over the keys in the JSON object
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    // Get the corresponding HTML string for the value
                    const ocupacionHtml = ocupacionMapping[data[key]];
                    // Update the HTML content of the element with the corresponding ID
                    document.getElementById(`${key}-ocupacion`).innerHTML = ocupacionHtml;
                }
            }
        })
        .catch(error => console.error('Error fetching ocupacion data:', error));
});