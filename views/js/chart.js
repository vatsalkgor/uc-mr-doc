fetch('/api/data/knowabout')
    .then(resp => resp.json())
    .then((result) => {
        console.log(result.data)
        let c_c = {

        }
        let knowaboutChart = new Chart($("#knowabout"), {
            type: 'line',
            data: {
                labels: result.label,
                datasets: [{
                    label: "KnowAbout Requests",
                    data: result.data,
                    lineTension: 0.3,
                    fill: false,
                    borderColor: 'purple',
                    backgroundColor: 'transparent',
                    pointBorderColor: 'purple',
                    pointBackgroundColor: 'grey',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointHitRadius: 15,
                    pointBorderWidth: 2
                }]
            }
        })
    })