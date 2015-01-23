
amplify.request.define( "persons-getAll", "ajax", {
    url: "/api/persons",
    dataType: "json",
    type: "GET"
});

amplify.request.define( "persons-getById", "ajax", {
    url: "/api/persons/{id}",
    dataType: "json",
    type: "GET"
});



