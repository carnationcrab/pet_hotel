console.log('js');

var ourApp = angular.module('ourApp', []);

ourApp.controller('HotelController', function($http){
    console.log('NG');

    var vm = this;
    // vm.pet = [];
    
    vm.addPet = function(){
        console.log('IN ADD PET:', vm.name, vm.breed, vm.color);
        var newPet = {
            name: vm.name,
            breed: vm.breed,
            color: vm.color,
            checkedin: vm.checkedin
        }
        
        console.log('new pet: -------> XD: ', newPet);
        $http ({
            method: 'POST',
            url: '/pet',
            data: newPet
            // data: { name: vm.name, breed: vm.breed, color: vm.color, checkedin: vm.checkedin}
        }).then( function(response) {
            console.log('post from server: ', response);
            vm.getPet();
        })
    };
    
    vm.getPet = function() {
        console.log('in get');
        $http({
            method: 'GET',
            url: '/pet',
        }).then( function(response){
            console.log('back from server with:', response);
            vm.pets = response.data;
        })
    }
    vm.toggleCheckIn = function(id, checkedin) {
        // if (ifChecked) {
        //     checkStatus = false
        // }
        console.log('in toggle function', id, checkedin);
        $http({
            method: 'PUT',
            url: '/pet/' + id,
        }).then(function(response){
        console.log('changes made in PUT', response);
            vm.getPet();
        })
    }    
});