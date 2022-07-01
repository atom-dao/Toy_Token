const { expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const { Address } = require("ethereumjs-util");

describe("Token contract deployment", () => {
  let tokenFactory;
  let toyToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
    tokenFactory = await ethers.getContractFactory("TOYTOKEN");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    toyToken = await tokenFactory.deploy();
  });

  describe("When deployed", () => {
    it("Should mint the total amount to the owner", async () => {
      const balance = await toyToken.balanceOf(owner.address);
      const amount = await toyToken.totalSupply();
      expect(balance).to.equal(amount);
    });
  });

  describe("balanceOf", () => {
    describe("When the requested account has no tokens", () => {
      it("Returns 0", async () => {
        const balance = await toyToken.balanceOf(addr1.address);
        expect(balance).to.equal(0);
      });
    });
    describe("When the requested account has some tokens", () => {
      it("returns the total amount of tokens", async () => {
        const balance = await toyToken.balanceOf(owner.address);
        const expectedBalance = await toyToken.totalSupply();
        expect(balance).to.equal(expectedBalance);
      });
    });
  });
});

describe("Token contract - transfer", () => {
  let tokenFactory;
  let toyToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async () => {
    tokenFactory = await ethers.getContractFactory("TOYTOKEN");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    toyToken = await tokenFactory.deploy();
  });

  describe("When the recipient is the zero address", () => {
    it("reverts", async () => {
      await expect(toyToken.transfer("0x0", 10000)).to.be.reverted;
    });
  });

  describe("When the recipient is not the zero address", () => {
    describe("When the sender does not have enough balance", () => {
      it("reverts", async () => {
        let amount = await toyToken.totalSupply();
        await expect(
          toyToken.transfer(addr1.address, amount + 1)
        ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      });
    });
    describe("When the sender transfers all balance", () => {
      it("transfers the requested amount", async () => {
        let amount = await toyToken.totalSupply();
        await toyToken.transfer(addr1.address, amount);
        expect(await toyToken.balanceOf(addr1.address)).to.equal(amount);
      });
      it("emits a transfer event", async () => {
        let amount = await toyToken.totalSupply();
        await expect(toyToken.transfer(addr1.address, amount))
          .to.emit(toyToken, "Transfer")
          .withArgs(owner.address, addr1.address, amount);
      });
    });
    describe("When the sender transfers zero balance", () => {
      it("transfers the requested amount", async () => {
        await toyToken.transfer(addr1.address, 0);
        expect(await toyToken.balanceOf(addr1.address)).to.equal(0);
      });
      it("emits a transfer event", async () => {
        await expect(toyToken.transfer(addr1.address, 0))
          .to.emit(toyToken, "Transfer")
          .withArgs(owner.address, addr1.address, 0);
      });
    });
  });
});

describe("Token contract - transferFrom", () => {
  let tokenFactory;
  let toyToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  beforeEach(async () => {
    tokenFactory = await ethers.getContractFactory("TOYTOKEN");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    toyToken = await tokenFactory.deploy();
    await toyToken.deployed();
    let amount = await toyToken.totalSupply();
    await toyToken.approve(addr1.address, amount);
  });
  describe("When the spender has enough allowance", () => {
    describe("when the token owner has enough balance", () => {
      it("transfers the requested amount", async () => {
        let amount = await toyToken.totalSupply();
        await toyToken
          .connect(addr1)
          .transferFrom(owner.address, addr2.address, amount);
        expect(await toyToken.balanceOf(owner.address)).to.equal(0);
        expect(await toyToken.balanceOf(addr2.address)).to.equal(amount);
      });
      it("decreases the spender allowance", async () => {
        let amount = await toyToken.totalSupply();
        await toyToken
          .connect(addr1)
          .transferFrom(owner.address, addr2.address, amount);
        expect(await toyToken.allowance(owner.address, addr1.address)).to.equal(
          0
        );
      });
      it("emits a transfer event", async () => {
        let amount = await toyToken.totalSupply();
        await expect(
          toyToken
            .connect(addr1)
            .transferFrom(owner.address, addr2.address, amount)
        )
          .to.emit(toyToken, "Transfer")
          .withArgs(owner.address, addr2.address, amount);
      });
    });
    describe("when the token owner does not have enough balance", () => {
      it("should revert", async () => {
        await toyToken.transfer(addr1.address, 1);
        let amount = await toyToken.totalSupply();
        await expect(
          toyToken
            .connect(addr1)
            .transferFrom(owner.address, addr2.address, amount)
        ).to.be.reverted;
      });
    });
  });
});

describe("Token Contract - Snapshot", () => {
  let tokenFactory;
  let toyToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  beforeEach(async () => {
    tokenFactory = await ethers.getContractFactory("TOYTOKEN");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    toyToken = await tokenFactory.deploy();
  });

  describe("Snapshot", () => {
    it("emits a snapshot event", async () => {
      await expect(await toyToken.snapshot()).to.emit(toyToken, "Snapshot");
    });
    it("creates increasing snapshot ids, starting from 1", async () => {
      for (const id of ["1", "2", "3", "4", "5"]) {
        await expect(await toyToken.snapshot())
          .to.emit(toyToken, "Snapshot")
          .withArgs(id);
      }
    });
  });

  describe("balanceOfAt - with initial snapshot", () => {

    describe("with no balance changes after the snapshot", () => {
      it("returns the current balance for all accounts", async () => {
        let amount = await toyToken.totalSupply()
        const receipt = await toyToken.snapshot();
        const initialSnapShotId = 1;
        expect(
          await toyToken.balanceOfAt(owner.address, initialSnapShotId)
        ).to.equal(amount);
        expect(
          await toyToken.balanceOfAt(addr1.address, initialSnapShotId)
        ).to.equal(0);
        expect(
          await toyToken.balanceOfAt(addr2.address, initialSnapShotId)
        ).to.equal(0);
      });
    });

    describe("with balance changes after the snapshot",()=>{
      it("returns the balances before the snapshots",async()=>{
        let amount = await toyToken.totalSupply()
        const receipt = await toyToken.snapshot();
        const initialSnapShotId = 1;
        expect(
          await toyToken.balanceOfAt(owner.address, initialSnapShotId)
        ).to.equal(amount);
        expect(
          await toyToken.balanceOfAt(addr1.address, initialSnapShotId)
        ).to.equal(0);
        expect(
          await toyToken.balanceOfAt(addr2.address, initialSnapShotId)
        ).to.equal(0);
      })
      it("returns the balances after the snapshots",async()=>{
        let amount = await toyToken.totalSupply()
        const receipt = await toyToken.snapshot();
        const initialSnapShotId = 1;
        await toyToken.transfer(addr1.address,amount)
        const secondReceipt = await toyToken.snapshot()
        const secondSnapShot = 2;
        expect(
          await toyToken.balanceOfAt(owner.address, secondSnapShot)
        ).to.equal(0);
        expect(
          await toyToken.balanceOfAt(addr1.address, secondSnapShot)
        ).to.equal(amount);
        expect(
          await toyToken.balanceOfAt(addr2.address, secondSnapShot)
        ).to.equal(0);
      })
    })
  });
});

describe("Token Contract - Snapshot - Edge Cases", () => {
  let tokenFactory;
  let toyToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  beforeEach(async () => {
    tokenFactory = await ethers.getContractFactory("TOYTOKEN");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    toyToken = await tokenFactory.deploy();
    let amount = await toyToken.totalSupply();
    await toyToken.approve(addr1.address, amount);
  });

  describe("totalSupplyAt ", () => {
    it("reverts if given a snapshot id of 0", async () => {
      await expect(toyToken.totalSupplyAt(0)).to.be.revertedWith(
        "ERC20Snapshot: id is 0"
      );
    });
    it("reverts if given a non-existent snapshot id", async () => {
      await expect(toyToken.totalSupplyAt(1)).to.be.revertedWith(
        "ERC20Snapshot: nonexistent id"
      );
    });
  });

  describe("balanceOfAt", () => {
    it("reverts if given a snapshot id of 0", async () => {
      await expect(toyToken.balanceOfAt(addr1.address, 0)).to.be.revertedWith(
        "ERC20Snapshot: id is 0"
      );
    });
    it("reverts if given a non-existent snapshot id", async () => {
      await expect(toyToken.balanceOfAt(addr1.address, 1)).to.be.revertedWith(
        "ERC20Snapshot: nonexistent id"
      );
    });
  });
});
