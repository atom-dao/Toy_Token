## Contract for vesting ToyToken Token.

# How to deploy on Remix

    ```bash
        - open a Remix and create a new file called VestingContract.sol

        - copy paste the code in this file and compile it.

        # deployment settings: 

        - Environment:Injected Web3

        - network: poygon or mumbai testnet

        - input the ToyToken Contract address

        - and then click on deploy.

        - After deployment transfer ToyToken to the Vesting Contract address

        - approve the vesting contract to spend the token

        Note that token to be released are compounded. 0.0115740740740740 ToyToken are released per second, which accumulated to 1000 ToyToken per day. 
        - if don't withdraw token for 5 days, the total token be withdraw will be compounded. That is you will be able to withdraw 5000 ToyToken;
    ```