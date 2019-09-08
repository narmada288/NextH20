var data = {
    resource_id: '3d718d43-73f1-4c8e-b408-05f6c5429694'
};

$.ajax({
    type: "POST",
    url: 'https://www.data.qld.gov.au/api/3/action/datastore_search',
    data: '{name: "abc" }',
    contentType: "application/json; charset=utf-8",
    dataType: "jsonp",
    success: function(d)
            {
                $.each(data.d, function (){
                    $(".schemeId").append($("<option     />").val(this.KeyName).text(this.ValueName));
                });
            },
    failure: function () {
        alert("Failed!");
    }
});