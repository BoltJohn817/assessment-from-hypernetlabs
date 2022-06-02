const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

const delay = (ms) => new Promise((res) => setTimeout(res, ms * 1000));

describe("TheButton", function () {
  let theButton, TheButton;
  let accounts;
  beforeEach(async function () {
    TheButton = await ethers.getContractFactory("TheButton");
    theButton = await TheButton.deploy();
    await theButton.deployed();
    accounts = await ethers.getSigners();
  });

  describe("click", function () {
    it("Click with only 1 ether", async function () {
      // const txn = await theButton
      //   .connect(accounts[1].address)
      //   .click({ value: ethers.utils.parseEther("2") });

      await expect(
        theButton
          .connect(accounts[1])
          .click({ value: ethers.utils.parseEther("2") })
      ).to.be.revertedWith("The value must be 1 ether.");
    });

    it("After click the lastclicker is sender", async function () {
      theButton
        .connect(accounts[1])
        .click({ value: ethers.utils.parseEther("1") });

      expect(
        (await theButton.lastClicker()) == accounts[1],
        "lastclicker is set with the clicker"
      );
    });

    it("only from eoa", async function () {
      const TheTest = await ethers.getContractFactory("TestContract");
      const theTest = await TheTest.deploy(theButton.address);
      await theTest.deployed();
      await expect(
        theTest.click({ value: ethers.utils.parseEther("1") })
      ).to.revertedWith("Only EOA calls");
    });

    it("2 members within 5 minute, 1 member after 5 min", async function () {
      // Calls after 10 seconds
      await delay(10);
      const txn1 = await theButton
        .connect(accounts[1])
        .click({ value: ethers.utils.parseEther("1") });
      await txn1.wait();

      const acc1Balance = await ethers.provider.getBalance(accounts[1].address);

      // Calls after 60 seconds
      await delay(60);
      const txn2 = await theButton
        .connect(accounts[2])
        .click({ value: ethers.utils.parseEther("1") });
      await txn2.wait();

      const acc2Balance = await ethers.provider.getBalance(accounts[2].address);

      // Calls after another 250 seconds, 320 seconds after deployment
      await delay(250);
      const txn3 = await theButton
        .connect(accounts[3])
        .click({ value: ethers.utils.parseEther("1") });

      await txn3.wait();

      const acc3Balance = await ethers.provider.getBalance(accounts[3].address);

      expect(await ethers.provider.getBalance(accounts[1].address)).to.equal(
        acc1Balance,
        "The first account is not a winner"
      );
      expect(await ethers.provider.getBalance(accounts[2].address)).to.equal(
        acc2Balance.add(
          ethers.utils.parseEther("3"),
          "The second account is a winner"
        )
      );
      expect(await ethers.provider.getBalance(accounts[3].address)).to.equal(
        acc3Balance,
        "The thrid account is not a winner"
      );
      expect(await theButton.isFinished()).to.equal(1, "The clicking is ended");

      // expect(ethers.provider.getBalance(accounts[1]).)
    });
  });
});
