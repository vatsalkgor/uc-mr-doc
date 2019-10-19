let app = angular.module("uc", ["chart.js"]);
let url = "https://uc-project.herokuapp.com/"
app.controller("Emergency", ['$scope', '$http', '$filter', ($scope, $http, $filter) => {
    $scope.heading = "Emergency"
    $scope.emergencies = [];
    setInterval(() => {
        $http.post(url + 'sse-emergency').then((response) => {
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

app.controller("Appointments", ['$scope', '$http', '$filter', ($scope, $http, $filter) => {
    $scope.heading = "Appointments";
    $scope.appointments = [];
    setInterval(() => {
        $http.post(url + 'sse-appointments').then(response => {
            if (response.data.appointments.length != $scope.appointments.length) {
                response.data.appointments[response.data.appointments.length - 1].date = $filter('date')(new Date(), 'd-M-y h:m:s');
                console.log($scope.appointments)
                console.log(response.data.appointments)
                $scope.appointments.push(response.data.appointments[response.data.appointments.length - 1]);
            }
        })
    }, 1000)
}])

app.controller("KnowAbout", ['$scope', '$http', '$filter', ($scope, $http, $filter) => {
    $scope.heading = "KnowAbout";
    $scope.data = [];
    $scope.labels = [];
    setInterval(() => {
        $http.post(url+ 'sse-knowabout').then((response) => {
            if ($scope.data[$scope.data.length - 1] != response.data.knowabout_count) {
                $scope.labels.push($filter('date')(new Date(), 'h:m:s', '+1300'))
                $scope.data.push(response.data.knowabout_count);
            }
        })
    }, 1000)
}])

app.controller("RepeatPrescription", ['$scope', '$http', '$filter', ($scope, $http, $filter) => {
    $scope.heading = "Repeat Prescription";
    $scope.data = [];
    $scope.labels = [];
    $scope.options = {
        backgroundColor: 'transperent'
    }
    setInterval(() => {
        $http.post(url + 'sse-repeat').then((response) => {
            if ($scope.data[$scope.data.length - 1] != response.data.repeat_count) {
                $scope.labels.push($filter('date')(new Date(), 'h:m:s', '+1300'))
                $scope.data.push(response.data.repeat_count);
            }
        })
    }, 1000);
}])