angular.module('proton.blackFriday')
    .factory('blackFridayModal', ($rootScope, $state, authentication, pmModal, blackFridayModel, subscriptionModel) => {
        return pmModal({
            controllerAs: 'ctrl',
            templateUrl: 'templates/blackFriday/blackFridayModal.tpl.html',
            /* @ngInject */
            controller: function (params) {
                this.isFreeUser = !subscriptionModel.hasPaid('mail');
                this.isPaidUser = authentication.user.Subscribed;
                this.close = () => {
                    blackFridayModel.saveClose();
                    params.close();
                };

                this.dashboard = () => {
                    if (!$state.is('secured.dashboard')) {
                        $state.go('secured.dashboard', { noBlackFridayModal: true });
                    }

                    this.close();
                };

                this.buy = (plan = 'current') => {
                    $rootScope.$emit('blackFriday', { type: 'buy', data: { plan } });
                    this.close();
                };

                this.changeCurrency = (currency = 'EUR') => {
                    this.currency = currency;
                    blackFridayModel.set('currency', currency);
                    $rootScope.$emit('closeDropdown');
                };

                this.currency = subscriptionModel.currency();
                this.changeCurrency();
            }
        });
    });
