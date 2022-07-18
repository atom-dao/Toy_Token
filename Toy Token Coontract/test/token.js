//const { inputToConfig } = require("@ethereum-waffle/compiler");
const {expect} = require("chai");
//const { TransactionTypes } = require("ethers/lib/utils");
//const { ethers } = require("ethers");
//const { ethers } = require("ethers");


// describe("Token contract", function() {

//     it("Deployment should assign the total supply of tokens to the owner",async function(){
//         const [owner] = await ethers.getSigners();

//       //  console.log("Signers object:",owner);

//         const ToyToken = await ethers.getContractFactory("ToyToken"); //instance

//         const toyToken = await ToyToken.deploy(); //deploy

//         const ownerBalance = await toyToken.balanceOf(owner.address); // owner balance

//        // console.log("Owner Address:",owner.address);

//         expect(await toyToken.totalSupply()).to.equal(ownerBalance); //total supply
//     });

//     it("Should transfer tokens between accounts",async function(){
//         const [owner,addr1,addr2] = await ethers.getSigners();

//       //  console.log("Signers object:",owner);

//         const ToyToken = await ethers.getContractFactory("ToyToken"); //instance

//         const toyToken = await ToyToken.deploy(); //deploy

//        //transfer 10 tokens from owner to addr1
                        
//        await toyToken.transfer(addr1.address,10);
//        expect(await toyToken.balanceOf(addr1.address)).to.equal(10);

//        //transfer 5 tokens from addr1 to addr2
//        await toyToken.connect(addr1).transfer(addr2.address,5);
//        expect(await toyToken.balanceOf(addr1.address)).to.equal(5);
//     });

// });

describe("Token Contract",function(){
    let Token;
    let toyToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){
        Token = await ethers.getContractFactory("ToyToken");
        [owner,addr1,addr2,...addrs] = await ethers.getSigners();
        toyToken = await Token.deploy();
    });

    describe("Deployment",function(){
        it("Should set the right owner",async function(){
            expect(await toyToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner",async function(){
            const ownerBalance = await toyToken.balanceOf(owner.address);
            expect(await toyToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions",function(){
        it("Should transfer tokens between accounts",async function(){
           //owner acc. to addr1.address
            await toyToken.transfer(addr1.address,5);
            const addr1Balance = await toyToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            await toyToken.connect(addr1).transfer(addr2.address,5)
            const addr2Balance = await toyToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(5);
        });

        it("should fail if sender does not have enought tokens",async function(){
            const initialOwnerBalance = await toyToken.balanceOf(owner.address); 
            
            //initially - 0 tokens addr1
            await expect(toyToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("transfer amount exceeds balance");
            expect(await toyToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        // it("Should update balances after transfers",async function(){
        //     const initialOwnerBalance = await toyToken.balanceOf(owner.address);
        //     await toyToken.transfer(addr1.address,BigInt(5));
        //     await toyToken.transfer(addr2.address,BigInt(10));

        //     const finalOwnerBalance = await toyToken.balanceOf(owner.address);
        //     expect(finalOwnerBalance).to.equal(initialOwnerBalance-BigInt(15));

        //     const addr1Balance = await toyToken.balanceOf(addr1.address);
        //     expect(addr1Balance).to.equal(BigInt(5));
        //     const addr2Balance = await toyToken.balanceOf(addr2.address);
        //     expect(addr2Balance).to.equal(BigInt(10));
        // });
    });
});