let app = angular.module("uc", ["chart.js"]);
app.controller("Emergency", ['$scope', '$http', '$filter', ($scope, $http, $filter) => {
    $scope.heading = "Emergency"
    $scope.emergencies = [];
    setInterval(() => {
        $http.post('http://localhost:8080/sse-emergency').then((response) => {
            if (response.data.emergency.query != null) {
                response.data.emergency.date = $filter('date')(new Date(), 'd-M-y', '+1300');
                response.data.emergency.emergency = isEmergency(response.data.emergency.query);
                $scope.emergencies.push(response.data.emergency);
                // $scope.data.push(response.data.repeat_count);
            }
        })
    }, 1000);
}])

isEmergency = (query) => {
    return query.includes('fire') || query.includes('chest pain') || query.includes('breathe') || query.includes('bleeding') || query.includes('choking') || query.includes('danger') || query.includes('emergency');
}

app.controller("Appointments", ['$scope', ($scope) => {
    $scope.heading = "Appointments";
    $scope.appointments = [
        {
            "user": "vatsal",
            "symptoms": ["headache", "runny nose"],
            "predicted": "fever",
            "date": "19-09-2019"
        },
        {
            "user": "ajay",
            "symptoms": ["headache", "dizzy_ness", "fever"],
            "predicted": "measles",
            "date": "25-09-2019"
        },
        {
            "user": "ajay",
            "symptoms": ["headache", "dizzy_ness", "fever", "red_rashes"],
            "predicted": "measles",
            "date": "19-09-2019"
        },
        {
            "user": "vatsal",
            "symptoms": ["headache", "runny nose"],
            "predicted": "fever",
            "date": "19-09-2019"
        },
        {
            "user": "ajay",
            "symptoms": ["headache", "dizzy_ness", "fever"],
            "predicted": "measles",
            "date": "25-09-2019"
        },
        {
            "user": "ajay",
            "symptoms": ["headache", "dizzy_ness", "fever", "red_rashes"],
            "predicted": "measles",
            "date": "19-09-2019"
        },
    ]
}])

app.controller("KnowAbout", ['$scope','$http','$filter', ($scope,$http,$filter) => {
    $scope.heading = "KnowAbout";
    $scope.data = [];
    $scope.labels = [];
    setInterval(()=>{
        $http.post('http://localhost:8080/sse-knowabout').then((response) => {
            if ($scope.data[$scope.data.length - 1] != response.data.knowabout_count) {
                $scope.labels.push($filter('date')(new Date(), 'h:m:s', '+1300'))
                $scope.data.push(response.data.knowabout_count);
            }
        })
    },1000)
}])

app.controller("RepeatPrescription", ['$scope', '$http', '$filter', ($scope, $http, $filter) => {
    $scope.heading = "Repeat Prescription";
    $scope.data = [];
    $scope.labels = [];
    $scope.options = {
        backgroundColor: 'transperent'
    }
    setInterval(() => {
        $http.post('http://localhost:8080/sse-repeat').then((response) => {
            if ($scope.data[$scope.data.length - 1] != response.data.repeat_count) {
                $scope.labels.push($filter('date')(new Date(), 'h:m:s', '+1300'))
                $scope.data.push(response.data.repeat_count);
            }
        })
    }, 1000);
    // $scope.labels = ["22-09-2019", "23-09-2019", "24-09-2019", "25-09-2019"];
    // $scope.data = [
    //     [1, 4, 8, 5]
    // ];
}])