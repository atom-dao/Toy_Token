# vesting contract design 
vesting cntract is the contract that will lock in the toy tokens created and release them with time. the following rules are followed for creating the toy token 

- token Name : TOY TOKEN
- the token symbol is TOY
- total number of tokens is fixed at 100000
- keep in mind the token will be deployed on polygon
more about this is mentioned in the toy_token.md file 

## unlocking of the tokens  follows the following timeline :

- These tokens are vested over a period of 3 months starting from July 1, 2022.
- 10% of total supply released on day 1 (on deploying the contract)
- For the following 90 days, 1% of the total supply is released every day.
- the token contract is ownable and so release all these tokens to the address that deploys the contract. 

keep in mind 
- these locking periods and code accordingly.
- some links will be provided in the issue raised check them for references. 
- Test the contract on remix with different time frames for the effectiveness of the contract.
- provide proper comments on the code with steps on compiling and deployong the smartcontract.


