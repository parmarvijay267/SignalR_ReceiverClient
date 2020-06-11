"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:55202/trackServiceHub").build();

//Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;

connection.on("ReceiveAllVehicleData", function (result) {
    var li = document.createElement("li");
    li.textContent = result;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("ReceiveAllInstitutionVehicleData", function (result) {
    var li = document.createElement("li");
    li.textContent = result;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("ReceiveSubscribedVehicleData", function (result) {
    var li = document.createElement("li");
    li.textContent = result;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("SendAccountInfo", function () {
    connection.invoke("MapAccountInfo", true, "Dashboard01").catch(function (err) {
        return console.error(err.toString());
    });
});

connection.start().then(function () {
    //document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("SendAllVehicleData").addEventListener("click", function (event) {
    var InstitutionId = document.getElementById("InstitutionId").value;
    var VehicleId = document.getElementById("VehicleId").value;
    connection.invoke("SendAllVehicleData", InstitutionId, VehicleId).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("SendAllVehicleDataForInstitutionId").addEventListener("click", function (event) {
    var InstitutionId = document.getElementById("InstitutionId").value;
    var VehicleId = document.getElementById("VehicleId").value;
    connection.invoke("SendAllVehicleDataForInstitutionId", InstitutionId, VehicleId).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("SendSubscribedVehicleData").addEventListener("click", function (event) {
    var InstitutionId = document.getElementById("InstitutionId").value;
    var VehicleId = document.getElementById("VehicleId").value;
    connection.invoke("SendSubscribedVehicleData", InstitutionId, VehicleId).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("UnsubscribeVehicleData").addEventListener("click", function (event) {
    var InstitutionId = document.getElementById("InstitutionId").value;
    var VehicleId = document.getElementById("VehicleId").value;
    connection.invoke("UnsubscribeVehicleData", InstitutionId, VehicleId).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});