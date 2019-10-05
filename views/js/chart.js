$.ajax({
    method:"GET",
    url:"/api/data/knowabout",
    success:function (data){
        data = JSON.parse(data);
    }
})