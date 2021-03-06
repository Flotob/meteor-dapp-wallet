/**
Template Controllers

@module Templates
*/

/**
The account template

@class [template] elements_account
@constructor
*/

/**
Block required until a transaction is confirmed.

@property blocksForConfirmation
@type Number
*/
var blocksForConfirmation = 12;


Template['elements_account'].rendered = function(){

    // initiate the geo pattern
    var pattern = GeoPattern.generate(this.data.address);
    this.$('.account-pattern').css('background-image', pattern.toDataUrl());
};


Template['elements_account'].helpers({
    /**
    Get the current account

    @method (account)
    */
    'account': function(){
        return Accounts.findOne(this.account);
    },
    /**
    Get the name

    @method (name)
    */
    'name': function(){
        return this.name || TAPi18n.__('wallet.accounts.defaultName');
    },
    /**
    Should the wallet show disabled

    @method (disabled)
    */
    'disabled': function(){
        return (!this.address || this.imported || blocksForConfirmation >= LastBlock.findOne('latest').blockNumber - (this.creationBlock - 1));
    },
    /**
    Returns the confirmations

    @method (totalConfirmations)
    */
    'totalConfirmations': blocksForConfirmation,
    /**
    Checks whether the transaction is confirmed ot not.

    @method (unConfirmed)
    */
    'unConfirmed': function() {
        if(!this.creationBlock || this.createdIdentifier)
            return false;

        var currentBlockNumber = LastBlock.findOne('latest').blockNumber,
            confirmations = currentBlockNumber - (this.creationBlock - 1);
        return (blocksForConfirmation >= confirmations && confirmations >= 0)
            ? {
                confirmations: confirmations,
                percent: (confirmations / (blocksForConfirmation)) * 100
            }
            : false;
    }
});

Template['elements_account'].events({
    /**
    Select the whole text of the input

    @event click input[type="text"]
    */
    // 'click input[type="text"]': function(e){
    //     $(e.currentTarget).focus().select();
    // }
});
