# Toy Token Contract

Toy Token contract that utilizes [OpenZeppelin's ERC20, ERC20SnapShot, and Ownable](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) for modern ERC20 token implementation. It defines `takeSnapshot`. Which can use to take snapshot of account balances for voting purpose.

## Test
To run the test, run

forge test
Tests use [Foundry: Forge](https://github.com/gakonst/foundry).

Install Foundry using the installation steps in the README of the linked repo.

# Deploy using Remix

```bash
# go to the contract directory
cd/src
copy the `ToyToken.sol` contract
```
go to [Remix](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js)
create a new contract file abd paste the 'ToyToken.sol' contract;
pass in the `vesting contract address` and deploy the contract.
