console.log('js');

var ourApp = angular.module('ourApp', []);

ourApp.controller('HotelController', function($http){
    console.log('NG');

    var vm = this;
    
    vm.addPet = function(){
        console.log('IN ADD PET:', vm.name, vm.breed, vm.color);
        // $http ({
        //     method: 
        // })
    }
    
    vm.getPet = function() {
        console.log('in get');
        $http({
            method: 'GET',
            url: '/pet',
        }) .then( function(response){
            console.log('back from server with:', response);
            vm.pets = response.data;
        })
    }
    
})